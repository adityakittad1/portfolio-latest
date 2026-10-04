import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, sectionViewport } from '../../lib/animations';
import { usePortfolioData } from '../../hooks/usePortfolio';

const domains = [
  'Cloud Computing', 'DevOps', 'Linux / Red Hat', 'Cybersecurity',
  'AI Automation', 'Full-Stack Engineering', 'Infrastructure', 'Technical Leadership'
];

export default function Identity() {
  const { settings } = usePortfolioData();
  const showProfilePhoto = settings?.showProfilePhoto !== false; // default true if undefined

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="section-label" variants={fadeInUp}>
            About
          </motion.div>

          <motion.h2
            className="section-title"
            variants={fadeInUp}
            style={{ maxWidth: '800px', marginBottom: 'var(--space-9)' }}
          >
            More than code. I build systems that work in the real world.
          </motion.h2>

          <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '60px', alignItems: 'center' }}>
            {/* LEFT: Text and Tags */}
            <div style={{ flex: '1 1 450px' }}>
              <div className="identity-content">
                <motion.div className="identity-text" variants={fadeInUp}>
                  <p>
                    I work at the intersection of <strong>software</strong>, <strong>infrastructure</strong>, and <strong>automation</strong> — building things that are designed to be deployed, secured, and scaled.
                  </p>
                  <p>
                    My engineering focus spans <strong>cloud computing</strong>, <strong>DevOps</strong>, <strong>Linux systems</strong>, <strong>cybersecurity</strong>, and <strong>AI-powered automation</strong>. As the founder of Rexora Media, I've shipped production applications for real clients. As Vice President of CSI at MIT CSN, I've led technical initiatives reaching thousands of students.
                  </p>
                  <p>
                    I'm currently pursuing my <strong>B.Tech in Computer Science & Engineering</strong> at Maharashtra Institute of Technology, Chhatrapati Sambhaji Nagar, and was selected for the <strong>B.Tech Honours with Research Programme in 2026</strong>.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp}>
                  <div className="identity-domains">
                    {domains.map((domain) => (
                      <span key={domain} className="identity-domain-tag">{domain}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: Stylized Image Placeholder */}
            {showProfilePhoto && (
              <motion.div 
                variants={fadeInUp} 
                style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center' }}
              >
                <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
                  {/* Accent glow behind image */}
                  <div style={{ position: 'absolute', top: '10%', right: '10%', bottom: '10%', left: '10%', background: '#10b981', filter: 'blur(60px)', opacity: 0.15, zIndex: 0 }}></div>
                  
                  {/* Decorative border offset */}
                  <div style={{ position: 'absolute', top: '15px', right: '-15px', bottom: '-15px', left: '15px', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '24px', zIndex: 1 }}></div>

                  {/* Main Image Container */}
                  <div style={{ position: 'relative', zIndex: 2, aspectRatio: '4/5', background: '#16161a', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                    <img 
                      src={settings?.profilePhotoUrl || "/profile.jpg"} 
                      alt="Aditya Kittad" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9, transition: 'all 0.5s ease' }} 
                      onError={(e) => { 
                        // Fallback professional image if profile.jpg is missing
                        e.target.src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=800&q=80'; 
                      }} 
                    />
                    {/* Glass overlay gradient */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,13,18,0.9) 0%, transparent 40%)' }}></div>
                    
                    {/* Status indicator on image */}
                    <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(20, 20, 25, 0.8)', backdropFilter: 'blur(10px)', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'white' }}>Available for opportunities</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
