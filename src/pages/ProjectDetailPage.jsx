import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { pageTransition, fadeInUp, staggerContainer } from '../lib/animations';
import { usePortfolioData } from '../hooks/usePortfolio';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = usePortfolioData();
  const project = projects.find(p => p.slug === slug || p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && !project) {
      navigate('/404', { replace: true });
    }
  }, [slug, project, navigate, loading]);

  if (!project) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <Navbar />
      
      <main className="project-detail" style={{ minHeight: '100vh' }}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <Link to="/#work" className="project-detail-back">
              <ArrowLeft size={16} /> Back to Work
            </Link>

            <header className="project-detail-header">
              <motion.div className="project-category" variants={fadeInUp}>
                {project.category}
              </motion.div>
              <motion.h1 className="project-detail-title" variants={fadeInUp}>
                {project.title}
              </motion.h1>
              <motion.p className="section-subtitle" variants={fadeInUp} style={{ maxWidth: '800px' }}>
                {project.shortDescription}
              </motion.p>
            </header>

            <motion.div variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
              <div className="project-visual" style={{ minHeight: '400px', backgroundColor: 'var(--color-bg-elevated)' }}>
                <div className="project-visual-placeholder">
                  <span>PROJECT / {(project.slug || slug || '').toUpperCase()}</span>
                  <span>HERO ASSET PENDING</span>
                </div>
              </div>
            </motion.div>

            <div className="project-detail-body">
              <div className="project-detail-content">
                <motion.div className="project-detail-section" variants={fadeInUp}>
                  <h3>Overview</h3>
                  <p>{project.fullDescription}</p>
                </motion.div>

                {project.problem && (
                  <motion.div className="project-detail-section" variants={fadeInUp}>
                    <h3>The Problem</h3>
                    <p>{project.problem}</p>
                  </motion.div>
                )}

                {project.solution && (
                  <motion.div className="project-detail-section" variants={fadeInUp}>
                    <h3>The Solution</h3>
                    <p>{project.solution}</p>
                  </motion.div>
                )}

                {project.architecture && (
                  <motion.div className="project-detail-section" variants={fadeInUp}>
                    <h3>Architecture</h3>
                    <div style={{
                      padding: 'var(--space-6)',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: '1.8'
                    }}>
                      {project.architecture.split('→').map((step, i, arr) => (
                        <div key={i}>
                          {step.trim()}
                          {i < arr.length - 1 && <div style={{ color: 'var(--color-accent)', margin: 'var(--space-2) 0' }}>↓</div>}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {project.results && (
                  <motion.div className="project-detail-section" variants={fadeInUp}>
                    <h3>Impact & Results</h3>
                    <p>{project.results}</p>
                  </motion.div>
                )}
              </div>

              <div className="project-detail-sidebar">
                <motion.div className="project-detail-sidebar-card" variants={fadeInUp}>
                  <h4>Technologies</h4>
                  <div className="project-tech-tags" style={{ marginBottom: 0 }}>
                    {(project.technologies || []).map(tech => (
                      <span key={tech} className="project-tech-tag">{tech}</span>
                    ))}
                  </div>
                </motion.div>

                {(project.githubUrl || project.liveUrl) && (
                  <motion.div className="project-detail-sidebar-card" variants={fadeInUp}>
                    <h4>Links</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                          <Github size={16} /> View Source
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}

                {project.features && (
                  <motion.div className="project-detail-sidebar-card" variants={fadeInUp}>
                    <h4>Key Features</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {project.features.split(',').map((feature, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                          <span style={{ color: 'var(--color-accent)', marginTop: '2px' }}>•</span>
                          {feature.trim()}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {project.challenges && (
                  <motion.div className="project-detail-sidebar-card" variants={fadeInUp}>
                    <h4>Challenges</h4>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                      {project.challenges.split(',').map((challenge, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                          <span style={{ color: 'var(--color-warning)', marginTop: '2px' }}>•</span>
                          {challenge.trim()}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </motion.div>
  );
}
