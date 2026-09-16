import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCommerce } from '../context/CommerceContext';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { formatPrice } = useCommerce();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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

  const cleanQuery = query.trim().toLowerCase();

  const filteredProducts = cleanQuery.length > 1
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(cleanQuery) ||
          p.designer.toLowerCase().includes(cleanQuery) ||
          p.category.toLowerCase().includes(cleanQuery) ||
          p.subCategory.toLowerCase().includes(cleanQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(cleanQuery))
        );
      }).slice(0, 8)
    : [];

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanQuery) {
      onClose();
      navigate(`/collections/all?search=${encodeURIComponent(cleanQuery)}`);
    }
  };

  const quickSearches = [
    "Anarkali",
    "Sarees",
    "Torani",
    "Anita Dongre",
    "Lehenga",
    "Ready to Ship",
    "Pashmina",
    "Unstitched"
  ];

  return (
    <div
      id="search-dialog-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Search Collection"
      className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25231F]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog box */}
      <div className="relative w-full max-w-2xl bg-[#FFFEFC] shadow-2xl rounded-[2px] border border-[#E6E0D8] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative border-b border-[#E6E0D8] p-4 sm:p-5 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6C665F]" />
          <input
            ref={inputRef}
            id="search-input-field"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by attire, designer, fabric, or occasion..."
            className="w-full bg-transparent text-[#25231F] text-base placeholder-[#6C665F]/70 focus:outline-none font-light tracking-wide"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#6C665F] hover:text-[#25231F] p-1"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 text-[#6C665F] hover:text-[#6D2638] rounded-full hover:bg-[#F5F1EB] transition-colors"
          >
            <span className="text-xs uppercase tracking-wider font-medium">ESC</span>
          </button>
        </form>

        {/* Quick Search Chips */}
        <div className="px-5 py-3 bg-[#F5F1EB]/50 border-b border-[#E6E0D8]/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] uppercase tracking-widest text-[#6C665F] shrink-0 flex items-center gap-1">
            <Tag className="w-3 h-3" /> Popular:
          </span>
          {quickSearches.map((term) => (
            <button
              key={term}
              id={`quick-search-${term.toLowerCase().replace(/\s+/g, '-')}`}
              type="button"
              onClick={() => setQuery(term)}
              className="text-xs bg-white text-[#25231F] border border-[#E6E0D8] px-2.5 py-1 rounded-[2px] hover:border-[#6D2638] hover:text-[#6D2638] transition-colors whitespace-nowrap"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {cleanQuery.length > 1 ? (
            filteredProducts.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6C665F] uppercase tracking-wider mb-2">
                  <span>Matching Pieces ({filteredProducts.length})</span>
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[#6D2638] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    View all results <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <button
                      key={product.id}
                      id={`search-result-${product.id}`}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex items-center gap-3 p-2.5 rounded-[2px] border border-transparent hover:border-[#E6E0D8] hover:bg-[#F5F1EB]/60 text-left transition-colors w-full group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-18 object-cover rounded-[1px] shrink-0 bg-[#F5F1EB]"
                      />
                      <div className="overflow-hidden flex-1">
                        <div className="text-[11px] uppercase tracking-widest text-[#6D2638] font-medium truncate">
                          {product.designer}
                        </div>
                        <div className="text-sm font-serif-luxury text-[#25231F] group-hover:text-[#6D2638] transition-colors line-clamp-1">
                          {product.name}
                        </div>
                        <div className="text-xs text-[#25231F] font-medium mt-1">
                          {formatPrice(product.price)}
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#6C665F] line-through ml-2 font-normal">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="font-serif-luxury text-xl text-[#25231F] mb-1">
                  No creations matched "{query}"
                </p>
                <p className="text-xs text-[#6C665F] max-w-sm mx-auto">
                  Try searching with broader terms such as "Saree", "Anarkali", "Chanderi", or a designer name.
                </p>
              </div>
            )
          ) : (
            <div className="py-6 text-center text-xs text-[#6C665F]">
              Begin typing to search our handcrafted couture, ready-to-ship collections, and designers.
            </div>
          )}
        </div>

        {/* Footer info in dialog */}
        <div className="px-5 py-3 bg-[#F5F1EB]/70 border-t border-[#E6E0D8] flex items-center justify-between text-[11px] text-[#6C665F]">
          <span>Press Enter to view all results</span>
          <span>Currency: INR (₹)</span>
        </div>
      </div>
    </div>
  );
};
