import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, MessageSquare, Linkedin, Github, Mail, Phone, ChevronDown } from 'lucide-react';
import { useScrollPosition, useActiveSection } from '../../hooks/usePortfolio';
import { socialLinks } from '../../data/initialData';
import { slideInFromRight, overlayVariants } from '../../lib/animations';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const sectionIds = ['about', 'work', 'stack', 'experience', 'certifications', 'journey', 'contact'];

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  phone: Phone,
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScrollPosition();
  const activeSection = useActiveSection(sectionIds);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const scrolled = scrollY > 50;

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    if (href.startsWith('#') && isHome) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
      }
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo" aria-label="Home">
            <span className="dot" aria-hidden="true"></span>
            ADITYA.K
          </Link>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar-actions">
            <a href="#contact" className="btn btn-primary btn-sm btn-resume" onClick={(e) => handleNavClick(e, '#contact')}>
              Let's Talk
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="mobile-nav-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="mobile-nav"
              variants={slideInFromRight}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="mobile-nav-header">
                <span className="navbar-logo">
                  <span className="dot"></span>
                  ADITYA.K
                </span>
                <button className="mobile-nav-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="/Cloud_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  style={{ color: 'var(--color-accent)' }}
                >
                  Resume
                </motion.a>
              </div>

              <div className="mobile-nav-footer">
                {socialLinks.map((link) => {
                  const Icon = iconMap[link.icon] || Mail;
                  return (
                    <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
