import { motion } from 'framer-motion';
import { Lightbulb, Terminal, Shield, Workflow, Trophy } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const roles = [
  { icon: Lightbulb, title: 'FOUNDER', domain: 'REXORA MEDIA', desc: 'Identifying opportunities and building a technology agency.' },
  { icon: Terminal, title: 'ENGINEER', domain: 'CLOUD / DEVOPS', desc: 'Architecting scalable infrastructure and software.' },
  { icon: Shield, title: 'SECURITY', domain: 'CYBERSECURITY', desc: 'Ensuring systems are robust and compliant.' },
  { icon: Workflow, title: 'BUILDER', domain: 'AI / AUTOMATION', desc: 'Creating intelligent workflows and tools.' },
  { icon: Trophy, title: 'LEADER', domain: 'CSI / TPEC', desc: 'Directing teams and massive technical events.' },
];

export default function RoleVisualization() {
  return (
    <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>
            <motion.h2 className="section-title" variants={fadeInUp}>
              The Multi-Faceted Builder
            </motion.h2>
          </div>

          <div className="role-viz">
            {roles.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div key={i} className="role-card" variants={fadeInUp}>
                  <div className="role-card-icon">
                    <Icon size={28} />
                  </div>
                  <div className="role-card-domain">{role.domain}</div>
                  <h3 className="role-card-title">{role.title}</h3>
                  <p className="role-card-desc">{role.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
