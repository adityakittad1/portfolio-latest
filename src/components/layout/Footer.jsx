import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, Phone, Heart, Coffee } from 'lucide-react';
import { socialLinks } from '../../data/initialData';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Stack', href: '#stack' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const iconMap = {
  linkedin: Linkedin,
  github: Github,
  mail: Mail,
  phone: Phone,
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-brand-name">ADITYA KITTAD</div>
            <p className="footer-brand-desc">
              Founder • Engineer • Builder
              <br />
              Building systems, products, and teams at the intersection of cloud, security, and AI.
            </p>
            <div className="footer-social">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon] || Mail;
                return (
                  <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="footer-nav-title">Navigation</h4>
            <div className="footer-nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="footer-nav-title">Connect</h4>
            <div className="footer-nav-links">
              <a href="mailto:adityakittad1054@gmail.com">adityakittad1054@gmail.com</a>
              <a href="tel:+919112646267">+91 9112646267</a>
              <a href="https://www.linkedin.com/in/aditya-kittad-bbb9532ba" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/adityakittad1" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {currentYear} Aditya Kittad. All rights reserved.</p>
          <p className="footer-signature">Built with curiosity, systems thinking & too much coffee ☕</p>
        </div>
      </div>
    </footer>
  );
}
