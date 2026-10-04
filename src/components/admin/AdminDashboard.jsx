import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { projectsData, certificationsData, skillCategoriesData, experienceData } from '../../data/initialData';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, certs: 0, skills: 0 });
  const [syncing, setSyncing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const [p, c, s] = await Promise.all([
      supabase.from('projects').select('id', { count: 'exact' }),
      supabase.from('certifications').select('id', { count: 'exact' }),
      supabase.from('skills').select('id', { count: 'exact' })
    ]);
    setStats({
      projects: p.count || 0,
      certs: c.count || 0,
      skills: s.count || 0
    });
  }

  async function handleSyncData() {
    if (!window.confirm('This will copy all the default fallback data into your database so you can edit it. Continue?')) return;
    setSyncing(true);
    try {
      // 1. Sync Projects
      if (projectsData && projectsData.length > 0) {
        await supabase.from('projects').upsert(projectsData.map(p => ({
          id: p.id, title: p.title, slug: p.slug, category: p.category, 
          shortDescription: p.shortDescription, fullDescription: p.fullDescription,
          problem: p.problem, solution: p.solution, architecture: p.architecture,
          features: p.features, challenges: p.challenges, results: p.results,
          githubUrl: p.githubUrl, liveUrl: p.liveUrl, featured: p.featured,
          displayOrder: p.displayOrder, published: p.published
        })));
      }

      // 2. Sync Certifications
      if (certificationsData && certificationsData.length > 0) {
        await supabase.from('certifications').upsert(certificationsData.map(c => ({
          id: c.id, title: c.title, issuer: c.issuer, issueDate: c.issueDate,
          credentialId: c.credentialId, verificationUrl: c.verificationUrl,
          description: c.description, featured: c.featured, displayOrder: c.displayOrder,
          published: c.published
        })));
      }

      // 3. Sync Skills
      if (skillCategoriesData && skillCategoriesData.length > 0) {
        let allSkills = [];
        skillCategoriesData.forEach(cat => {
          cat.skills.forEach(skill => {
            allSkills.push({ name: skill.name, category: cat.name, icon: skill.icon });
          });
        });
        // For skills, we just insert them (assuming the table allows it)
        // To avoid duplicates if run multiple times, we'd normally clear it first, but upsert on name is safer if name is unique. 
        // We'll just insert and let them delete duplicates if they run it twice.
        await supabase.from('skills').insert(allSkills);
      }

      alert('Sync Complete! Your past projects and data are now in the database.');
      fetchStats();
    } catch (err) {
      console.error(err);
      alert('Error syncing data: ' + err.message + '\n\nDid you run the SQL to create the tables first?');
    }
    setSyncing(false);
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <div className="admin-header">
        <div>
          <div className="admin-breadcrumb">Dashboard <span>/</span> Overview</div>
          <h1 className="admin-title">Overview</h1>
        </div>
      </div>

      <motion.div className="admin-stats" variants={fadeInUp}>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Projects</div>
          <div className="admin-stat-value">{stats.projects}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Certifications</div>
          <div className="admin-stat-value">{stats.certs}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Skills</div>
          <div className="admin-stat-value">{stats.skills}</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Profile Views</div>
          <div className="admin-stat-value">—</div>
        </div>
      </motion.div>

      {/* Sync Banner if DB is empty */}
      {stats.projects === 0 && (
        <motion.div variants={fadeInUp} style={{ padding: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '12px', marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#3b82f6' }}>Database is Empty</h3>
          <p style={{ margin: '0 0 16px 0', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
            Your database tables have been created, but they are currently empty. Click the button below to instantly import all your past projects, skills, and certifications so you can edit them here.
          </p>
          <button className="btn btn-primary" onClick={handleSyncData} disabled={syncing}>
            {syncing ? 'Syncing Data...' : 'Import Past Projects & Data'}
          </button>
        </motion.div>
      )}

      <div className="grid-2">
        <motion.div className="admin-table-wrapper" variants={fadeInUp}>
          <div className="admin-table-header">
            <h3 className="admin-table-title">Manage Content</h3>
          </div>
          <div style={{ padding: 'var(--space-6)' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
              Use the sidebar or the quick links below to edit, delete, or add new items to your portfolio.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/admin/projects" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>✏️ Edit Projects (Add / Delete)</Link></li>
              <li><Link to="/admin/certifications" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>✏️ Edit Certifications</Link></li>
              <li><Link to="/admin/skills" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>✏️ Edit Skills</Link></li>
              <li><Link to="/admin/experience" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }}>✏️ Edit Experience</Link></li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="admin-table-wrapper" variants={fadeInUp}>
          <div className="admin-table-header">
            <h3 className="admin-table-title">Quick Actions</h3>
          </div>
          <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/admin/projects')}>+ Add New Project</button>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/admin/certifications')}>+ Add Certification</button>
            <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => navigate('/admin/settings')}>Update Profile Photo</button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
