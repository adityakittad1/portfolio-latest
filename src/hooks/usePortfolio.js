import { useState, useEffect, useCallback, useRef } from 'react';
import {
  profileData,
  socialLinks,
  experienceData,
  projectsData,
  certificationsData,
  skillCategoriesData,
  educationData,
  achievementsData,
  timelineData,
  currentlyBuildingData,
  siteSettings,
} from '../data/initialData';

// Data context — fetches from Supabase
import { supabase } from '../lib/supabase';

export function usePortfolioData() {
  const [data, setData] = useState({
    profile: profileData,
    socialLinks: socialLinks,
    experiences: experienceData,
    projects: projectsData,
    certifications: certificationsData,
    skillCategories: skillCategoriesData,
    education: educationData,
    achievements: achievementsData,
    timeline: timelineData,
    currentlyBuilding: currentlyBuildingData,
    settings: siteSettings,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, expRes, certRes, eduRes, skillsRes, settingsRes] = await Promise.all([
          supabase.from('projects').select('*').order('displayOrder', { ascending: true }),
          supabase.from('experience').select('*').order('displayOrder', { ascending: true }),
          supabase.from('certifications').select('*').order('displayOrder', { ascending: true }),
          supabase.from('education').select('*').order('displayOrder', { ascending: true }),
          supabase.from('skills').select('*').order('category', { ascending: true }),
          supabase.from('site_settings').select('*').eq('id', 1).single()
        ]);

        // Transform skills back into category groups
        let groupedSkills = data.skillCategories;
        if (skillsRes.data && skillsRes.data.length > 0) {
          const categoryMap = {};
          skillsRes.data.forEach(skill => {
            if (!categoryMap[skill.category]) {
              categoryMap[skill.category] = { id: skill.category, name: skill.category.toUpperCase(), skills: [] };
            }
            categoryMap[skill.category].skills.push({ name: skill.name, icon: skill.icon || 'code' });
          });
          groupedSkills = Object.values(categoryMap);
        }

        // Merge settings safely
        const updatedSettings = { ...siteSettings };
        if (settingsRes.data) {
          updatedSettings.showProfilePhoto = settingsRes.data.show_profile_photo;
          updatedSettings.profilePhotoUrl = settingsRes.data.profile_photo_url;
        } else {
          // Fallback to localStorage if Supabase is stuck
          const localSettings = localStorage.getItem('site_settings');
          if (localSettings) {
            const parsed = JSON.parse(localSettings);
            updatedSettings.showProfilePhoto = parsed.show_profile_photo;
            updatedSettings.profilePhotoUrl = parsed.profile_photo_url;
          }
        }

        setData(prev => ({
          ...prev,
          projects: projectsRes.data && projectsRes.data.length > 0 ? projectsRes.data : prev.projects,
          experiences: expRes.data && expRes.data.length > 0 ? expRes.data : prev.experiences,
          certifications: certRes.data && certRes.data.length > 0 ? certRes.data : prev.certifications,
          education: eduRes.data && eduRes.data.length > 0 ? eduRes.data : prev.education,
          skillCategories: groupedSkills,
          settings: updatedSettings,
          loading: false,
        }));
      } catch (err) {
        console.error('Error fetching data from Supabase', err);
        setData(prev => ({ ...prev, error: err, loading: false }));
      }
    }
    fetchData();
  }, []);

  return data;
}

// Scroll position hook
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? y / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}

// Reduced motion hook
export function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

// Active section tracking for nav highlighting
export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

// Media query hook
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatches(mq.matches);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
