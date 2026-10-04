import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Linkedin, Github, Mail, Phone, ArrowRight, FileText } from 'lucide-react';
import { heroTextReveal, staggerContainer, fadeInUp } from '../../lib/animations';
import { profileData, socialLinks } from '../../data/initialData';
import LinuxBackground from '../ui/LinuxBackground';

const iconMap = { linkedin: Linkedin, github: Github, mail: Mail, phone: Phone };

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <LinuxBackground />

      <div className="container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Status Badge */}
          <motion.div className="hero-status" variants={heroTextReveal}>
            <span className="pulse" aria-hidden="true" />
            Currently Building
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={heroTextReveal}>
            ADITYA<br />KITTAD
          </motion.h1>

          {/* Tagline */}
          <motion.p className="hero-tagline" variants={heroTextReveal}>
            I build <span className="highlight">systems</span>, <span className="highlight">products</span> and <span className="highlight">teams</span>.
          </motion.p>

          {/* Description */}
          <motion.p className="hero-description" variants={heroTextReveal}>
            Cloud infrastructure, DevOps, cybersecurity, AI automation and production software.
          </motion.p>

          {/* CTAs */}
          <motion.div className="hero-ctas" variants={heroTextReveal}>
            <a href="#work" className="btn btn-lg" style={{ background: '#e11d48', color: 'white', boxShadow: '0 0 20px rgba(225, 29, 72, 0.4)' }}>
              View Projects
              <ArrowRight size={18} />
            </a>
            <a href="/Cloud_resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-lg">
              <ArrowDown size={18} />
              Download Resume
            </a>
            <a href="#contact" className="btn btn-ghost btn-lg">
              <Mail size={18} />
              Contact Me
            </a>
          </motion.div>

          {/* Hero Stats / Ranks */}
          <motion.div variants={heroTextReveal} style={{ display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-10)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)' }}>RHCSA 2026</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>System Admin</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)' }}>DO188</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>Cloud-Native Dev</div>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', color: 'var(--color-text-primary)' }}>1st Rank</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>Red Hat Technical Quiz</div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div className="hero-social" variants={heroTextReveal} style={{ marginTop: 'var(--space-8)' }}>
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] || Mail;
              return (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        className="hero-scroll-cue"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span>SCROLL</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
