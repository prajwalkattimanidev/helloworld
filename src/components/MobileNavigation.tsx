import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, MessageCircle, Heart, Search, ShoppingBag } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { DESIGNERS } from '../data/products';
import { useCommerce } from '../context/CommerceContext';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const { wishlistCount, openSearch, setIsCartOpen, cartCount } = useCommerce();
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleSection = (name: string) => {
    setOpenSection((prev) => (prev === name ? null : name));
  };

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25231F]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-xs sm:max-w-sm bg-[#FFFEFC] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E6E0D8]">
          <span className="font-serif-luxury text-xl tracking-wider text-[#25231F] font-medium">
            {BRAND_CONFIG.shortName}
          </span>
          <button
            id="close-mobile-nav-btn"
            onClick={onClose}
            aria-label="Close menu"
            className="w-10 h-10 flex items-center justify-center text-[#25231F] hover:text-[#6D2638] transition-colors rounded-[2px] focus:outline-none focus:ring-1 focus:ring-[#6D2638]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Quick Trigger */}
        <div className="px-5 py-3 border-b border-[#E6E0D8] bg-[#F5F1EB]/60">
          <button
            id="mobile-search-trigger"
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 bg-white border border-[#E6E0D8] text-xs text-[#6C665F] rounded-[2px]"
          >
            <Search className="w-4 h-4 text-[#6C665F]" />
            <span>Search attire, sarees, designers...</span>
          </button>
        </div>

        {/* Scrollable Navigation links */}
        <div className="flex-1 overflow-y-auto px-5 py-4 divide-y divide-[#E6E0D8]/60">
          <ul className="space-y-1 pb-4">
            {/* Home */}
            <li>
              <Link
                id="mobile-nav-home"
                to="/"
                onClick={onClose}
                className="block py-2.5 text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide"
              >
                Home
              </Link>
            </li>

            {/* New Arrivals */}
            <li>
              <Link
                id="mobile-nav-new-arrivals"
                to="/collections/new-arrivals"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide"
              >
                <span>New Arrivals</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#FFFEFC] bg-[#6D2638] px-1.5 py-0.5 rounded-[2px]">
                  New
                </span>
              </Link>
            </li>

            {/* Ready to Ship (Collapsible) */}
            <li>
              <div className="flex items-center justify-between py-2.5">
                <Link
                  id="mobile-nav-ready-to-ship"
                  to="/collections/ready-to-ship"
                  onClick={onClose}
                  className="text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide flex items-center gap-2"
                >
                  <span>Ready to Ship</span>
                  <span className="text-[9px] uppercase font-sans tracking-wider text-[#6D2638] font-medium border border-[#6D2638]/40 px-1 py-0.5">
                    Fast Dispatch
                  </span>
                </Link>
                <button
                  id="mobile-accordion-ready-to-ship"
                  onClick={() => toggleSection('ready-to-ship')}
                  aria-label="Toggle Ready to Ship categories"
                  className="p-1 text-[#6C665F] hover:text-[#25231F]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'ready-to-ship' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openSection === 'ready-to-ship' && (
                <ul className="pl-4 pb-2 space-y-2 border-l border-[#6D2638]/20 ml-2">
                  <li>
                    <Link
                      id="mobile-nav-ready-stitched"
                      to="/collections/ready-to-ship-stitched"
                      onClick={onClose}
                      className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]"
                    >
                      Ready-to-Ship Stitched
                    </Link>
                  </li>
                  <li>
                    <Link
                      id="mobile-nav-ready-unstitched"
                      to="/collections/ready-to-ship-unstitched"
                      onClick={onClose}
                      className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]"
                    >
                      Ready-to-Ship Unstitched Fabric
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Clothing (Collapsible) */}
            <li>
              <div className="flex items-center justify-between py-2.5">
                <Link
                  id="mobile-nav-clothing"
                  to="/collections/clothing"
                  onClick={onClose}
                  className="text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide"
                >
                  Clothing
                </Link>
                <button
                  id="mobile-accordion-clothing"
                  onClick={() => toggleSection('clothing')}
                  aria-label="Toggle clothing subcategories"
                  className="p-1 text-[#6C665F] hover:text-[#25231F]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'clothing' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openSection === 'clothing' && (
                <ul className="pl-4 pb-2 space-y-2 border-l border-[#6D2638]/20 ml-2">
                  <li>
                    <Link to="/collections/anarkalis" onClick={onClose} className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]">
                      Anarkalis & Suits
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/sarees" onClick={onClose} className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]">
                      Sarees & Drapes
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/lehengas" onClick={onClose} className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]">
                      Bridal & Festive Lehengas
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/kurtas" onClick={onClose} className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]">
                      Kurtas & Tunics
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections/contemporary" onClick={onClose} className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]">
                      Contemporary Pret & Co-ords
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Designers (Collapsible) */}
            <li>
              <div className="flex items-center justify-between py-2.5">
                <Link
                  id="mobile-nav-designers"
                  to="/designers"
                  onClick={onClose}
                  className="text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide"
                >
                  Designers
                </Link>
                <button
                  id="mobile-accordion-designers"
                  onClick={() => toggleSection('designers')}
                  aria-label="Toggle designers list"
                  className="p-1 text-[#6C665F] hover:text-[#25231F]"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${openSection === 'designers' ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {openSection === 'designers' && (
                <div className="pl-4 pb-2 space-y-1.5 border-l border-[#6D2638]/20 ml-2 max-h-48 overflow-y-auto">
                  <Link
                    to="/designers"
                    onClick={onClose}
                    className="block py-1 text-xs uppercase tracking-wider text-[#6D2638] font-medium"
                  >
                    View All Designers Directory →
                  </Link>
                  {DESIGNERS.map((d) => (
                    <Link
                      key={d.id}
                      to={`/collections/all?designer=${encodeURIComponent(d.name)}`}
                      onClick={onClose}
                      className="block py-1 text-sm text-[#6C665F] hover:text-[#6D2638]"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            {/* Accessories */}
            <li>
              <Link
                id="mobile-nav-accessories"
                to="/collections/accessories"
                onClick={onClose}
                className="block py-2.5 text-base font-serif-luxury text-[#25231F] hover:text-[#6D2638] tracking-wide"
              >
                Accessories & Jewelry
              </Link>
            </li>

            {/* Sale */}
            <li>
              <Link
                id="mobile-nav-sale"
                to="/collections/sale"
                onClick={onClose}
                className="flex items-center justify-between py-2.5 text-base font-serif-luxury text-[#6D2638] font-medium tracking-wide"
              >
                <span>Sale</span>
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#6D2638] border border-[#6D2638] px-1.5 py-0.5">
                  Exclusive Offers
                </span>
              </Link>
            </li>
          </ul>

          {/* Quick Utility Links */}
          <div className="pt-4 space-y-2 text-sm text-[#6C665F]">
            <Link
              id="mobile-nav-wishlist"
              to="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2 hover:text-[#25231F]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#6D2638]" /> Saved Pieces (Wishlist)
              </span>
              <span className="text-xs bg-[#F5F1EB] px-2 py-0.5 rounded-full font-medium">
                {wishlistCount}
              </span>
            </Link>

            <button
              id="mobile-nav-bag-trigger"
              onClick={() => {
                onClose();
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-between py-2 hover:text-[#25231F] text-left"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#25231F]" /> Shopping Bag
              </span>
              <span className="text-xs bg-[#6D2638] text-white px-2 py-0.5 rounded-full font-medium">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        {/* Concierge & WhatsApp footer in mobile drawer */}
        <div className="p-4 bg-[#F5F1EB] border-t border-[#E6E0D8] space-y-2">
          <p className="text-[11px] uppercase tracking-wider text-[#6C665F]">
            Personal Styling Concierge
          </p>
          <a
            id="mobile-whatsapp-concierge-btn"
            href={BRAND_CONFIG.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25231F] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium rounded-[2px] hover:bg-[#6D2638] transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-[10px] text-center text-[#6C665F]/80">
            Currency: INR (₹) • Worldwide Express Delivery
          </p>
        </div>
      </div>
    </div>
  );
};
