import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { experienceData } from '../../data/initialData';

export default function Leadership() {
  const leadershipRoles = experienceData.filter(e => e.type === 'leadership' || e.type === 'founder');

  return (
    <section className="section" id="experience">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Experience & Leadership
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp}>
            Leading initiatives, building impact
          </motion.h2>

          <motion.p className="section-subtitle" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            From founding a tech agency to leading student organizations impacting thousands.
          </motion.p>

          <div className="leadership-grid">
            {leadershipRoles.filter(r => r.id !== 'rexora').map((role) => (
              <motion.div key={role.id} className="leadership-card" variants={fadeInUp}>
                <h3 className="leadership-org">{role.organization}</h3>
                <div className="leadership-role">{role.role}</div>
                <div className="leadership-date">{role.startDate} — {role.endDate}</div>

                <p className="leadership-desc">{role.description}</p>

                <div className="leadership-achievements">
                  {role.achievements.map((achievement, i) => (
                    <div key={i} className="leadership-achievement">
                      <CheckCircle size={16} className="check" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                {role.metrics && role.metrics.length > 0 && (
                  <div className="leadership-metrics">
                    {role.metrics.map((metric, i) => (
                      <div key={i} className="leadership-metric">
                        <div className="leadership-metric-value">{metric.value}</div>
                        <div className="leadership-metric-label">{metric.label}</div>
                      </div>
                    ))}
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
