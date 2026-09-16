import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { DESIGNERS } from '../data/products';

interface BrandMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandMegaMenu: React.FC<BrandMegaMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Group designers alphabetically
  const grouped = DESIGNERS.reduce((acc, d) => {
    const letter = d.letter.toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(d);
    return acc;
  }, {} as Record<string, typeof DESIGNERS>);

  const sortedLetters = Object.keys(grouped).sort();

  return (
    <div
      id="brand-mega-menu-dropdown"
      role="region"
      aria-label="Designers Directory"
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#FFFEFC] border-b border-[#E6E0D8] shadow-lg py-8 z-30 transition-all animate-in fade-in slide-in-from-top-2 duration-200"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-12 gap-8">
        {/* Left 8 columns: Alphabetical Designer Columns */}
        <div className="col-span-8 border-r border-[#E6E0D8] pr-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#E6E0D8]">
            <h3 className="font-serif-luxury text-2xl tracking-wide text-[#25231F]">
              Curated Designers
            </h3>
            <Link
              id="view-all-designers-link"
              to="/designers"
              onClick={onClose}
              className="text-xs uppercase tracking-widest text-[#6D2638] font-medium hover:underline inline-flex items-center gap-1.5"
            >
              View All Designers <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {sortedLetters.map((letter) => (
              <div key={letter} className="space-y-2">
                <div className="font-serif-luxury text-lg text-[#6D2638] font-semibold border-b border-[#E6E0D8]/60 pb-1">
                  {letter}
                </div>
                <ul className="space-y-1.5">
                  {grouped[letter].map((designer) => (
                    <li key={designer.id}>
                      <Link
                        id={`mega-designer-${designer.id}`}
                        to={`/collections/all?designer=${encodeURIComponent(designer.name)}`}
                        onClick={onClose}
                        className="text-sm text-[#25231F] hover:text-[#6D2638] transition-colors block py-0.5"
                      >
                        {designer.name}
                        <span className="text-[11px] text-[#6C665F] ml-1.5 font-light">
                          ({designer.productCount})
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 columns: Editorial Featured Designer Spotlight */}
        <div className="col-span-4 pl-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#6D2638] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Designer of the Month
            </div>
            <h4 className="font-serif-luxury text-xl text-[#25231F] mb-2">
              Torani
            </h4>
            <p className="text-xs text-[#6C665F] leading-relaxed mb-4">
              Nostalgic fable-inspired aesthetics honoring hand-embroidered organzas, signature chintz florals, and grandmother's heirloom trunks.
            </p>
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1EB] rounded-[2px] mb-4">
              <img
                src="/images/product-kundan-potli.jpg"
                alt="Torani Couture Spotlight"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <Link
            id="explore-spotlight-designer-btn"
            to="/collections/all?designer=Torani"
            onClick={onClose}
            className="inline-flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#25231F] hover:text-[#6D2638] border-t border-[#E6E0D8] pt-3"
          >
            <span>Explore Torani Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
