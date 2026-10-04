import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ZoomIn } from 'lucide-react';
import { fadeInUp, staggerContainer, overlayVariants, scaleIn } from '../../lib/animations';
import { certificationsData } from '../../data/initialData';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  const handleClose = () => setSelectedCert(null);

  return (
    <section className="section" id="certifications">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Credential Vault
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp}>
            Verified capabilities
          </motion.h2>

          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Industry certifications and qualifications.
          </motion.p>

          <div className="cert-grid">
            {certificationsData.map((cert) => (
              <motion.div
                key={cert.id}
                className="cert-card"
                variants={fadeInUp}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="image-viewer-overlay" onClick={handleClose}>
            <button className="image-viewer-close" onClick={handleClose}>
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
