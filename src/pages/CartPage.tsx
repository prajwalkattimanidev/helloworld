import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, CheckCircle2, Lock } from 'lucide-react';
import { useCommerce } from '../context/CommerceContext';

export const CartPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isCheckoutRequested = searchParams.get('checkout') === 'true';

  const {
    cart,
    cartSubtotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
    freeShippingThreshold,
  } = useCommerce();

  // Checkout flow states
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmation'>(
    isCheckoutRequested && cart.length > 0 ? 'checkout' : 'cart'
  );

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Shipping form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    paymentMethod: 'upi',
    specialNotes: '',
  });

  const [orderId, setOrderId] = useState('');

  const shippingFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 450;
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TARANA10') {
      setDiscountPercent(10);
      setPromoMessage('Promo code TARANA10 applied (10% privilege discount).');
    } else {
      setPromoMessage('Invalid promo code. Try "TARANA10" for preview.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const simulatedOrderId = `TA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(simulatedOrderId);
    setStep('confirmation');
    clearCart();
  };

  if (step === 'confirmation') {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F5F1EB] text-[#6D2638] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-[0.2em] text-[#6D2638] font-medium block">
          Order Reserved (Demo Mode)
        </span>

        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F]">
          Thank You for Experiencing Tarana Atelier
        </h1>

        <p className="text-xs sm:text-sm text-[#6C665F] max-w-md mx-auto leading-relaxed font-light">
          Your order reference is <strong>{orderId}</strong>. In this preview demo, no real payment was processed and no charges were made.
        </p>

        <div className="p-6 bg-[#F5F1EB]/70 border border-[#E6E0D8] rounded-[2px] text-left text-xs space-y-3">
          <div className="flex justify-between pb-2 border-b border-[#E6E0D8]">
            <span className="text-[#6C665F]">Recipient</span>
            <span className="font-medium text-[#25231F]">{formData.firstName} {formData.lastName || 'Client'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[#E6E0D8]">
            <span className="text-[#6C665F]">Delivery To</span>
            <span className="font-medium text-[#25231F]">{formData.city || 'Mumbai'}, {formData.state} - {formData.pincode || '400001'}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-[#E6E0D8]">
            <span className="text-[#6C665F]">Payment Method</span>
            <span className="font-medium text-[#25231F] uppercase">{formData.paymentMethod} (Simulated)</span>
          </div>
          <div className="flex justify-between font-serif-luxury text-base text-[#25231F] pt-1">
            <span>Total Value</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link
            to="/collections/all"
            className="px-8 py-3.5 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-widest font-medium rounded-[1px] transition-colors"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 'confirmation') {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F5F1EB] text-[#6C665F] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F]">
          Your Shopping Bag Is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6C665F] max-w-md mx-auto font-light">
          Your curated cart currently holds no pieces. Explore our latest arrivals, handloom sarees, or ready-to-ship curations.
        </p>
        <div>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25231F] text-white text-xs uppercase tracking-widest font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors shadow-xs"
          >
            <span>Discover New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-checkout-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
      {/* Title */}
      <div className="pb-6 mb-8 border-b border-[#E6E0D8] flex items-baseline justify-between">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#25231F]">
          {step === 'checkout' ? 'Expedited Atelier Checkout' : 'Your Shopping Bag'}
        </h1>
        {step === 'checkout' && (
          <button
            onClick={() => setStep('cart')}
            className="text-xs text-[#6C665F] hover:text-[#25231F] underline underline-offset-2"
          >
            Return to Cart
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Items or Checkout Form */}
        <div className="lg:col-span-7">
          {step === 'cart' ? (
            <div className="space-y-6">
              {/* Free shipping banner */}
              <div className="p-4 bg-[#F5F1EB] border border-[#E6E0D8] rounded-[2px] flex items-center gap-3 text-xs text-[#25231F]">
                <Truck className="w-4 h-4 text-[#6D2638] shrink-0" />
                <span>
                  {cartSubtotal >= freeShippingThreshold
                    ? 'Your order qualifies for complimentary express air courier delivery.'
                    : `Add ${formatPrice(freeShippingThreshold - cartSubtotal)} more for complimentary domestic express shipping.`}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E6E0D8] border-y border-[#E6E0D8]">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex gap-5 sm:gap-6">
                    <Link
                      to={`/products/${item.product.slug}`}
                      className="w-24 sm:w-28 aspect-[3/4] bg-[#F5F1EB] shrink-0 rounded-[1px] overflow-hidden"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </Link>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#6D2638] font-medium">
                              {item.product.designer}
                            </span>
                            <Link
                              to={`/products/${item.product.slug}`}
                              className="font-serif-luxury text-lg sm:text-xl text-[#25231F] hover:text-[#6D2638] block"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#6C665F] hover:text-[#6D2638] p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-[#6C665F]">
                          <span className="bg-[#F5F1EB] px-2 py-0.5 rounded-[1px]">
                            Size: {item.selectedSize}
                          </span>
                          {item.selectedColor && (
                            <span className="bg-[#F5F1EB] px-2 py-0.5 rounded-[1px]">
                              Color: {item.selectedColor}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Unit Price */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-[#E6E0D8] rounded-[1px]">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#25231F] hover:bg-[#F5F1EB]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-base font-medium text-[#25231F]">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
              {/* 1. Contact Info */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-medium text-[#25231F] mb-4">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#6C665F] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#6C665F] mb-1">Phone (WhatsApp for updates) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-medium text-[#25231F] mb-4">
                  2. Shipping Address
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C665F] mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Aditi"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C665F] mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Sharma"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#6C665F] mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="Bungalow 4, Altamount Road"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#6C665F] mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Mumbai"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C665F] mb-1">State *</label>
                      <input
                        type="text"
                        required
                        placeholder="Maharashtra"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6C665F] mb-1">PIN Code *</label>
                      <input
                        type="text"
                        required
                        placeholder="400026"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6E0D8] text-xs text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div>
                <h3 className="text-xs uppercase tracking-widest font-medium text-[#25231F] mb-4">
                  3. Select Payment (Simulation)
                </h3>
                <div className="space-y-2.5">
                  {[
                    { id: 'upi', name: 'Instant UPI (Google Pay / PhonePe / Paytm)' },
                    { id: 'card', name: 'Credit or Debit Card (Visa / Mastercard / Amex)' },
                    { id: 'netbanking', name: 'NetBanking (HDFC, ICICI, Axis, SBI)' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-3.5 border rounded-[1px] cursor-pointer transition-colors ${
                        formData.paymentMethod === method.id
                          ? 'border-[#6D2638] bg-[#F5F1EB]'
                          : 'border-[#E6E0D8] bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                          className="accent-[#6D2638]"
                        />
                        <span className="text-xs font-medium text-[#25231F]">{method.name}</span>
                      </div>
                      <Lock className="w-3.5 h-3.5 text-[#6C665F]" />
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-[#6C665F] mt-2">
                  * Demo Store Notice: No actual payment will be debited. This confirms your order preview.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-[0.18em] font-medium rounded-[1px] transition-colors shadow-sm"
              >
                Confirm &amp; Place Order • {formatPrice(grandTotal)}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Order Summary & Pricing */}
        <div className="lg:col-span-5">
          <div className="bg-[#F5F1EB]/60 border border-[#E6E0D8] p-6 sm:p-8 rounded-[2px] space-y-6">
            <h3 className="font-serif-luxury text-2xl text-[#25231F]">
              Order Summary
            </h3>

            {/* Promo code box */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (e.g. TARANA10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-[#E6E0D8] text-xs uppercase text-[#25231F] rounded-[1px] focus:outline-none focus:border-[#25231F]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#25231F] text-white text-xs uppercase tracking-wider font-medium rounded-[1px] hover:bg-[#6D2638] transition-colors"
              >
                Apply
              </button>
            </form>

            {promoMessage && (
              <p className="text-xs text-[#6D2638] font-medium">
                {promoMessage}
              </p>
            )}

            {/* Line items summary */}
            <div className="space-y-3 pt-2 text-xs border-t border-[#E6E0D8] text-[#6C665F]">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} creations)</span>
                <span className="font-medium text-[#25231F]">{formatPrice(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#6D2638]">
                  <span>Privilege Discount ({discountPercent}%)</span>
                  <span>- {formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Domestic Express Air Courier</span>
                <span className="text-[#25231F]">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated GST / Luxury Cess</span>
                <span className="text-[#25231F]">Included in Price</span>
              </div>

              <div className="pt-3 border-t border-[#E6E0D8] flex justify-between items-baseline">
                <span className="font-serif-luxury text-xl text-[#25231F]">Grand Total</span>
                <span className="font-serif-luxury text-2xl font-medium text-[#25231F]">
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>

            {step === 'cart' && (
              <button
                id="cart-checkout-proceed-btn"
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-4 bg-[#25231F] text-[#FFFEFC] hover:bg-[#6D2638] text-xs uppercase tracking-[0.18em] font-medium rounded-[1px] transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {/* Trust Badges */}
            <div className="pt-4 border-t border-[#E6E0D8] space-y-2 text-[11px] text-[#6C665F]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#6D2638]" />
                <span>100% Genuine Certified Designer Couture &amp; Handlooms</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#6D2638]" />
                <span>256-bit Encrypted Checkout Security</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
