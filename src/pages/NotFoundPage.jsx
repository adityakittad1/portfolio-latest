import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, Home } from 'lucide-react';
import { pageTransition, fadeInUp, staggerContainer } from '../lib/animations';

export default function NotFoundPage() {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-6)',
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ textAlign: 'center', maxWidth: '500px' }}
      >
        <motion.div variants={fadeInUp} style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-6)' }}>
          <Terminal size={64} style={{ margin: '0 auto' }} />
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="section-title" style={{ marginBottom: 'var(--space-4)' }}>
          404: Not Found
        </motion.h1>
        
        <motion.p variants={fadeInUp} className="section-subtitle" style={{ margin: '0 auto var(--space-8)' }}>
          The requested resource could not be located on this server.
        </motion.p>
        
        <motion.div variants={fadeInUp}>
          <Link to="/" className="btn btn-primary">
            <Home size={18} /> Return Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
