import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  center?: boolean;
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  viewAllLink,
  viewAllText = "View All",
  center = false,
  className = "",
  id,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-8 sm:mb-12 ${center ? 'text-center' : ''} ${className}`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-3 ${center ? 'sm:justify-center' : ''}`}>
        <div className={center ? 'max-w-xl mx-auto' : ''}>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#25231F] font-normal tracking-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-[#6C665F] font-light mt-1.5 max-w-xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {viewAllLink && (
          <div className="shrink-0 mt-2 sm:mt-0">
            <Link
              to={viewAllLink}
              className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] font-medium text-[#25231F] hover:text-[#6D2638] transition-colors border-b border-[#25231F]/30 hover:border-[#6D2638] pb-0.5"
            >
              <span>{viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};
