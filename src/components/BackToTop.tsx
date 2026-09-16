import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled down past 320px
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="back-to-top-button"
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-2.5 sm:px-3.5 sm:py-2.5 rounded-full bg-[#25231F] text-[#FFFEFC] shadow-xl hover:bg-[#6D2638] border border-[#3A3631]/80 backdrop-blur-xs transition-colors duration-300 focus:outline-hidden focus:ring-2 focus:ring-[#6D2638]/50 group"
        >
          <ArrowUp className="w-4 h-4 stroke-[1.75] transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="text-[11px] uppercase tracking-widest font-medium pr-1 hidden sm:inline-block">
            Top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
