import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, MessageCircle, Mail, Instagram, MapPin } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const StoreFooter: React.FC = () => {
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const toggleMobileGroup = (group: string) => {
    setOpenMobileGroup((prev) => (prev === group ? null : group));
  };

  return (
    <footer
      id="store-footer"
      role="contentinfo"
      aria-label="Footer"
      className="bg-[#25231F] text-[#F5F1EB] pt-14 sm:pt-20 pb-12 border-t border-[#3A3631]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Desktop 4-column layout / Mobile Accordions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#3A3631]">
          {/* Col 1: Brand Curation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif-luxury text-2xl tracking-[0.16em] text-white uppercase font-light">
                {BRAND_CONFIG.name}
              </span>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#E6E0D8]/70 mt-0.5">
                {BRAND_CONFIG.tagline}
              </p>
            </Link>

            <p className="text-xs text-[#E6E0D8]/80 font-light leading-relaxed max-w-sm">
              An atelier celebrating authentic South Asian artisanal heritage, handloom textiles, and considered luxury pret for timeless moments.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={BRAND_CONFIG.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tarana Atelier on Instagram"
                className="w-9 h-9 rounded-full bg-[#3A3631] text-[#F5F1EB] hover:text-[#6D2638] hover:bg-white flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Concierge on WhatsApp"
                className="w-9 h-9 rounded-full bg-[#3A3631] text-[#F5F1EB] hover:text-[#25D366] hover:bg-white flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                aria-label="Email concierge"
                className="w-9 h-9 rounded-full bg-[#3A3631] text-[#F5F1EB] hover:text-white hover:bg-[#6D2638] flex items-center justify-center transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: The Collections (Desktop column / Mobile accordion) (2.5 cols) */}
          <div className="lg:col-span-3">
            <div className="md:hidden">
              <button
                onClick={() => toggleMobileGroup('collections')}
                className="w-full flex items-center justify-between py-2 border-b border-[#3A3631] text-xs uppercase tracking-widest font-medium text-white"
              >
                <span>Collections</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openMobileGroup === 'collections' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`space-y-3 md:block ${openMobileGroup === 'collections' ? 'block mt-3' : 'hidden md:block'}`}>
              <h4 className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
                Collections
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E6E0D8]/80 font-light">
                <li>
                  <Link to="/collections/new-arrivals" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link to="/collections/ready-to-ship" className="hover:text-white transition-colors">
                    Ready to Ship (24-48h Dispatch)
                  </Link>
                </li>
                <li>
                  <Link to="/collections/sarees" className="hover:text-white transition-colors">
                    Handloom Sarees &amp; Drapes
                  </Link>
                </li>
                <li>
                  <Link to="/collections/lehengas" className="hover:text-white transition-colors">
                    Bridal &amp; Festive Lehengas
                  </Link>
                </li>
                <li>
                  <Link to="/collections/anarkalis" className="hover:text-white transition-colors">
                    Anarkalis &amp; Suit Sets
                  </Link>
                </li>
                <li>
                  <Link to="/collections/sale" className="text-[#E89B88] hover:text-white transition-colors">
                    Seasonal Archive Sale
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Designers (2.5 cols) */}
          <div className="lg:col-span-2">
            <div className="md:hidden">
              <button
                onClick={() => toggleMobileGroup('designers')}
                className="w-full flex items-center justify-between py-2 border-b border-[#3A3631] text-xs uppercase tracking-widest font-medium text-white"
              >
                <span>Designers</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openMobileGroup === 'designers' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`space-y-3 md:block ${openMobileGroup === 'designers' ? 'block mt-3' : 'hidden md:block'}`}>
              <h4 className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
                Designers
              </h4>
              <ul className="space-y-2.5 text-xs text-[#E6E0D8]/80 font-light">
                <li>
                  <Link to="/designers" className="hover:text-white transition-colors">
                    A-Z Designer Directory
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all?designer=Torani" className="hover:text-white transition-colors">
                    Torani
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all?designer=Raw%20Mango" className="hover:text-white transition-colors">
                    Raw Mango
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all?designer=Anita%20Dongre" className="hover:text-white transition-colors">
                    Anita Dongre
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all?designer=Sabyasachi" className="hover:text-white transition-colors">
                    Sabyasachi
                  </Link>
                </li>
                <li>
                  <Link to="/collections/all?designer=Tara%20Atelier" className="hover:text-white transition-colors">
                    Tara Atelier Studio
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 4: Concierge & Client Support (3 cols) */}
          <div className="lg:col-span-3">
            <div className="md:hidden">
              <button
                onClick={() => toggleMobileGroup('concierge')}
                className="w-full flex items-center justify-between py-2 border-b border-[#3A3631] text-xs uppercase tracking-widest font-medium text-white"
              >
                <span>Client Concierge</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openMobileGroup === 'concierge' ? 'rotate-180' : ''}`} />
              </button>
            </div>

            <div className={`space-y-3 md:block ${openMobileGroup === 'concierge' ? 'block mt-3' : 'hidden md:block'}`}>
              <h4 className="hidden md:block text-xs uppercase tracking-[0.2em] font-medium text-white mb-4">
                Client Concierge
              </h4>
              <div className="space-y-3 text-xs text-[#E6E0D8]/80 font-light">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#6D2638]" />
                  <span>{BRAND_CONFIG.contact.location}</span>
                </div>
                <p>
                  Hours: {BRAND_CONFIG.contact.hours}
                </p>
                <div className="pt-1 space-y-1">
                  <p>WhatsApp: {BRAND_CONFIG.contact.whatsappDisplay}</p>
                  <p>Email: {BRAND_CONFIG.contact.email}</p>
                </div>
                <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#E6E0D8]/60">
                  <Link to="/info/shipping-returns" className="hover:underline">Shipping &amp; Delivery</Link>
                  <Link to="/info/shipping-returns" className="hover:underline">Returns &amp; Exchanges</Link>
                  <Link to="/info/privacy-terms" className="hover:underline">Privacy Policy</Link>
                  <Link to="/info/privacy-terms" className="hover:underline">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E6E0D8]/60 font-light">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.name}. Handcrafted South Asian Fashion Storefront.</p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Currency: INR (₹)</span>
            <span>•</span>
            <span>All major credit cards, UPI, &amp; NetBanking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
