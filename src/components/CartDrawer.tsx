import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    formatPrice,
    freeShippingThreshold,
  } = useCommerce();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingLeft = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/cart?checkout=true');
  };

  return (
    <div
      id="cart-drawer-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#25231F]/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Box */}
      <div className="relative w-full max-w-md bg-[#FFFEFC] h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E6E0D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#25231F]" />
            <h3 className="font-serif-luxury text-2xl text-[#25231F]">
              Your Shopping Bag
            </h3>
            <span className="text-xs bg-[#F5F1EB] px-2 py-0.5 rounded-full font-medium text-[#25231F]">
              {cartCount}
            </span>
          </div>

          <button
            id="close-cart-drawer-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#25231F] hover:text-[#6D2638] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F5F1EB]/80 px-6 py-3 border-b border-[#E6E0D8] text-xs">
          <div className="flex items-center gap-2 mb-1.5">
            <Truck className="w-3.5 h-3.5 text-[#6D2638]" />
            {freeShippingLeft === 0 ? (
              <span className="font-medium text-[#6D2638]">
                Congratulations! You qualify for complimentary express shipping.
              </span>
            ) : (
              <span className="text-[#25231F]">
                Add <strong className="text-[#6D2638]">{formatPrice(freeShippingLeft)}</strong> more for free express shipping across India.
              </span>
            )}
          </div>
          <div className="w-full bg-[#E6E0D8] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#6D2638] h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E6E0D8]">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F1EB] flex items-center justify-center text-[#6C665F]">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <div>
                <p className="font-serif-luxury text-2xl text-[#25231F] mb-1">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#6C665F] max-w-xs mx-auto">
                  Explore our curated seasonal edits, handloom sarees, and festive designer creations.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/collections/new-arrivals');
                }}
                className="px-6 py-3 bg-[#25231F] text-[#FFFEFC] text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
              >
                Discover New Arrivals
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  className="pt-4 first:pt-0 flex gap-4 group"
                >
                  {/* Thumbnail */}
                  <Link
                    to={`/products/${item.product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 aspect-[3/4] bg-[#F5F1EB] shrink-0 rounded-[1px] overflow-hidden"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-[#6D2638] font-medium">
                            {item.product.designer}
                          </p>
                          <Link
                            to={`/products/${item.product.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="font-serif-luxury text-base text-[#25231F] hover:text-[#6D2638] line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          className="text-[#6C665F] hover:text-[#6D2638] p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#6C665F]">
                        <span className="bg-[#F5F1EB] px-2 py-0.5 rounded-[1px]">
                          Size: {item.selectedSize}
                        </span>
                        {item.selectedColor && (
                          <span className="bg-[#F5F1EB] px-2 py-0.5 rounded-[1px]">
                            {item.selectedColor}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-2">
                      <div className="flex items-center border border-[#E6E0D8] rounded-[1px]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-medium text-[#25231F]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-[#6C665F]">
                            {formatPrice(item.unitPrice)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#E6E0D8] bg-[#F5F1EB]/40 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6C665F]">Estimated Subtotal</span>
              <span className="font-serif-luxury text-xl font-medium text-[#25231F]">
                {formatPrice(cartSubtotal)}
              </span>
            </div>

            <p className="text-[11px] text-[#6C665F] leading-tight">
              Taxes included. Domestic shipping calculated at checkout.
            </p>

            <div className="pt-2 space-y-2">
              <button
                id="cart-drawer-checkout-btn"
                type="button"
                onClick={handleCheckoutClick}
                className="w-full py-3.5 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-[0.16em] font-medium transition-colors flex items-center justify-center gap-2 rounded-[1px] shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                id="cart-drawer-view-bag-link"
                to="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full block text-center py-2.5 text-xs uppercase tracking-widest text-[#25231F] hover:text-[#6D2638] border border-[#E6E0D8] bg-white rounded-[1px] transition-colors font-medium"
              >
                View Full Shopping Bag
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
