import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { DESIGNERS } from '../data/products';

export const DesignersPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  const filteredDesigners = useMemo(() => {
    return DESIGNERS.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.origin.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLetter = selectedLetter
        ? d.name.toUpperCase().startsWith(selectedLetter)
        : true;

      return matchesSearch && matchesLetter;
    });
  }, [searchTerm, selectedLetter]);

  return (
    <div id="designers-directory-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="text-xs text-[#6C665F] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#25231F]">Home</Link>
        <span>/</span>
        <span className="text-[#25231F] font-medium">Designers</span>
      </nav>

      {/* Header */}
      <div className="pb-8 mb-8 border-b border-[#E6E0D8]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-medium">
          The Curated Roster
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#25231F] mt-1 mb-3">
          Designers &amp; Master Weavers
        </h1>
        <p className="text-xs sm:text-sm text-[#6C665F] font-light max-w-2xl leading-relaxed">
          Discover the celebrated couturiers, handloom revivalists, and modern ateliers crafting the narrative of South Asian luxury.
        </p>
      </div>

      {/* Search and Alphabet Jump Bar */}
      <div className="space-y-6 mb-12">
        <div className="max-w-md relative">
          <Search className="w-4 h-4 text-[#6C665F] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            placeholder="Search designers by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
          />
        </div>

        {/* Alphabetical Filter Bar */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 pb-2 border-b border-[#E6E0D8]">
          <button
            onClick={() => setSelectedLetter(null)}
            className={`px-2.5 py-1 text-xs rounded-[1px] font-medium transition-colors ${
              selectedLetter === null
                ? 'bg-[#25231F] text-white'
                : 'text-[#6C665F] hover:text-[#25231F]'
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => {
            const hasDesigner = DESIGNERS.some((d) => d.name.toUpperCase().startsWith(letter));
            return (
              <button
                key={letter}
                disabled={!hasDesigner}
                onClick={() => setSelectedLetter(letter)}
                className={`w-7 h-7 flex items-center justify-center text-xs rounded-[1px] transition-colors ${
                  selectedLetter === letter
                    ? 'bg-[#6D2638] text-white'
                    : hasDesigner
                    ? 'text-[#25231F] hover:bg-[#F5F1EB]'
                    : 'text-[#6C665F]/30 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Designers Grid */}
      {filteredDesigners.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#E6E0D8]">
          <p className="font-serif-luxury text-2xl text-[#25231F] mb-1">
            No Designers Found
          </p>
          <p className="text-xs text-[#6C665F]">
            Try adjusting your search criteria or select 'All'.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDesigners.map((designer, idx) => (
            <motion.div
              key={designer.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : Math.min((idx % 3) * 0.1, 0.3),
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col bg-[#FFFEFC] border border-[#E6E0D8] rounded-[2px] overflow-hidden hover:shadow-sm transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#F5F1EB]">
                <img
                  src={designer.image}
                  alt={designer.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#25231F]/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[1px]">
                  {designer.origin}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif-luxury text-2xl text-[#25231F] group-hover:text-[#6D2638] transition-colors">
                      {designer.name}
                    </h3>
                    <span className="text-[11px] text-[#6C665F]">
                      {designer.productCount} creations
                    </span>
                  </div>
                  <p className="text-xs text-[#6C665F] font-light leading-relaxed line-clamp-3">
                    {designer.bio}
                  </p>
                </div>

                <Link
                  to={`/collections/all?designer=${encodeURIComponent(designer.name)}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-medium text-[#25231F] group-hover:text-[#6D2638] border-t border-[#E6E0D8] pt-3 transition-colors"
                >
                  <span>Explore Atelier Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
