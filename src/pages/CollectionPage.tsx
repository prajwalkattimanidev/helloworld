import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, X, ArrowUpDown } from 'lucide-react';
import { PRODUCTS, DESIGNERS } from '../data/products';
import { Product, FilterState, SortOption } from '../types';
import { ProductGrid } from '../components/ProductGrid';
import { FilterDrawer } from '../components/FilterDrawer';
import { QuickViewDialog } from '../components/QuickViewDialog';

export const CollectionPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Read URL search params
  const searchQuery = searchParams.get('search') || '';
  const designerParam = searchParams.get('designer') || '';
  const sortParam = (searchParams.get('sort') as SortOption) || 'featured';

  // Filters state
  const [filters, setFilters] = useState<FilterState>({
    designers: designerParam ? [designerParam] : [],
    categories: [],
    priceRange: [0, 200000],
    sizes: [],
    colors: [],
    availabilityOnly: false,
    stitchedType: slug === 'ready-to-ship-stitched' ? 'stitched' : slug === 'ready-to-ship-unstitched' ? 'unstitched' : 'all',
  });

  const [sortBy, setSortBy] = useState<SortOption>(sortParam);

  // Sync designer from URL when it changes
  useEffect(() => {
    if (designerParam && !filters.designers.includes(designerParam)) {
      setFilters((prev) => ({ ...prev, designers: [designerParam] }));
    }
  }, [designerParam]);

  // Determine Collection Title, Description, and Base Products
  const collectionMeta = useMemo(() => {
    let title = "Complete Salon Collection";
    let description = "Explore our entire archive of handloom sarees, bespoke anarkalis, festive lehengas, and designer pret.";
    let baseProducts = [...PRODUCTS];

    if (searchQuery) {
      title = `Search Results: "${searchQuery}"`;
      description = `Displaying handcrafted designs matching your query.`;
      baseProducts = baseProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    } else if (slug === 'new-arrivals') {
      title = "The New Arrivals";
      description = "Freshly unboxed couture, festive kurtas, and artisanal handlooms for the current season.";
      baseProducts = baseProducts.filter((p) => p.isNewArrival);
    } else if (slug === 'ready-to-ship') {
      title = "Ready to Ship";
      description = "Pre-finished garments and pure fabrics ready for expedited dispatch within 24 to 48 hours.";
      baseProducts = baseProducts.filter((p) => p.isReadyToShip);
    } else if (slug === 'ready-to-ship-stitched') {
      title = "Ready-to-Ship Stitched";
      description = "Fully tailored, pre-stitched silhouettes ready to wear immediately for impending celebrations.";
      baseProducts = baseProducts.filter((p) => p.isReadyToShip && p.isStitched);
    } else if (slug === 'ready-to-ship-unstitched') {
      title = "Ready-to-Ship Unstitched";
      description = "Unstitched pure silk, organza, and Chanderi dress materials for your personalized tailoring.";
      baseProducts = baseProducts.filter((p) => p.isReadyToShip && !p.isStitched);
    } else if (slug === 'sale') {
      title = "Curated Archive Sale";
      description = "Privileged archival reductions on celebratory lehengas, silk sarees, and contemporary pret.";
      baseProducts = baseProducts.filter((p) => p.isSale);
    } else if (slug === 'sarees') {
      title = "Handcrafted Sarees & Drapes";
      description = "Varanasi tissue organzas, Kanchipuram mulberry silks, and pre-pleated concept drapes.";
      baseProducts = baseProducts.filter((p) => p.category === 'sarees');
    } else if (slug === 'lehengas') {
      title = "Bridal & Festive Lehengas";
      description = "Museum-grade zardozi velvet, handcrafted organza kalidars, and luminous celebratory silhouettes.";
      baseProducts = baseProducts.filter((p) => p.category === 'lehengas');
    } else if (slug === 'anarkalis' || slug === 'kurtas') {
      title = "Anarkalis & Kurta Sets";
      description = "Flowing silhouettes in pure Chanderi, raw silk, resham embroidery, and Gota Patti embellishments.";
      baseProducts = baseProducts.filter((p) => p.category === 'kurtas');
    } else if (slug === 'contemporary' || slug === 'clothing') {
      title = "Contemporary Pret & Co-ords";
      description = "Fusion silhouettes, cape sets, and modern interpretations of Indian craftsmanship.";
      baseProducts = baseProducts.filter((p) => p.category === 'contemporary' || p.category === 'kurtas');
    } else if (slug === 'accessories') {
      title = "Jewelry & Luxury Accessories";
      description = "Hand-embroidered zardozi potlis, authentic Ladakhi Pashmina cashmere, and uncut polki chokers.";
      baseProducts = baseProducts.filter((p) => p.category === 'accessories');
    }

    if (designerParam) {
      title = `${designerParam} at Tarana`;
      const designerObj = DESIGNERS.find((d) => d.name.toLowerCase() === designerParam.toLowerCase());
      if (designerObj) {
        description = designerObj.bio;
      }
    }

    return { title, description, baseProducts };
  }, [slug, searchQuery, designerParam]);

  // Apply User Refinements & Filters
  const filteredProducts = useMemo(() => {
    return collectionMeta.baseProducts.filter((product) => {
      // Designer filter
      if (filters.designers.length > 0 && !filters.designers.includes(product.designer)) {
        return false;
      }
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      // Stitched type filter
      if (filters.stitchedType === 'stitched' && !product.isStitched) {
        return false;
      }
      if (filters.stitchedType === 'unstitched' && product.isStitched) {
        return false;
      }
      // Size filter
      if (filters.sizes.length > 0) {
        const hasSize = product.availableSizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }
      // Color filter
      if (filters.colors.length > 0) {
        const hasColor = product.availableColors.some((c) => filters.colors.includes(c.name));
        if (!hasColor) return false;
      }
      // In stock only filter
      if (filters.availabilityOnly) {
        const anyInStock = product.variants.some((v) => v.inStock);
        if (!anyInStock) return false;
      }
      return true;
    });
  }, [collectionMeta.baseProducts, filters]);

  // Apply Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      case 'featured':
      default:
        return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, itemsToShow);
  const hasMore = itemsToShow < sortedProducts.length;

  const handleResetFilters = () => {
    setFilters({
      designers: [],
      categories: [],
      priceRange: [0, 200000],
      sizes: [],
      colors: [],
      availabilityOnly: false,
      stitchedType: 'all',
    });
    // Also clear designer from URL if present
    if (designerParam) {
      searchParams.delete('designer');
      setSearchParams(searchParams);
    }
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    searchParams.set('sort', newSort);
    setSearchParams(searchParams);
  };

  const activeFilterCount =
    filters.designers.length +
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.availabilityOnly ? 1 : 0) +
    (filters.stitchedType !== 'all' ? 1 : 0);

  return (
    <div id="collection-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumbs" className="text-xs text-[#6C665F] mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-[#25231F]">Home</Link>
        <span>/</span>
        <Link to="/collections/all" className="hover:text-[#25231F]">Collections</Link>
        <span>/</span>
        <span className="text-[#25231F] font-medium truncate">{collectionMeta.title}</span>
      </nav>

      {/* Collection Header Banner */}
      <div className="mb-10 sm:mb-14 pb-6 border-b border-[#E6E0D8]">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#25231F] font-normal tracking-tight mb-2">
          {collectionMeta.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#6C665F] font-light max-w-2xl leading-relaxed">
          {collectionMeta.description}
        </p>
      </div>

      {/* Filter and Sort Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E6E0D8]/60">
        {/* Left: Filter Drawer Trigger & Active count */}
        <div className="flex items-center gap-3">
          <button
            id="open-filter-drawer-btn"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E6E0D8] text-xs uppercase tracking-widest font-medium text-[#25231F] hover:border-[#25231F] rounded-[1px] transition-colors shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#6D2638]" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#6D2638] text-white text-[10px] flex items-center justify-center font-medium">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Product count display */}
          <span className="text-xs text-[#6C665F] font-light">
            Showing <strong>{sortedProducts.length}</strong> creations
          </span>
        </div>

        {/* Right: Sort dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="collection-sort-select" className="text-xs text-[#6C665F] uppercase tracking-wider font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort By:
          </label>
          <div className="relative">
            <select
              id="collection-sort-select"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[#E6E0D8] px-3 py-2 pr-8 text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Design Name: A–Z</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#6C665F] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs text-[#6C665F]">Active:</span>
          {filters.designers.map((d) => (
            <button
              key={d}
              onClick={() =>
                setFilters({
                  ...filters,
                  designers: filters.designers.filter((item) => item !== d),
                })
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F5F1EB] border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] hover:bg-[#E6E0D8]"
            >
              <span>{d}</span>
              <X className="w-3 h-3 text-[#6C665F]" />
            </button>
          ))}
          {filters.stitchedType !== 'all' && (
            <button
              onClick={() => setFilters({ ...filters, stitchedType: 'all' })}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F5F1EB] border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px]"
            >
              <span>{filters.stitchedType === 'stitched' ? 'Stitched' : 'Unstitched'}</span>
              <X className="w-3 h-3 text-[#6C665F]" />
            </button>
          )}
          {filters.sizes.map((s) => (
            <button
              key={s}
              onClick={() =>
                setFilters({
                  ...filters,
                  sizes: filters.sizes.filter((item) => item !== s),
                })
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F5F1EB] border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px]"
            >
              <span>Size: {s}</span>
              <X className="w-3 h-3 text-[#6C665F]" />
            </button>
          ))}
          <button
            onClick={handleResetFilters}
            className="text-xs text-[#6D2638] underline underline-offset-2 ml-2 hover:opacity-80"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Product Grid */}
      <ProductGrid
        products={displayedProducts}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Accessible "Load More" pagination */}
      {hasMore && (
        <div className="mt-14 text-center">
          <button
            id="collection-load-more-btn"
            type="button"
            onClick={() => setItemsToShow((prev) => prev + 8)}
            className="px-8 py-3.5 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-widest font-medium rounded-[1px] transition-colors shadow-xs"
          >
            Load More Pieces ({sortedProducts.length - itemsToShow} remaining)
          </button>
        </div>
      )}

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onReset={handleResetFilters}
        totalResultsCount={sortedProducts.length}
      />

      {/* Quick View Dialog */}
      <QuickViewDialog
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
