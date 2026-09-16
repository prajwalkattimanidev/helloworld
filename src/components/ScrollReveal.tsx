import React from 'react';
import { motion, useReducedMotion, Variants } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  margin?: string;
  id?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.65,
  distance = 24,
  className = '',
  once = true,
  margin = '-60px',
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0, opacity: 0, scale: 1 };
      case 'down':
        return { y: -distance, x: 0, opacity: 0, scale: 1 };
      case 'left':
        return { x: distance, y: 0, opacity: 0, scale: 1 };
      case 'right':
        return { x: -distance, y: 0, opacity: 0, scale: 1 };
      case 'zoom':
        return { opacity: 0, scale: 0.94, x: 0, y: 0 };
      case 'none':
      default:
        return { opacity: 0, x: 0, y: 0, scale: 1 };
    }
  };

  const variants: Variants = {
    hidden: getInitialPosition(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Cinematic luxury ease-out
      },
    },
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: margin as any }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
