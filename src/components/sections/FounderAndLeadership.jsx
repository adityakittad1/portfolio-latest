import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '../../lib/animations';
import { usePortfolioData } from '../../hooks/usePortfolio';
import { Lightbulb, Code, Palette, Settings, CheckCircle } from 'lucide-react';

const pillars = [
  { icon: Lightbulb, title: 'Founder', desc: 'Identifies opportunities' },
  { icon: Code, title: 'Engineer', desc: 'Builds systems' },
  { icon: Palette, title: 'Creative', desc: 'Understands design' },
  { icon: Settings, title: 'Operator', desc: 'Manages delivery' },
];

export default function FounderAndLeadership() {
  const { experiences } = usePortfolioData();
  const rexora = experiences.find(e => e.id === 'rexora' || e.organization?.toLowerCase().includes('rexora'));
  const leadershipRoles = experiences.filter(e => e.type === 'leadership');

  return (
    <section className="section" id="founder-leadership">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Founder & Leader
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Building products, organizations, and teams.
          </motion.h2>

          <div className="grid-2">
            {/* LEFT: FOUNDER */}
            <motion.div className="founder-card" variants={fadeInUp}>
              <div className="founder-card-header">
                <div className="founder-label">FOUNDER / 001</div>
                <h2 className="founder-name">Rexora Media</h2>
                <p className="founder-role">Technology & Creative Agency · 2025 — Present</p>
              </div>

              <div className="founder-card-body">
                <p className="founder-description">
                  Delivering software development, branding, AI automation, UI/UX, cloud-hosted applications, and digital solutions. Built production client applications using Node.js, Supabase, Vercel, and cloud infrastructure.
                </p>

                <div className="founder-metrics" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-6)' }}>
                  {rexora?.metrics?.map((metric, i) => (
                    <div key={i} className="founder-metric">
                      <div className="founder-metric-value">{metric.value}</div>
                      <div className="founder-metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: LEADER */}
            <motion.div className="leadership-section" variants={fadeInUp}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                {leadershipRoles.map((role) => (
                  <div key={role.id} className="leadership-card" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="leadership-org">{role.organization}</h3>
                    <div className="leadership-role">{role.role}</div>
                    <div className="leadership-date" style={{ marginBottom: 'var(--space-4)' }}>{role.startDate} — {role.endDate}</div>

                    <div className="leadership-achievements" style={{ gap: 'var(--space-2)' }}>
                      {role.achievements.slice(0, 3).map((achievement, i) => (
                        <div key={i} className="leadership-achievement">
                          <CheckCircle size={16} className="check" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {role.metrics && role.metrics.length > 0 && (
                      <div className="leadership-metrics" style={{ marginTop: 'var(--space-5)', paddingTop: 'var(--space-5)' }}>
                        {role.metrics.slice(0, 2).map((metric, i) => (
                          <div key={i} className="leadership-metric">
                            <div className="leadership-metric-value" style={{ fontSize: 'var(--text-xl)' }}>{metric.value}</div>
                            <div className="leadership-metric-label">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
