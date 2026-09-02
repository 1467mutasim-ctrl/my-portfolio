import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, viewportOnce } from '@/lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Single-element scroll reveal. Reduced motion leaves only the fade. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
