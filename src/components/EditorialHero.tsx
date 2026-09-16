import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Columns, Maximize2 } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const EditorialHero: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroConfig = BRAND_CONFIG.editorialHero;
  const slides = heroConfig.slides || [
    {
      id: "slide-default",
      collectionLabel: heroConfig.collectionLabel,
      headline: heroConfig.headline,
      supportingText: heroConfig.supportingText,
      ctaText: heroConfig.ctaText,
      ctaLink: heroConfig.ctaLink,
      secondaryLinkText: heroConfig.secondaryLinkText,
      secondaryLink: heroConfig.secondaryLink,
      image: heroConfig.imageDesktop,
      aspectRatio: "2/3",
      palette: {
        bg: "#4A0812",
        accent: "#D4AF37",
      },
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'split' | 'cinematic'>('split');
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = slides[currentIndex] || slides[0];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-play slides every 7 seconds when not hovered/paused
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides.length]);

  return (
    <section
      id="editorial-campaign-hero"
      aria-label="Featured Campaign Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full overflow-hidden transition-colors duration-700"
      style={{
        backgroundColor: activeSlide.palette?.bg || '#3E0911',
      }}
    >
      {/* Ambient Radial Gradient Glows for Studio Atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background: `radial-gradient(circle at 75% 45%, rgba(212, 175, 55, 0.18) 0%, rgba(207, 38, 57, 0.28) 35%, transparent 70%), radial-gradient(circle at 15% 60%, rgba(0, 0, 0, 0.4) 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Subtle luxury textile grid pattern watermark */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#FFF 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* DESKTOP VIEWPORT PRESENTATION (md and above) */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12 w-full">
        {layoutMode === 'split' ? (
          /* 1. Editorial Split Showcase: Full 2:3 vertical photo displayed completely alongside typography */
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center min-h-[580px] lg:min-h-[660px]">
            {/* Left Editorial Text Column (5 cols) */}
            <div className="col-span-12 md:col-span-6 lg:col-span-5 text-[#FFFEFC] z-10 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="w-6 h-px bg-[#D4AF37]" />
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                      {activeSlide.collectionLabel}
                    </span>
                  </div>

                  <h1 className="font-serif-luxury text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-[1.08] font-normal">
                    {activeSlide.headline}
                  </h1>

                  <p className="text-xs sm:text-sm text-[#F5F1EB]/85 font-light leading-relaxed max-w-md">
                    {activeSlide.supportingText}
                  </p>

                  {/* Primary & Secondary Action CTAs */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link
                      id="hero-primary-shop-cta"
                      to={activeSlide.ctaLink}
                      className="inline-flex items-center justify-center px-7 py-3.5 bg-[#FFFEFC] text-[#25231F] text-xs uppercase tracking-[0.16em] font-medium rounded-[1px] hover:bg-[#D4AF37] hover:text-[#25231F] transition-all duration-300 shadow-md"
                    >
                      <span>{activeSlide.ctaText}</span>
                    </Link>

                    {activeSlide.secondaryLink && (
                      activeSlide.secondaryLink.startsWith('http') ? (
                        <a
                          id="hero-secondary-cta-link"
                          href={activeSlide.secondaryLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#FFFEFC] hover:text-[#D4AF37] transition-colors border-b border-white/40 hover:border-[#D4AF37] pb-1"
                        >
                          <span>{activeSlide.secondaryLinkText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link
                          id="hero-secondary-cta-link"
                          to={activeSlide.secondaryLink}
                          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] font-medium text-[#FFFEFC] hover:text-[#D4AF37] transition-colors border-b border-white/40 hover:border-[#D4AF37] pb-1"
                        >
                          <span>{activeSlide.secondaryLinkText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls & Carousel Dots */}
              <div className="pt-4 flex items-center gap-6 border-t border-white/15">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous Campaign Slide"
                    className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next Campaign Slide"
                    className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1 transition-all rounded-full ${
                        currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] font-mono tracking-widest text-white/60">
                  0{currentIndex + 1} / 0{slides.length}
                </span>
              </div>
            </div>

            {/* Right Photograph Showcase Column (7 cols): Full 100% Uncropped Image */}
            <div className="col-span-12 md:col-span-6 lg:col-span-7 flex items-center justify-center lg:justify-end z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group max-w-[480px] lg:max-w-[520px] w-full"
                >
                  {/* Outer Luxury Frame with Subtle Gold Accent Border */}
                  <div className="relative aspect-[2/3] w-full bg-[#200508] rounded-[2px] overflow-hidden shadow-2xl ring-1 ring-white/20">
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.headline}
                      loading="eager"
                      fetchPriority="high"
                      className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {/* Subtle Vignette Overlay along outer edges */}
                    <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/20" />

                    {/* Badge Indicator */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-[#FFFEFC] px-3 py-1 rounded-[1px] text-[10px] uppercase tracking-widest font-medium border border-white/10">
                      Uncut Archive
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* 2. Cinematic Canvas: Full-bleed presentation with ambient background fitting */
          <div className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-between">
            {/* Centered / Contained Full Image that never gets cropped */}
            <div className="absolute inset-0 flex items-center justify-end pr-8 lg:pr-16 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSlide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  src={activeSlide.image}
                  alt={activeSlide.headline}
                  className="h-full max-h-[640px] w-auto object-contain object-right drop-shadow-2xl"
                />
              </AnimatePresence>
            </div>

            {/* Left Content with High Contrast readable overlay */}
            <div className="relative max-w-xl text-[#FFFEFC] space-y-4 z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent p-6 rounded-[2px]">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-medium">
                {activeSlide.collectionLabel}
              </span>
              <h1 className="font-serif-luxury text-4xl lg:text-5xl xl:text-6xl tracking-tight text-white leading-tight">
                {activeSlide.headline}
              </h1>
              <p className="text-xs sm:text-sm text-[#F5F1EB]/90 font-light leading-relaxed max-w-md">
                {activeSlide.supportingText}
              </p>
              <div className="pt-2 flex items-center gap-4">
                <Link
                  to={activeSlide.ctaLink}
                  className="px-7 py-3.5 bg-[#FFFEFC] text-[#25231F] text-xs uppercase tracking-[0.16em] font-medium rounded-[1px] hover:bg-[#D4AF37]"
                >
                  {activeSlide.ctaText}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* View Layout Switcher (Editorial Split vs Full Canvas) */}
        <div className="absolute bottom-4 right-8 lg:right-12 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[11px] text-white/80">
          <span className="text-[10px] uppercase tracking-wider text-white/60">Layout:</span>
          <button
            type="button"
            onClick={() => setLayoutMode('split')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors ${
              layoutMode === 'split' ? 'bg-[#D4AF37] text-[#25231F] font-medium' : 'hover:text-white'
            }`}
          >
            <Columns className="w-3 h-3" />
            <span>Split Gallery</span>
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode('cinematic')}
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full transition-colors ${
              layoutMode === 'cinematic' ? 'bg-[#D4AF37] text-[#25231F] font-medium' : 'hover:text-white'
            }`}
          >
            <Maximize2 className="w-3 h-3" />
            <span>Ambient Fit</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEWPORT PRESENTATION (Below md) */}
      {/* Shows the entire uncropped image at the top with natural 2:3 aspect ratio */}
      {/* ========================================================================= */}
      <div className="md:hidden flex flex-col">
        {/* Uncropped Mobile Photo Container (2:3 aspect ratio matches the 2000x3000 photo) */}
        <div className="relative aspect-[2/3] w-full bg-[#200508] overflow-hidden">
          <img
            src={activeSlide.image}
            alt={activeSlide.headline}
            loading="eager"
            className="w-full h-full object-contain object-center"
          />

          <div className="absolute top-4 left-4">
            <span className="uppercase tracking-[0.2em] text-[10px] font-medium bg-[#25231F]/90 text-[#FFFEFC] px-2.5 py-1 rounded-[1px] border border-white/15">
              {activeSlide.collectionLabel}
            </span>
          </div>

          {/* Mobile slide navigators */}
          {slides.length > 1 && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] text-white font-mono">
              <span>0{currentIndex + 1}</span>
              <span className="text-white/40">/</span>
              <span>0{slides.length}</span>
            </div>
          )}
        </div>

        {/* Mobile Narrative & CTAs below photo */}
        <div className="p-6 bg-[#2B050B] text-white space-y-3">
          <h1 className="font-serif-luxury text-2xl sm:text-3xl tracking-tight text-white leading-snug">
            {activeSlide.headline}
          </h1>

          <p className="text-xs text-[#F5F1EB]/80 font-light leading-relaxed">
            {activeSlide.supportingText}
          </p>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              id="hero-mobile-primary-shop-cta"
              to={activeSlide.ctaLink}
              className="w-full flex items-center justify-center py-3.5 bg-[#FFFEFC] text-[#25231F] text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#D4AF37] transition-colors shadow-sm"
            >
              {activeSlide.ctaText}
            </Link>

            {activeSlide.secondaryLink && (
              activeSlide.secondaryLink.startsWith('http') ? (
                <a
                  id="hero-mobile-secondary-cta-link"
                  href={activeSlide.secondaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-white/10 transition-colors"
                >
                  {activeSlide.secondaryLinkText}
                </a>
              ) : (
                <Link
                  id="hero-mobile-secondary-cta-link"
                  to={activeSlide.secondaryLink}
                  className="w-full flex items-center justify-center py-3 border border-white/20 text-white text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-white/10 transition-colors"
                >
                  {activeSlide.secondaryLinkText}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
