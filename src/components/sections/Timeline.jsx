import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { timelineData } from '../../data/initialData';

export default function Timeline() {
  return (
    <section className="section" id="journey">
      <div className="container" style={{ maxWidth: '800px' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Engineering Journey
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Timeline
          </motion.h2>

          <div className="journey-timeline">
            {timelineData.map((yearGroup, index) => (
              <motion.div key={yearGroup.year} className="journey-year" variants={fadeInUp}>
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
