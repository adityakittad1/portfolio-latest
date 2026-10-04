import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { educationData } from '../../data/initialData';

export default function Education() {
  return (
    <section className="section" id="education">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Academic Background
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Education
          </motion.h2>

          <div className="education-timeline">
            {educationData.map((edu) => (
              <motion.div key={edu.id} className="education-item" variants={fadeInUp}>
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
