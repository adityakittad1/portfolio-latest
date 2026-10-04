import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, certs: 0, skills: 0 });
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchStats();
  }, []);

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
