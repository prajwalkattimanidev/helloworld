import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCommerce } from '../context/CommerceContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  priority = false,
}) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist, formatPrice } = useCommerce();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isSaved = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;

  const fallbackImage = "/images/product-crimson-saree.jpg";

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col h-full bg-[#FFFEFC]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Portrait Image Container (3:4 ratio) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F1EB] rounded-[1px]">
        {/* Primary Image */}
        <img
          src={imageError ? fallbackImage : product.images[0]}
          alt={`${product.name} by ${product.designer}`}
          loading={priority ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
          className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-[1.025] ${
            hasSecondaryImage && isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Secondary Image (Smooth crossfade on hover) */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate angle`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-out group-hover:scale-[1.025] ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isSale && (
            <span className="text-[10px] uppercase tracking-widest font-medium bg-[#6D2638] text-white px-2 py-0.5 rounded-[1px] shadow-xs">
              Sale
            </span>
          )}
          {product.isReadyToShip && !product.isSale && (
            <span className="text-[10px] uppercase tracking-wider font-normal bg-[#25231F]/90 text-white px-2 py-0.5 rounded-[1px]">
              Ready to Ship
            </span>
          )}
          {product.isNewArrival && !product.isSale && !product.isReadyToShip && (
            <span className="text-[10px] uppercase tracking-wider font-normal bg-white/95 text-[#25231F] border border-[#E6E0D8] px-2 py-0.5 rounded-[1px]">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button (Always accessible, visible on touchscreen and hover) */}
        <button
          id={`wishlist-toggle-${product.id}`}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className={`absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            isSaved
              ? 'bg-[#FFFEFC] text-[#6D2638] shadow-md'
              : 'bg-[#FFFEFC]/85 text-[#25231F] hover:text-[#6D2638] hover:bg-[#FFFEFC] shadow-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions Bar on Bottom of Image */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 z-10 flex gap-2 transition-all duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 bg-gradient-to-t from-[#25231F]/40 to-transparent">
          <button
            id={`quick-options-btn-${product.id}`}
            type="button"
            onClick={() => navigate(`/products/${product.slug}`)}
            className="flex-1 py-2.5 px-3 bg-[#FFFEFC] text-[#25231F] hover:bg-[#25231F] hover:text-[#FFFEFC] text-[11px] uppercase tracking-widest font-medium transition-colors text-center shadow-xs"
          >
            {product.availableSizes.length > 1 ? "Choose Options" : "View Piece"}
          </button>

          {onQuickView && (
            <button
              id={`quick-view-btn-${product.id}`}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label={`Quick view ${product.name}`}
              className="hidden sm:flex items-center justify-center w-9 h-9 bg-[#FFFEFC] text-[#25231F] hover:text-[#6D2638] transition-colors shadow-xs shrink-0"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-2 flex flex-col flex-1">
        {/* Designer Label */}
        <Link
          to={`/collections/all?designer=${encodeURIComponent(product.designer)}`}
          className="text-[11px] uppercase tracking-[0.16em] text-[#6C665F] hover:text-[#6D2638] transition-colors line-clamp-1 mb-1"
        >
          {product.designer}
        </Link>

        {/* Product Title */}
        <Link
          to={`/products/${product.slug}`}
          className="font-serif-luxury text-[17px] sm:text-lg text-[#25231F] hover:text-[#6D2638] transition-colors line-clamp-1 leading-snug"
          title={product.name}
        >
          {product.name}
        </Link>

        {/* Price Row */}
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-medium text-[#25231F]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#6C665F] line-through font-normal">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Subtle subcategory or fabric note */}
        <div className="mt-1 text-[11px] text-[#6C665F]/80 line-clamp-1">
          {product.isStitched ? "Stitched Ensemble" : "Unstitched Fabric"} • {product.subCategory}
        </div>
      </div>
    </div>
  );
};
