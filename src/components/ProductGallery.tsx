import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentImage = images[activeIndex] || images[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <div id="product-detail-gallery" className="w-full flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnail rail (Desktop on left, Mobile underneath) */}
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto no-scrollbar max-h-[640px] shrink-0 py-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1} of ${images.length}`}
              className={`relative aspect-[3/4] w-16 sm:w-20 lg:w-20 shrink-0 overflow-hidden rounded-[1px] border transition-all ${
                activeIndex === idx
                  ? 'border-[#6D2638] ring-1 ring-[#6D2638]'
                  : 'border-[#E6E0D8] opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Showcase Image */}
      <div 
        className="relative flex-1 aspect-[3/4] max-h-[760px] bg-[#F5F1EB] rounded-[1px] overflow-hidden group select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={currentImage}
          alt={`${productName} view ${activeIndex + 1}`}
          className="w-full h-full object-cover object-top transition-all duration-300"
        />

        {/* Zoom trigger button */}
        <button
          type="button"
          onClick={() => setIsZoomModalOpen(true)}
          aria-label="Enlarge image"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur-xs text-[#25231F] hover:text-[#6D2638] flex items-center justify-center shadow-xs transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Left / Right arrows for multi-image navigation */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#25231F] flex items-center justify-center shadow-xs transition-opacity opacity-80 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#25231F] flex items-center justify-center shadow-xs transition-opacity opacity-80 sm:opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Mobile Pagination indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx ? 'w-5 bg-[#25231F]' : 'w-1.5 bg-[#25231F]/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen High-Resolution Zoom Modal */}
      {isZoomModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution product preview"
          className="fixed inset-0 z-50 bg-[#25231F]/95 flex items-center justify-center p-4"
        >
          <button
            onClick={() => setIsZoomModalOpen(false)}
            aria-label="Close zoomed view"
            className="absolute top-6 right-6 text-white p-2 hover:text-[#E6E0D8] z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[90vh] overflow-auto flex items-center justify-center">
            <img
              src={currentImage}
              alt={`${productName} high resolution zoom`}
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
