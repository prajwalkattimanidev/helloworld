import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion, AnimatePresence } from 'motion/react';
import { EditorialHero } from '../components/EditorialHero';
import { SectionHeading } from '../components/SectionHeading';
import { ProductGrid } from '../components/ProductGrid';
import { CollectionCard } from '../components/CollectionCard';
import { EditorialBanner } from '../components/EditorialBanner';
import { NewsletterForm } from '../components/NewsletterForm';
import { QuickViewDialog } from '../components/QuickViewDialog';
import { PRODUCTS, DESIGNERS, STYLE_JOURNAL_LOOKS } from '../data/products';
import { BRAND_CONFIG } from '../config/brand';
import { Product } from '../types';

export const HomePage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<'everyday' | 'festive' | 'occasionwear'>('festive');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // 8 Initial New Arrivals for Homepage
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 8);

  // Tabbed Featured Styles
  const tabbedProducts = PRODUCTS.filter((p) => p.styleTab === activeTab).slice(0, 4);

  // Curated Featured Designers (first 5)
  const curatedDesigners = DESIGNERS.slice(0, 5);

  return (
    <div id="store-home-page" className="flex flex-col min-h-screen">
      {/* 1. Editorial Hero */}
      <EditorialHero />

      {/* 2. New Arrivals Section */}
      <section 
        id="section-new-arrivals"
        aria-label="New Arrivals"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full"
      >
        <SectionHeading
          title="The New Arrivals"
          subtitle="Recent additions to our salon edit, tailored in pure handlooms, fluid organzas, and gilded threadwork."
          viewAllLink="/collections/new-arrivals"
          viewAllText="View All New Arrivals"
        />

        <ProductGrid
          products={newArrivals}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      </section>

      {/* 3. Ready-to-Ship Collection Panels */}
      <section
        id="section-ready-to-ship-panels"
        aria-label="Ready to Ship Silhouettes"
        className="bg-[#F5F1EB]/60 border-y border-[#E6E0D8] py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Fast Fulfillment Curations"
            subtitle="Guaranteed dispatch within 24 to 48 hours. Carefully selected for immediate calendar festivities."
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <CollectionCard
              title={BRAND_CONFIG.readyToShipPanels.stitched.title}
              subtitle="Pre-Tailored Silhouettes"
              description={BRAND_CONFIG.readyToShipPanels.stitched.description}
              image={BRAND_CONFIG.readyToShipPanels.stitched.image}
              link={BRAND_CONFIG.readyToShipPanels.stitched.link}
              ctaText={BRAND_CONFIG.readyToShipPanels.stitched.cta}
              badge="Dispatches in 24h"
              index={0}
            />

            <CollectionCard
              title={BRAND_CONFIG.readyToShipPanels.unstitched.title}
              subtitle="Pure Handloom Yardage"
              description={BRAND_CONFIG.readyToShipPanels.unstitched.description}
              image={BRAND_CONFIG.readyToShipPanels.unstitched.image}
              link={BRAND_CONFIG.readyToShipPanels.unstitched.link}
              ctaText={BRAND_CONFIG.readyToShipPanels.unstitched.cta}
              badge="Custom Tailoring Ready"
              index={1}
            />
          </div>
        </div>
      </section>

      {/* 4. Curated Designer Discovery */}
      <section
        id="section-designer-discovery"
        aria-label="Designer Discovery"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full overflow-hidden"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12"
        >
          <div>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Handpicked Ateliers
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F] font-light">
              Designer Discovery
            </h2>
            <p className="text-xs sm:text-sm text-[#6C665F] font-light mt-1">
              Explore revered masters of Indian couture alongside visionary contemporary pret studios.
            </p>
          </div>

          <Link
            id="explore-all-designers-directory-link"
            to="/designers"
            className="shrink-0 mt-3 sm:mt-0 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] font-medium text-[#25231F] hover:text-[#6D2638] border-b border-[#25231F]/40 hover:border-[#6D2638] pb-0.5 transition-colors"
          >
            <span>Complete A–Z Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

        {/* Mobile Horizontal Snap Scroll / Desktop Responsive Grid */}
        <div className="flex md:grid md:grid-cols-5 gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {curatedDesigners.map((designer, idx) => (
            <motion.div
              key={designer.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex-none w-60 sm:w-64 md:w-auto snap-start"
            >
              <Link
                to={`/collections/all?designer=${encodeURIComponent(designer.name)}`}
                className="group flex flex-col bg-[#FFFEFC]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F1EB] rounded-[1px] mb-3">
                  <img
                    src={designer.image}
                    alt={designer.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif-luxury text-lg text-[#25231F] group-hover:text-[#6D2638] transition-colors">
                  {designer.name}
                </h3>
                <p className="text-[11px] text-[#6C665F] font-light">
                  {designer.origin} • {designer.productCount} Pieces
                </p>
                <span className="mt-2 text-[10px] uppercase tracking-widest font-medium text-[#6D2638] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore Collection <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Editorial Full-Width Parallax Campaign Banner */}
      <EditorialBanner />

      {/* 6. Featured Styles with Interactive Tabs */}
      <section
        id="section-featured-styles-tabs"
        aria-label="Featured Styles by Occasion"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto mb-10"
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-medium">
            Considered Dressing
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F] font-light mt-1">
            Featured Styles
          </h2>
          <p className="text-xs sm:text-sm text-[#6C665F] font-light mt-1.5">
            Curated ensembles categorized for intimate daylight gatherings, luminous festive poojas, and celebratory soirees.
          </p>

          {/* Interactive Occasion Tabs */}
          <div className="inline-flex items-center justify-center p-1 bg-[#F5F1EB] rounded-[1px] border border-[#E6E0D8] mt-6">
            {(['everyday', 'festive', 'occasionwear'] as const).map((tab) => (
              <button
                key={tab}
                id={`tab-featured-${tab}`}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs uppercase tracking-widest font-medium rounded-[1px] transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-[#25231F] text-white shadow-xs'
                    : 'text-[#6C665F] hover:text-[#25231F]'
                }`}
              >
                {tab === 'everyday' ? 'Everyday Pret' : tab === 'festive' ? 'Festive' : 'Occasionwear'}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tabbed Products Grid with Smooth Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ProductGrid
              products={tabbedProducts}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 7. Style Journal / Shop The Look */}
      <section
        id="section-style-journal"
        aria-label="Style Journal and Curated Looks"
        className="bg-[#F5F1EB]/40 border-t border-[#E6E0D8] py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="The Style Journal"
            subtitle="Lookbook stories exploring textile provenance, color palettes, and styling recommendations."
            viewAllLink="/collections/all"
            viewAllText="Explore All Looks"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STYLE_JOURNAL_LOOKS.map((journal, idx) => (
              <motion.div
                key={journal.id}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion ? 0 : idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex flex-col bg-[#FFFEFC] border border-[#E6E0D8] rounded-[1px] overflow-hidden"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F1EB]">
                  <img
                    src={journal.image}
                    alt={journal.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-widest font-medium bg-[#25231F]/80 text-[#FFFEFC] px-2 py-0.5">
                      {journal.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#6D2638] font-medium block mb-1">
                      {journal.designer}
                    </span>
                    <h3 className="font-serif-luxury text-xl text-[#25231F] font-normal mb-2 leading-snug">
                      {journal.title}
                    </h3>
                    <p className="text-xs text-[#6C665F] font-light leading-relaxed mb-4">
                      {journal.caption}
                    </p>
                  </div>

                  <Link
                    to="/collections/all"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#25231F] group-hover:text-[#6D2638] transition-colors border-t border-[#E6E0D8] pt-3"
                  >
                    <span>Shop This Curation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <NewsletterForm />

      {/* Quick View Modal */}
      <QuickViewDialog
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
