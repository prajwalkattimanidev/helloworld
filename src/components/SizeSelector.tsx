import React, { useState } from 'react';
import { Ruler, Check } from 'lucide-react';
import { ProductVariant } from '../types';
import { SizeGuideDialog } from './SizeGuideDialog';

interface SizeSelectorProps {
  availableSizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  variants: ProductVariant[];
  currentColor: string;
  errorMessage?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  availableSizes,
  selectedSize,
  onSelectSize,
  variants,
  currentColor,
  errorMessage,
}) => {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Check if a size is in stock for the currently selected color
  const checkStock = (size: string) => {
    const matchingVariant = variants.find(
      (v) => v.size === size && (v.color === currentColor || !currentColor)
    );
    if (!matchingVariant) return true; // fallback to available if not strictly constrained
    return matchingVariant.inStock;
  };

  return (
    <div id="product-size-selector" className="space-y-3">
      {/* Header with Size Guide trigger */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-[#25231F] font-medium">
            Select Size
          </span>
          {selectedSize && (
            <span className="text-xs text-[#6D2638] font-medium">
              : {selectedSize}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsGuideOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs text-[#6C665F] hover:text-[#6D2638] transition-colors border-b border-[#6C665F]/40 hover:border-[#6D2638] pb-0.5"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>Size Guide &amp; Fit</span>
        </button>
      </div>

      {/* Size Buttons Grid */}
      <div className="flex flex-wrap gap-2.5">
        {availableSizes.map((size) => {
          const inStock = checkStock(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              id={`size-btn-${size.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              disabled={!inStock}
              onClick={() => onSelectSize(size)}
              aria-label={`Size ${size}${inStock ? '' : ' - Sold Out'}`}
              className={`min-w-[44px] h-11 px-3.5 flex items-center justify-center text-xs tracking-wider font-medium border rounded-[1px] transition-all relative ${
                isSelected
                  ? 'border-[#6D2638] bg-[#6D2638] text-white shadow-xs'
                  : inStock
                  ? 'border-[#E6E0D8] bg-white text-[#25231F] hover:border-[#25231F]'
                  : 'border-[#E6E0D8] bg-[#F5F1EB]/50 text-[#6C665F]/50 cursor-not-allowed line-through'
              }`}
            >
              {size}
              {isSelected && (
                <Check className="w-3 h-3 ml-1 stroke-[3]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Validation error message */}
      {errorMessage && (
        <p className="text-xs text-[#6D2638] font-medium animate-in fade-in duration-200">
          {errorMessage}
        </p>
      )}

      {/* Size Guide Modal */}
      <SizeGuideDialog
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
};
