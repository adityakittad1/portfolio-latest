import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Briefcase, Award, 
  Code2, GraduationCap, Clock, Image as ImageIcon, 
  Settings, LogOut, Menu, X, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { path: '/admin/projects', icon: FolderKanban, label: 'Projects' },
  { path: '/admin/experience', icon: Briefcase, label: 'Experience' },
  { path: '/admin/certifications', icon: Award, label: 'Certifications' },
  { path: '/admin/skills', icon: Code2, label: 'Skills' },
  { path: '/admin/education', icon: GraduationCap, label: 'Education' },
  { path: '/admin/timeline', icon: Clock, label: 'Timeline' },
  { path: '/admin/media', icon: ImageIcon, label: 'Media Library' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) {
        navigate('/admin/login');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--color-bg)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--color-primary)" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mobile-nav-overlay"
            style={{ zIndex: 'var(--z-sticky)' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="admin-sidebar-logo">ADITYA.K ADMIN</div>
          <button className="mobile-menu-btn" style={{ display: 'flex' }} onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="admin-sidebar-subtitle">CMS & Portfolio Manager</div>

        <nav className="admin-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-nav-item" onClick={handleLogout} style={{ width: '100%', border: 'none', background: 'transparent' }}>
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Mobile Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--space-6)' }} className="lg:hidden">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} style={{ marginRight: 'var(--space-4)' }}>
            <Menu size={24} />
          </button>
          <div className="admin-title" style={{ fontSize: 'var(--text-lg)' }}>ADITYA.K ADMIN</div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
