import { motion } from 'framer-motion';
import { Lightbulb, Code, Palette, Settings } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from '../../lib/animations';

const pillars = [
  { icon: Lightbulb, title: 'Founder', desc: 'Identifies opportunities' },
  { icon: Code, title: 'Engineer', desc: 'Builds systems' },
  { icon: Palette, title: 'Creative', desc: 'Understands design' },
  { icon: Settings, title: 'Operator', desc: 'Manages delivery' },
];

export default function Founder() {
  return (
    <section className="section" id="founder">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Founder Story
          </motion.div>

          <motion.div className="founder-card" variants={fadeInUp}>
            <div className="founder-card-header">
              <div className="founder-label">REXORA / 001</div>
              <h2 className="founder-name">Rexora Media</h2>
              <p className="founder-role">Founder · 2025 — Present</p>
            </div>

            <div className="founder-card-body">
              <p className="founder-description">
                A technology and creative solutions agency delivering software development, branding, AI automation, UI/UX, cloud-hosted applications, and digital solutions. Built production client applications using Node.js/Express, Supabase, Vercel and cloud infrastructure.
              </p>

              <motion.div className="founder-pillars" variants={staggerContainer}>
                {pillars.map(({ icon: Icon, title, desc }) => (
                  <motion.div key={title} className="founder-pillar" variants={scaleIn}>
                    <div className="founder-pillar-icon">
                      <Icon size={20} />
                    </div>
                    <div className="founder-pillar-title">{title}</div>
                    <div className="founder-pillar-desc">{desc}</div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="founder-metrics">
                <div className="founder-metric">
                  <div className="founder-metric-value">700+</div>
                  <div className="founder-metric-label">Freelancer Network</div>
                </div>
                <div className="founder-metric">
                  <div className="founder-metric-value">8</div>
                  <div className="founder-metric-label">Core Members</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
