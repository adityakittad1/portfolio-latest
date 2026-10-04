import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Briefcase, Award, 
  Code2, GraduationCap, Clock, Image as ImageIcon, 
  Settings, LogOut, Menu, X 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const navigate = useNavigate();

  // Mock logout for now
  const handleLogout = () => {
    navigate('/admin/login');
  };

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
