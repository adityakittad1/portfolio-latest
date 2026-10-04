import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../../lib/animations';
import { usePortfolioData } from '../../hooks/usePortfolio';
import { Award, Shield, Trophy, Star, Zap, ExternalLink, X } from 'lucide-react';

const iconMap = { Academic: Award, Certification: Shield, Leadership: Trophy, Technical: Zap };

export default function JourneyTabs() {
  const { certifications: certificationsData, education: educationData, achievements: achievementsData, timeline: timelineData } = usePortfolioData();
  const [activeTab, setActiveTab] = useState('experience');
  const [selectedCert, setSelectedCert] = useState(null);

  const tabs = [
    { id: 'experience', label: 'Timeline' },
    { id: 'credentials', label: 'Credentials' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' }
  ];

  const handleCloseCert = () => setSelectedCert(null);

  return (
    <section className="section" id="journey">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            The Journey
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-8)' }}>
            Growth & Credibility
          </motion.h2>

          {/* TABS */}
          <motion.div className="stack-categories" variants={fadeInUp} style={{ marginBottom: 'var(--space-8)' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`stack-category-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* TAB CONTENT */}
          <div style={{ minHeight: '400px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* TIMELINE */}
                {activeTab === 'experience' && (
                  <div className="journey-timeline" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {timelineData.map((yearGroup) => (
                      <div key={yearGroup.year} className="journey-year">
                        <div className="journey-year-label">{yearGroup.year}</div>
                        <div className="journey-items">
                          {yearGroup.items.map((item, i) => (
                            <div key={i} className="journey-item">
                              <div className="project-category" style={{ marginBottom: 'var(--space-2)' }}>{item.category}</div>
                              <h4 className="journey-item-title">{item.title}</h4>
                              <p className="journey-item-desc">{item.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CREDENTIALS */}
                {activeTab === 'credentials' && (
                  <div className="cert-grid">
                    {certificationsData.map((cert) => (
                      <div
                        key={cert.id}
                        className="cert-card"
                        onClick={() => setSelectedCert(cert)}
                      >
                        <div className="cert-issuer">{cert.issuer}</div>
                        <h3 className="cert-title">{cert.title}</h3>
                        {cert.issueDate && <div className="cert-date">Issued: {cert.issueDate}</div>}
                        <div className="cert-skills">
                          {(cert.skills || []).slice(0, 3).map(skill => (
                            <span key={skill} className="badge badge-neutral">{skill}</span>
                          ))}
                          {(cert.skills || []).length > 3 && (
                            <span className="badge badge-neutral">+{(cert.skills || []).length - 3}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* EDUCATION */}
                {activeTab === 'education' && (
                  <div className="education-timeline" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    {educationData.map((edu) => (
                      <div key={edu.id} className="education-item">
                        <h3 className="education-degree">{edu.degree}</h3>
                        <div className="education-institution">{edu.institution}, {edu.description}</div>
                        <div className="education-date">{edu.startDate && `${edu.startDate} — `}{edu.endDate}</div>
                        {edu.focusAreas && (
                          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)', fontSize: 'var(--text-sm)' }}>
                            <strong>Focus:</strong> {edu.focusAreas}
                          </p>
                        )}
                        {edu.achievements && (
                          <div className="education-achievement">
                            <Award size={16} />
                            <span>{edu.achievements}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* ACHIEVEMENTS */}
                {activeTab === 'achievements' && (
                  <div className="achievements-grid">
                    {achievementsData.filter(a => a.featured).map((achievement) => {
                      const Icon = iconMap[achievement.category] || Star;
                      return (
                        <div key={achievement.id} className="achievement-card">
                          <div className="achievement-icon">
                            <Icon size={24} />
                          </div>
                          <h3 className="achievement-title">{achievement.title}</h3>
                          <p className="achievement-desc">{achievement.description}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="image-viewer-overlay" onClick={handleCloseCert}>
            <button className="image-viewer-close" onClick={handleCloseCert}>
              <X size={24} />
            </button>
            <motion.div
              className="admin-modal"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={e => e.stopPropagation()}
              style={{ padding: 'var(--space-8)' }}
            >
              <div className="cert-issuer">{selectedCert.issuer}</div>
              <h3 className="project-detail-title" style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>
                {selectedCert.title}
              </h3>
              <p className="project-detail-section p" style={{ marginBottom: 'var(--space-6)' }}>
                {selectedCert.description}
              </p>
              
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>SKILLS DEMONSTRATED</h4>
                <div className="cert-skills">
                  {(selectedCert.skills || []).map(skill => (
                    <span key={skill} className="badge badge-neutral">{skill}</span>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                {selectedCert.credentialId && (
                  <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{selectedCert.credentialId}</span>
                  </div>
                )}
                {selectedCert.verificationUrl && (
                  <a href={selectedCert.verificationUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" style={{ padding: '4px 12px' }}>
                    Verify <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
