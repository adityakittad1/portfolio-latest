import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [loadingText, setLoadingText] = useState('');
  const [progress, setProgress] = useState(0);

  const steps = [
    { text: 'Initializing root environment...', progress: 10 },
    { text: 'Loading kernel extensions...', progress: 30 },
    { text: 'Mounting cloud infrastructure...', progress: 50 },
    { text: 'Establishing secure connections...', progress: 70 },
    { text: 'Compiling DevOps pipelines...', progress: 85 },
    { text: 'Starting Founder Protocol...', progress: 100 },
  ];

  useEffect(() => {
    let currentStep = 0;
    
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setLoadingText(steps[currentStep].text);
        setProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500); // Small delay before hiding loader
      }
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div style={{ width: '300px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--color-accent)', fontSize: '14px' }}>
          <span>SYS_BOOT</span>
          <span>{progress}%</span>
        </div>
        <div style={{ width: '100%', height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', position: 'relative' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: 'var(--color-accent)' }}
          />
        </div>
        <div style={{ marginTop: '16px', color: 'var(--color-text-secondary)', fontSize: '12px' }}>
          &gt; {loadingText}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ display: 'inline-block', width: '8px', height: '12px', backgroundColor: 'var(--color-accent)', marginLeft: '4px', verticalAlign: 'middle' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
