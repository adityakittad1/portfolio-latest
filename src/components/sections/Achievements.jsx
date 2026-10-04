import { motion } from 'framer-motion';
import { Award, Star, Trophy, Target, Zap, Shield } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { achievementsData } from '../../data/initialData';

const iconMap = {
  Academic: Award,
  Certification: Shield,
  Leadership: Trophy,
  Technical: Zap,
};

export default function Achievements() {
  const featuredAchievements = achievementsData.filter(a => a.featured);

  return (
    <section className="section" id="achievements">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            Recognition
          </motion.div>

          <motion.h2 className="section-title" variants={fadeInUp} style={{ marginBottom: 'var(--space-10)' }}>
            Key Achievements
          </motion.h2>

          <div className="achievements-grid">
            {featuredAchievements.map((achievement) => {
              const Icon = iconMap[achievement.category] || Star;
              return (
                <motion.div key={achievement.id} className="achievement-card" variants={fadeInUp}>
                  <div className="achievement-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-desc">{achievement.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
