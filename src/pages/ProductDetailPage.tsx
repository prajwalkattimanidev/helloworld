import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Truck, ShieldCheck, ChevronDown, Check, ArrowRight, Share2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PRODUCTS } from '../data/products';
import { useCommerce } from '../context/CommerceContext';
import { ProductGallery } from '../components/ProductGallery';
import { SizeSelector } from '../components/SizeSelector';
import { ProductGrid } from '../components/ProductGrid';
import { BRAND_CONFIG } from '../config/brand';

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { addToCart, isInWishlist, toggleWishlist, formatPrice, showToast } = useCommerce();
  const addToBagBtnRef = useRef<HTMLButtonElement>(null);

  // Find product by slug or id
  const product = PRODUCTS.find((p) => p.slug === productId || p.id === productId);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<'fabric' | 'shipping' | 'authenticity' | null>('fabric');
  const [showStickyPurchaseBar, setShowStickyPurchaseBar] = useState(false);

  // Monitor scroll to reveal mobile sticky purchase bar once user scrolls past main button
  useEffect(() => {
    const handleScroll = () => {
      if (addToBagBtnRef.current) {
        const rect = addToBagBtnRef.current.getBoundingClientRect();
        // If bottom of main button is above viewport, show sticky bar
        setShowStickyPurchaseBar(rect.bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset variant selections when product changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      // Default to first color if available
      if (product.availableColors.length > 0) {
        setSelectedColor(product.availableColors[0].name);
      }
      // If only 1 size (e.g. Unstitched Fabric or One Size), preselect it
      if (product.availableSizes.length === 1) {
        setSelectedSize(product.availableSizes[0]);
      } else {
        setSelectedSize('');
      }
      setQuantity(1);
      setSizeError('');
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif-luxury text-3xl text-[#25231F] mb-4">
          Creation Not Found
        </h1>
        <p className="text-xs text-[#6C665F] mb-6">
          The requested designer silhouette is no longer available in our salon archive.
        </p>
        <Link
          to="/collections/new-arrivals"
          className="px-6 py-3 bg-[#25231F] text-white text-xs uppercase tracking-widest font-medium rounded-[1px]"
        >
          Explore New Arrivals
        </Link>
      </div>
    );
  }

  const isSaved = isInWishlist(product.id);
  const activeColor = selectedColor || product.availableColors[0]?.name || '';

  // Active variant stock check
  const activeVariant = product.variants.find(
    (v) => v.size === selectedSize && (v.color === activeColor || !activeColor)
  );
  const isAvailable = activeVariant ? activeVariant.inStock : true;

  const handleAddToCart = () => {
    if (product.availableSizes.length > 0 && !selectedSize) {
      setSizeError('Please choose your preferred size or select "Custom Stitched".');
      return;
    }
    setSizeError('');
    setIsAdding(true);
    setTimeout(() => {
      addToCart(
        product,
        selectedSize || product.availableSizes[0] || 'Standard',
        activeColor,
        quantity
      );
      setIsAdding(false);
    }, 350);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Direct link copied to clipboard.");
    }
  };

  // Related products from same category or designer
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.designer === product.designer || p.category === product.category)
  ).slice(0, 4);

  return (
    <div id="product-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb navigation" className="text-xs text-[#6C665F] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#25231F]">Home</Link>
        <span>/</span>
        <Link to={`/collections/${product.category}`} className="hover:text-[#25231F] capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <span>/</span>
        <Link to={`/collections/all?designer=${encodeURIComponent(product.designer)}`} className="hover:text-[#25231F]">
          {product.designer}
        </Link>
        <span>/</span>
        <span className="text-[#25231F] font-medium truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery on left, Sticky Info on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 pb-16">
        {/* Left Column: Product Gallery (7 cols on lg) */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images}
            productName={product.name}
          />
        </div>

        {/* Right Column: Information & Actions (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <div className="sticky top-28 space-y-6">
            {/* Header: Designer & Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Link
                  id="pdp-designer-link"
                  to={`/collections/all?designer=${encodeURIComponent(product.designer)}`}
                  className="text-xs uppercase tracking-[0.2em] text-[#6D2638] font-medium hover:underline"
                >
                  {product.designer}
                </Link>

                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="text-[#6C665F] hover:text-[#25231F] p-1 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <h1 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl text-[#25231F] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-medium text-[#25231F]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base text-[#6C665F] line-through font-normal">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.isSale && (
                  <span className="text-[11px] uppercase tracking-widest font-medium text-[#6D2638] bg-[#F5F1EB] px-2 py-0.5 rounded-[1px]">
                    Special Festive Offering
                  </span>
                )}
              </div>

              <p className="text-[11px] text-[#6C665F] mt-1">
                Inclusive of all taxes. Complimentary express domestic delivery on orders over ₹15,000.
              </p>
            </div>

            {/* Ready to ship badge / dispatch notice */}
            <div className="p-3.5 bg-[#F5F1EB] border border-[#E6E0D8] rounded-[2px] flex items-start gap-3 text-xs text-[#25231F]">
              <Truck className="w-4 h-4 text-[#6D2638] shrink-0 mt-0.5" />
              <div>
                <span className="font-medium block">
                  {product.isReadyToShip ? "Ready to Ship Silhouette" : "Artisanal Made to Order"}
                </span>
                <span className="text-[#6C665F] font-light">
                  {product.shippingDetails}
                </span>
              </div>
            </div>

            {/* Color Palette Selector */}
            {product.availableColors.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#25231F] mb-2">
                  <span>Color: <strong className="text-[#6D2638] font-normal">{activeColor}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  {product.availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      aria-label={`Select color ${color.name}`}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-[1px] border text-xs transition-all ${
                        activeColor === color.name
                          ? 'border-[#6D2638] bg-[#F5F1EB] text-[#25231F]'
                          : 'border-[#E6E0D8] bg-white text-[#6C665F] hover:border-[#25231F]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.availableSizes.length > 0 && (
              <SizeSelector
                availableSizes={product.availableSizes}
                selectedSize={selectedSize}
                onSelectSize={(size) => {
                  setSelectedSize(size);
                  setSizeError('');
                }}
                variants={product.variants}
                currentColor={activeColor}
                errorMessage={sizeError}
              />
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs uppercase tracking-widest font-medium text-[#25231F]">
                Quantity
              </span>
              <div className="flex items-center border border-[#E6E0D8] rounded-[1px]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="w-8 text-center text-xs font-medium">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag and Wishlist Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                ref={addToBagBtnRef}
                id="pdp-add-to-bag-btn"
                type="button"
                disabled={!isAvailable || isAdding}
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-[0.18em] font-medium rounded-[1px] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <span>Adding to Bag...</span>
                ) : isAvailable ? (
                  <>
                    <span>Add to Shopping Bag</span>
                    <span>•</span>
                    <span>{formatPrice(product.price * quantity)}</span>
                  </>
                ) : (
                  <span>Sold Out in Selection</span>
                )}
              </button>

              <button
                id="pdp-wishlist-toggle-btn"
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                className={`w-12 h-12 border rounded-[1px] flex items-center justify-center transition-colors shrink-0 ${
                  isSaved
                    ? 'border-[#6D2638] bg-[#F5F1EB] text-[#6D2638]'
                    : 'border-[#E6E0D8] bg-white text-[#25231F] hover:border-[#25231F]'
                }`}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* WhatsApp Concierge Assistance */}
            <a
              id="pdp-whatsapp-styling-btn"
              href={`${BRAND_CONFIG.contact.whatsappUrl}&text=Hello%20Tarana%20Atelier,%20I%20have%20a%20question%20about%20${encodeURIComponent(product.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#E6E0D8] bg-white text-xs uppercase tracking-widest text-[#25231F] hover:bg-[#F5F1EB] rounded-[1px] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Styling Assistance via WhatsApp</span>
            </a>

            {/* Description & Overview */}
            <div className="pt-4 border-t border-[#E6E0D8] space-y-2">
              <h3 className="text-xs uppercase tracking-widest font-medium text-[#25231F]">
                The Design
              </h3>
              <p className="text-xs sm:text-[13px] text-[#6C665F] leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Collapsible Information Accordions */}
            <div className="border-t border-[#E6E0D8] divide-y divide-[#E6E0D8]">
              {/* Accordion 1: Fabric & Care */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'fabric' ? null : 'fabric')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#25231F]"
                >
                  <span>Fabric &amp; Care Details</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'fabric' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'fabric' && (
                  <ul className="pb-4 space-y-1.5 text-xs text-[#6C665F] font-light">
                    {product.fabricCare.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#6D2638] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Accordion 2: Shipping & Delivery */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#25231F]"
                >
                  <span>Shipping &amp; Delivery</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-4 space-y-2 text-xs text-[#6C665F] font-light leading-relaxed">
                    <p>
                      <strong>Domestic Shipping:</strong> Dispatched via trusted air couriers (BlueDart / DHL Express). Complimentary on all orders above ₹15,000 across India.
                    </p>
                    <p>
                      <strong>International Orders:</strong> Worldwide express delivery available. Duties and taxes assessed at international transit.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Authenticity Guarantee */}
              <div>
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'authenticity' ? null : 'authenticity')}
                  className="w-full py-3.5 flex items-center justify-between text-xs uppercase tracking-widest font-medium text-[#25231F]"
                >
                  <span>Atelier Authenticity</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${activeAccordion === 'authenticity' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'authenticity' && (
                  <div className="pb-4 text-xs text-[#6C665F] font-light leading-relaxed space-y-1">
                    <p>
                      Every garment is directly sourced from certified designer ateliers and master weaving clusters with Silk Mark authentication where applicable.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="pt-12 border-t border-[#E6E0D8]"
        >
          <div className="mb-8">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-medium">
              Curated Harmonies
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#25231F]">
              You May Also Admire
            </h2>
          </div>
          <ProductGrid products={relatedProducts} />
        </motion.section>
      )}

      {/* Mobile Sticky Purchase Bar (Fixed to bottom, smoothly slides in on scroll) */}
      <AnimatePresence>
        {showStickyPurchaseBar && (
          <motion.div 
            id="mobile-sticky-purchase-bar"
            initial={shouldReduceMotion ? false : { y: '100%' }}
            animate={{ y: 0 }}
            exit={shouldReduceMotion ? undefined : { y: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FFFEFC] border-t border-[#E6E0D8] p-3 z-30 shadow-lg flex items-center gap-3"
          >
            <div className="flex-1 overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-[#6C665F] truncate">
                {product.designer}
              </p>
              <p className="text-sm font-medium text-[#25231F]">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="px-5 py-3 bg-[#25231F] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
            >
              {selectedSize ? "Add to Bag" : "Select Size"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
