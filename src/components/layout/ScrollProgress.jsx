import { useScrollPosition } from '../../hooks/usePortfolio';
import { motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollProgress } = useScrollPosition();

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: scrollProgress }}
      aria-hidden="true"
    />
  );
}
