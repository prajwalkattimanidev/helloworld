import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  emptyMessage?: string;
  columns?: 'standard' | 'dense';
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  emptyMessage = "No handcrafted pieces match your current selection.",
  columns = 'standard',
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (products.length === 0) {
    return (
      <div className="py-16 text-center border border-dashed border-[#E6E0D8] rounded-[2px] p-8">
        <p className="font-serif-luxury text-2xl text-[#25231F] mb-2">
          {emptyMessage}
        </p>
        <p className="text-xs text-[#6C665F] max-w-md mx-auto">
          Please adjust your active filters or explore our complete couture collections.
        </p>
      </div>
    );
  }

  const gridColsClass = columns === 'dense'
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div
      id="storefront-product-grid"
      className={`grid ${gridColsClass} gap-x-4 sm:gap-x-6 gap-y-8 sm:gap-y-10`}
    >
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{
            duration: 0.55,
            delay: shouldReduceMotion ? 0 : Math.min((index % 4) * 0.08, 0.3),
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <ProductCard
            product={product}
            onQuickView={onQuickView}
            priority={index < 4}
          />
        </motion.div>
      ))}
    </div>
  );
};
