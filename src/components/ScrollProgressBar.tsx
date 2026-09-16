import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress using spring physics for a luxurious feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] pointer-events-none bg-transparent"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-[#6D2638] via-[#C5A880] to-[#6D2638] origin-left shadow-[0_0_8px_rgba(109,38,56,0.4)]"
        style={{ scaleX }}
      />
    </div>
  );
};
