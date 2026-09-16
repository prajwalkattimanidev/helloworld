import React, { useEffect } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { FilterState } from '../types';
import { DESIGNERS } from '../data/products';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalResultsCount: number;
}

const CATEGORY_OPTIONS = [
  { label: "Anarkalis & Kurtas", value: "kurtas" },
  { label: "Handcrafted Sarees", value: "sarees" },
  { label: "Bridal & Festive Lehengas", value: "lehengas" },
  { label: "Contemporary Pret", value: "contemporary" },
  { label: "Unstitched Suit Fabrics", value: "unstitched" },
  { label: "Jewelry & Accessories", value: "accessories" },
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "Custom Stitched", "Unstitched Fabric"];

const COLOR_OPTIONS = [
  { name: "Crimson Rose", hex: "#6D2638" },
  { name: "Antique Ivory", hex: "#F5F1EB" },
  { name: "Champagne Gold", hex: "#D4AF37" },
  { name: "Pistachio Sage", hex: "#9CAF88" },
  { name: "Emerald Forest", hex: "#1C3F34" },
  { name: "Onyx Black", hex: "#222222" },
  { name: "Mustard Saffron", hex: "#D49B28" },
  { name: "Natural Ecru", hex: "#E7E2D6" },
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResultsCount,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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

  const toggleDesigner = (designerName: string) => {
    const current = filters.designers;
    const next = current.includes(designerName)
      ? current.filter((d) => d !== designerName)
      : [...current, designerName];
    onFilterChange({ ...filters, designers: next });
  };

  const toggleCategory = (cat: string) => {
    const current = filters.categories;
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onFilterChange({ ...filters, categories: next });
  };

  const toggleSize = (size: string) => {
    const current = filters.sizes;
    const next = current.includes(size)
      ? current.filter((s) => s !== size)
      : [...current, size];
    onFilterChange({ ...filters, sizes: next });
  };

  const toggleColor = (colorName: string) => {
    const current = filters.colors;
    const next = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName];
    onFilterChange({ ...filters, colors: next });
  };

  const activeFilterCount =
    filters.designers.length +
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.availabilityOnly ? 1 : 0) +
    (filters.stitchedType !== 'all' ? 1 : 0);

  return (
    <div
      id="filter-drawer-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Filter products"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25231F]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FFFEFC] h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif-luxury text-2xl text-[#25231F]">
              Refine Pieces
            </h3>
            {activeFilterCount > 0 && (
              <span className="text-xs bg-[#6D2638] text-white px-2 py-0.5 rounded-full font-medium">
                {activeFilterCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-[#25231F] hover:text-[#6D2638] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filter Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6 divide-y divide-[#E6E0D8]/70">
          {/* Construction Type (Stitched / Unstitched) */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#25231F] font-medium mb-3">
              Construction &amp; Finish
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Silhouettes' },
                { id: 'stitched', label: 'Stitched Ensemble' },
                { id: 'unstitched', label: 'Unstitched Fabric' },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      ...filters,
                      stitchedType: type.id as FilterState['stitchedType'],
                    })
                  }
                  className={`text-xs px-3 py-1.5 rounded-[1px] border transition-colors ${
                    filters.stitchedType === type.id
                      ? 'bg-[#25231F] text-[#FFFEFC] border-[#25231F]'
                      : 'bg-white text-[#25231F] border-[#E6E0D8] hover:border-[#25231F]'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Designers */}
          <div className="pt-5">
            <h4 className="text-xs uppercase tracking-widest text-[#25231F] font-medium mb-3">
              Designers ({DESIGNERS.length})
            </h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {DESIGNERS.map((designer) => {
                const isSelected = filters.designers.includes(designer.name);
                return (
                  <label
                    key={designer.id}
                    className="flex items-center justify-between text-xs text-[#25231F] cursor-pointer hover:text-[#6D2638] select-none py-0.5"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 border flex items-center justify-center rounded-[1px] transition-colors ${
                          isSelected
                            ? 'bg-[#6D2638] border-[#6D2638] text-white'
                            : 'border-[#E6E0D8] bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{designer.name}</span>
                    </div>
                    <span className="text-[#6C665F]/70 text-[11px]">
                      {designer.productCount}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Categories */}
          <div className="pt-5">
            <h4 className="text-xs uppercase tracking-widest text-[#25231F] font-medium mb-3">
              Categories
            </h4>
            <div className="space-y-2">
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = filters.categories.includes(cat.value);
                return (
                  <label
                    key={cat.value}
                    className="flex items-center gap-2.5 text-xs text-[#25231F] cursor-pointer hover:text-[#6D2638] select-none py-0.5"
                  >
                    <div
                      className={`w-4 h-4 border flex items-center justify-center rounded-[1px] transition-colors ${
                        isSelected
                          ? 'bg-[#6D2638] border-[#6D2638] text-white'
                          : 'border-[#E6E0D8] bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{cat.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Sizes */}
          <div className="pt-5">
            <h4 className="text-xs uppercase tracking-widest text-[#25231F] font-medium mb-3">
              Size
            </h4>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((size) => {
                const isSelected = filters.sizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`text-xs px-3 py-1.5 rounded-[1px] border transition-colors ${
                      isSelected
                        ? 'bg-[#6D2638] text-[#FFFEFC] border-[#6D2638]'
                        : 'bg-white text-[#25231F] border-[#E6E0D8] hover:border-[#25231F]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Colors */}
          <div className="pt-5">
            <h4 className="text-xs uppercase tracking-widest text-[#25231F] font-medium mb-3">
              Color Palette
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {COLOR_OPTIONS.map((color) => {
                const isSelected = filters.colors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => toggleColor(color.name)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-[1px] border text-left text-xs transition-colors ${
                      isSelected
                        ? 'border-[#6D2638] bg-[#F5F1EB]'
                        : 'border-[#E6E0D8] bg-white hover:border-[#25231F]'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-5">
            <label className="flex items-center gap-2.5 text-xs text-[#25231F] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filters.availabilityOnly}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    availabilityOnly: e.target.checked,
                  })
                }
                className="w-4 h-4 rounded-[1px] accent-[#6D2638]"
              />
              <span className="font-medium">In Stock / Ready to Dispatch only</span>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#E6E0D8] bg-[#F5F1EB]/50 flex items-center gap-3">
          <button
            type="button"
            onClick={onReset}
            disabled={activeFilterCount === 0}
            className="flex items-center justify-center gap-1.5 py-3 px-4 border border-[#E6E0D8] text-xs uppercase tracking-widest font-medium text-[#25231F] hover:bg-white disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#25231F] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium hover:bg-[#6D2638] transition-colors rounded-[1px]"
          >
            Apply ({totalResultsCount} Pieces)
          </button>
        </div>
      </div>
    </div>
  );
};
