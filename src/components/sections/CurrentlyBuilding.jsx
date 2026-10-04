import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { currentlyBuildingData } from '../../data/initialData';

export default function CurrentlyBuilding() {
  const activeItems = currentlyBuildingData.filter(item => item.active);

  if (activeItems.length === 0) return null;

  return (
    <section className="section" id="currently-building" style={{ paddingTop: 0 }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Current Focus
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-8)' }}>
            What I'm building now
          </motion.h2>

          <div className="building-grid">
            {activeItems.map((item, index) => (
              <motion.div key={index} className="building-item" variants={fadeInUp}>
                <h3 className="building-item-title">{item.title}</h3>
                <p className="building-item-desc">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
