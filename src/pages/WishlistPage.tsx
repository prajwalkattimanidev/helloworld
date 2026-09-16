import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';
import { PRODUCTS } from '../data/products';
import { ProductGrid } from '../components/ProductGrid';
import { QuickViewDialog } from '../components/QuickViewDialog';
import { Product } from '../types';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useCommerce();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div id="wishlist-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="text-xs text-[#6C665F] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#25231F]">Home</Link>
        <span>/</span>
        <span className="text-[#25231F] font-medium">My Wishlist</span>
      </nav>

      <div className="pb-6 mb-8 border-b border-[#E6E0D8] flex items-baseline justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6D2638] font-medium">
            Personal Saved Edits
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F] mt-1">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="text-xs text-[#6C665F] hover:text-[#6D2638] underline underline-offset-2"
          >
            Clear Wishlist
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#E6E0D8] rounded-[2px] p-8 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#F5F1EB] text-[#6D2638] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <h2 className="font-serif-luxury text-2xl text-[#25231F] mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-xs text-[#6C665F] mb-6 leading-relaxed">
            Click the heart icon on any design while exploring to curate your personal salon favorites for upcoming celebrations.
          </p>
          <Link
            to="/collections/all"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25231F] text-white text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
          >
            <span>Explore Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <ProductGrid
          products={wishlistProducts}
          onQuickView={(p) => setQuickViewProduct(p)}
        />
      )}

      {/* Quick View */}
      <QuickViewDialog
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
