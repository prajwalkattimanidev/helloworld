import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, Mail, MessageCircle } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const InfoPage: React.FC = () => {
  const { topic } = useParams<{ topic?: string }>();

  const isShippingReturns = topic === 'shipping-returns' || !topic;

  return (
    <div id="info-editorial-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="text-xs text-[#6C665F] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#25231F]">Home</Link>
        <span>/</span>
        <span className="text-[#25231F] font-medium">
          {isShippingReturns ? 'Shipping & Returns' : 'Privacy & Terms'}
        </span>
      </nav>

      {/* Header */}
      <div className="pb-8 mb-10 border-b border-[#E6E0D8]">
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-medium">
          Client Concierge
        </span>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#25231F] mt-1 mb-3">
          {isShippingReturns ? 'Shipping & Returns Protocol' : 'Privacy & Terms of Service'}
        </h1>
        <p className="text-xs sm:text-sm text-[#6C665F] font-light max-w-xl leading-relaxed">
          Transparent guidelines regarding dispatch timelines, international courier handling, alterations, and data safety.
        </p>
      </div>

      {isShippingReturns ? (
        <div className="space-y-10 text-xs sm:text-sm text-[#25231F] font-light leading-relaxed">
          {/* Section 1: Shipping */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-base font-medium font-serif-luxury text-[#25231F]">
              <Truck className="w-4 h-4 text-[#6D2638]" />
              <h2>Domestic &amp; Global Shipping</h2>
            </div>
            <p className="text-[#6C665F]">
              All orders are dispatched from our South Asian atelier network in protective archival packaging to ensure your garments arrive in immaculate presentation.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6C665F]">
              <li>
                <strong>Ready to Ship Pieces:</strong> Dispatched within 24 to 48 hours via BlueDart or DHL Express air freight. Estimated delivery across metro cities in India is 2–4 business days.
              </li>
              <li>
                <strong>Made-to-Order &amp; Couture:</strong> Handwoven textiles and bespoke embroidery kalidars typically require 15 to 28 business days for master artisan execution.
              </li>
              <li>
                <strong>Complimentary Domestic Delivery:</strong> All orders with a subtotal exceeding ₹15,000 qualify for free express shipping within India.
              </li>
              <li>
                <strong>International Shipping:</strong> We ship worldwide to the USA, UK, UAE, Canada, and Singapore via DHL Express with complete door-to-door tracking.
              </li>
            </ul>
          </section>

          {/* Section 2: Returns & Exchanges */}
          <section className="space-y-3 pt-6 border-t border-[#E6E0D8]">
            <div className="flex items-center gap-2 text-base font-medium font-serif-luxury text-[#25231F]">
              <RotateCcw className="w-4 h-4 text-[#6D2638]" />
              <h2>Returns &amp; Exchange Policies</h2>
            </div>
            <p className="text-[#6C665F]">
              Because each ensemble is crafted in limited numbers, we offer exchanges and store credit within 7 calendar days of verified shipment delivery:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6C665F]">
              <li>
                Standard sized garments in unworn, unwashed condition with original security tags and fabric tags intact may be exchanged for a different size or store credit.
              </li>
              <li>
                Custom tailored pieces (including custom stitched blouses and bespoke falls) are created specifically to your individual measurements and cannot be returned, but include complimentary alteration adjustments.
              </li>
              <li>
                Unstitched fabrics must remain uncut and untampered in original presentation packaging.
              </li>
            </ul>
          </section>

          {/* Section 3: Concierge Assistance */}
          <section className="p-6 bg-[#F5F1EB] border border-[#E6E0D8] rounded-[2px] space-y-3">
            <h3 className="font-serif-luxury text-lg text-[#25231F]">
              Have a question about an active shipment?
            </h3>
            <p className="text-xs text-[#6C665F]">
              Our client concierge is at your service Monday through Saturday to provide live dispatch updates or discuss bespoke delivery timelines.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href={BRAND_CONFIG.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25231F] text-white text-xs uppercase tracking-wider font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
              <a
                href={`mailto:${BRAND_CONFIG.contact.email}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#E6E0D8] bg-white text-xs uppercase tracking-wider font-medium text-[#25231F] hover:border-[#25231F] rounded-[1px] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Concierge</span>
              </a>
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8 text-xs sm:text-sm text-[#6C665F] font-light leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#25231F]">
              Privacy &amp; Data Security
            </h2>
            <p>
              At {BRAND_CONFIG.name}, we hold client privacy with utmost sanctity. We collect personal contact and shipping information solely to process orders, communicate bespoke measurement updates, and fulfill shipments. We do not sell or monetize client identities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif-luxury text-xl text-[#25231F]">
              Terms of Salon Service
            </h2>
            <p>
              All textile designs, campaign imagery, and atelier editorial text on this platform are intellectual assets of {BRAND_CONFIG.name} and our contributing designer partners. Handwoven textiles may feature subtle organic variations in slub and thread tension, representing genuine human craftsmanship rather than industrial defects.
            </p>
          </section>
        </div>
      )}
    </div>
  );
};
