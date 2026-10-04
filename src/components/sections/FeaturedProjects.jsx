import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { usePortfolioData } from '../../hooks/usePortfolio';

export default function FeaturedProjects() {
  const { projects } = usePortfolioData();
  const featuredProjects = projects.filter(p => p.featured).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="section" id="work">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Featured Work
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp}>
            Proof of engineering
          </motion.h2>

          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Systems, products, and solutions built for production and research.
          </motion.p>

          <div className="projects-list">
            {featuredProjects.map((project, index) => (
              <motion.div key={project.id} className="project-card" variants={fadeInUp}>
                <div className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="project-info">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.shortDescription}</p>

                  <div className="project-tech-tags">
                    {(project.technologies || []).slice(0, 5).map(tech => (
                      <span key={tech} className="project-tech-tag">{tech}</span>
                    ))}
                    {(project.technologies || []).length > 5 && (
                      <span className="project-tech-tag">+{(project.technologies || []).length - 5} more</span>
                    )}
                  </div>

                  <div className="project-links">
                    <Link to={`/projects/${project.slug || project.id}`} className="btn btn-primary btn-sm">
                      View Case Study
                      <ArrowUpRight size={16} />
                    </Link>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-icon">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-icon">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* For the visual placeholder, we can use an image if available, else a styled block */}
                <div className="project-visual">
                  <div className="project-visual-placeholder">
                    <span>PROJECT / {(project.slug || '').toUpperCase()}</span>
                    <span>VISUAL ASSET PENDING</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
