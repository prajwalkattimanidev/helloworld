import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCommerce } from '../context/CommerceContext';
import { SizeSelector } from './SizeSelector';

interface QuickViewDialogProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewDialog: React.FC<QuickViewDialogProps> = ({ product, onClose }) => {
  const { addToCart, isInWishlist, toggleWishlist, formatPrice } = useCommerce();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sizeError, setSizeError] = useState('');

  if (!product) return null;

  const isSaved = isInWishlist(product.id);
  const activeColor = selectedColor || product.availableColors[0]?.name || '';

  const handleAddToCart = () => {
    if (product.availableSizes.length > 0 && !selectedSize) {
      setSizeError('Please select a size to proceed.');
      return;
    }
    setSizeError('');
    addToCart(
      product,
      selectedSize || product.availableSizes[0] || 'Standard',
      activeColor,
      1
    );
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick preview of ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25231F]/60 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-3xl bg-[#FFFEFC] rounded-[2px] shadow-2xl border border-[#E6E0D8] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          aria-label="Close quick preview"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-[#25231F] flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Product Image */}
          <div className="relative aspect-[3/4] bg-[#F5F1EB]">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top"
            />
            {product.isReadyToShip && (
              <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-[#25231F] text-white px-2 py-0.5">
                Ready to Ship
              </span>
            )}
          </div>

          {/* Right: Product Actions */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#6D2638] font-medium mb-1">
                {product.designer}
              </p>
              <h3 className="font-serif-luxury text-2xl text-[#25231F] leading-tight mb-2">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-lg font-medium text-[#25231F]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#6C665F] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6C665F] leading-relaxed line-clamp-3 mb-4">
                {product.shortDescription}
              </p>

              {/* Color selector */}
              {product.availableColors.length > 0 && (
                <div className="mb-4">
                  <span className="block text-xs uppercase tracking-widest text-[#25231F] font-medium mb-1.5">
                    Color: {activeColor}
                  </span>
                  <div className="flex items-center gap-2">
                    {product.availableColors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all p-0.5 ${
                          activeColor === color.name ? 'border-[#6D2638] scale-110' : 'border-transparent hover:scale-105'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: color.hex }}
                        />
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
                  onSelectSize={(s) => {
                    setSelectedSize(s);
                    setSizeError('');
                  }}
                  variants={product.variants}
                  currentColor={activeColor}
                  errorMessage={sizeError}
                />
              )}
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2 pt-4 border-t border-[#E6E0D8]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-widest font-medium transition-colors rounded-[1px]"
                >
                  Add to Shopping Bag
                </button>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className={`w-11 h-11 border border-[#E6E0D8] rounded-[1px] flex items-center justify-center transition-colors ${
                    isSaved ? 'text-[#6D2638] bg-[#F5F1EB]' : 'text-[#25231F] hover:text-[#6D2638]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <Link
                to={`/products/${product.slug}`}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs uppercase tracking-widest text-[#6C665F] hover:text-[#25231F] transition-colors"
              >
                <span>View Full Product Details &amp; Fabric Notes</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
