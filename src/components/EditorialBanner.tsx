import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { BRAND_CONFIG } from '../config/brand';

export const EditorialBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const banner = BRAND_CONFIG.campaignBanner;

  // Subtle parallax effect on desktop only
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  return (
    <section
      ref={containerRef}
      id="editorial-campaign-banner"
      aria-label="Editorial Highlight"
      className="relative w-full my-16 sm:my-24 overflow-hidden bg-[#25231F]"
    >
      <div className="relative w-full min-h-[360px] sm:min-h-[460px] flex items-center justify-center py-16 px-6">
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : yOffset }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
        >
          <img
            src={banner.bgImage}
            alt="Handwoven Indian Couture Craftsmanship"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          {/* Contrast scrim */}
          <div 
            className="absolute inset-0 bg-[#25231F]/55 backdrop-brightness-95"
            aria-hidden="true"
          />
        </motion.div>

        {/* Centered Editorial Message */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-3xl mx-auto text-center text-[#FFFEFC] space-y-5"
        >
          <span className="uppercase tracking-[0.25em] text-[11px] font-medium text-[#E6E0D8] inline-block">
            Artisanal Heritage
          </span>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight">
            "{banner.quote}"
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#F5F1EB]/90 font-light max-w-lg mx-auto leading-relaxed">
            {banner.subtext}
          </p>

          <div className="pt-2">
            <Link
              id="editorial-banner-cta-btn"
              to={banner.ctaLink}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#FFFEFC] text-[#25231F] hover:bg-[#6D2638] hover:text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors shadow-sm rounded-[1px]"
            >
              {banner.ctaText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
