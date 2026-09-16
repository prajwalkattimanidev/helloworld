import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

interface CollectionCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link: string;
  ctaText?: string;
  badge?: string;
  aspectRatio?: string;
  index?: number;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  subtitle,
  description,
  image,
  link,
  ctaText = "Explore Collection",
  badge,
  aspectRatio = "aspect-[4/5] sm:aspect-[16/11]",
  index = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.65,
        delay: shouldReduceMotion ? 0 : index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden bg-[#F5F1EB] rounded-[2px] flex flex-col justify-end"
    >
      {/* Background Image Container */}
      <div className={`relative w-full ${aspectRatio} overflow-hidden`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Elegant Gradient for Text Legibility */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-[#25231F]/30 to-transparent transition-opacity"
          aria-hidden="true"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10">
            <span className="uppercase tracking-[0.2em] text-[10px] font-medium bg-[#6D2638] text-[#FFFEFC] px-2.5 py-1 rounded-[1px] shadow-sm">
              {badge}
            </span>
          </div>
        )}

        {/* Overlay Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end z-10 text-[#FFFEFC]">
          {subtitle && (
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#E6E0D8] font-medium mb-1">
              {subtitle}
            </span>
          )}
          <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-normal mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-[#F5F1EB]/90 font-light max-w-md line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>

          <div>
            <Link
              to={link}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-white group-hover:text-[#FFFEFC] border-b border-white/60 group-hover:border-white pb-1 transition-all"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
