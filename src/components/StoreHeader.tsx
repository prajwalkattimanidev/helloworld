import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useCommerce } from '../context/CommerceContext';
import { BrandMegaMenu } from './BrandMegaMenu';

export const StoreHeader: React.FC = () => {
  const location = useLocation();
  const { 
    cartCount, 
    wishlistCount, 
    setIsCartOpen, 
    openSearch, 
    setIsMobileNavOpen 
  } = useCommerce();

  const [isDesignersMenuOpen, setIsDesignersMenuOpen] = useState(false);
  const [isClothingMenuOpen, setIsClothingMenuOpen] = useState(false);
  const [isReadyToShipMenuOpen, setIsReadyToShipMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsDesignersMenuOpen(false);
    setIsClothingMenuOpen(false);
    setIsReadyToShipMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      id="main-store-header"
      className={`sticky top-0 z-40 bg-[#FFFEFC]/95 backdrop-blur-md transition-all duration-300 border-b border-[#E6E0D8] ${
        isScrolled ? 'shadow-xs' : ''
      }`}
    >
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left Controls (Desktop Search / Mobile Hamburger + Search) */}
          <div className="flex items-center gap-1 sm:gap-4 w-1/4">
            {/* Mobile Hamburger */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden p-2 text-[#25231F] hover:text-[#6D2638] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6D2638]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Trigger Button */}
            <button
              id="header-search-trigger"
              onClick={openSearch}
              aria-label="Search catalog"
              className="p-2 text-[#25231F] hover:text-[#6D2638] transition-colors inline-flex items-center gap-2 group text-xs uppercase tracking-widest font-normal"
            >
              <Search className="w-4 h-4 text-[#25231F] group-hover:text-[#6D2638] transition-colors" />
              <span className="hidden sm:inline text-xs text-[#6C665F] group-hover:text-[#25231F]">
                Search
              </span>
            </button>
          </div>

          {/* Centered Brand Logo */}
          <div className="flex-1 text-center">
            <Link
              id="brand-home-logo-link"
              to="/"
              className="inline-block text-center group py-1"
            >
              <div className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl tracking-[0.18em] text-[#25231F] uppercase font-light">
                {BRAND_CONFIG.name}
              </div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#6C665F] -mt-0.5 sm:-mt-1 group-hover:text-[#6D2638] transition-colors">
                {BRAND_CONFIG.tagline}
              </div>
            </Link>
          </div>

          {/* Right Controls: Wishlist & Bag */}
          <div className="flex items-center justify-end gap-1 sm:gap-3 w-1/4">
            {/* Wishlist Link */}
            <Link
              id="header-wishlist-link"
              to="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} saved items`}
              className="relative p-2 text-[#25231F] hover:text-[#6D2638] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span
                  id="header-wishlist-count-badge"
                  className="absolute top-1 right-1 bg-[#6D2638] text-[#FFFEFC] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in"
                >
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              id="header-cart-drawer-trigger"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2 text-[#25231F] hover:text-[#6D2638] transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="header-cart-count-badge"
                  className="bg-[#25231F] text-[#FFFEFC] text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
              <span className="hidden md:inline text-xs uppercase tracking-widest text-[#25231F] font-normal ml-0.5">
                Bag
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Row (Sub-header) */}
      <nav
        id="desktop-primary-navigation"
        aria-label="Main Navigation"
        className="hidden lg:block border-t border-[#E6E0D8]/70"
      >
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-center space-x-8 text-[13px] tracking-[0.12em] uppercase font-normal text-[#25231F]">
            {/* Home */}
            <li>
              <Link
                id="nav-link-home"
                to="/"
                className={`block py-3.5 hover:text-[#6D2638] transition-colors relative ${
                  isActive('/') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                Home
                {isActive('/') && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6D2638]" />
                )}
              </Link>
            </li>

            {/* New Arrivals */}
            <li>
              <Link
                id="nav-link-new-arrivals"
                to="/collections/new-arrivals"
                className={`block py-3.5 hover:text-[#6D2638] transition-colors relative ${
                  isActive('/collections/new-arrivals') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                New Arrivals
                {isActive('/collections/new-arrivals') && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6D2638]" />
                )}
              </Link>
            </li>

            {/* Designers (Mega Menu trigger) */}
            <li
              className="relative"
              onMouseEnter={() => setIsDesignersMenuOpen(true)}
            >
              <button
                id="nav-link-designers"
                onClick={() => setIsDesignersMenuOpen(!isDesignersMenuOpen)}
                aria-expanded={isDesignersMenuOpen}
                className={`flex items-center gap-1 py-3.5 hover:text-[#6D2638] transition-colors cursor-pointer ${
                  isActive('/designers') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                <span>Designers</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDesignersMenuOpen ? 'rotate-180 text-[#6D2638]' : ''}`} />
              </button>
            </li>

            {/* Clothing Dropdown */}
            <li 
              className="relative group"
              onMouseEnter={() => setIsClothingMenuOpen(true)}
              onMouseLeave={() => setIsClothingMenuOpen(false)}
            >
              <Link
                id="nav-link-clothing"
                to="/collections/clothing"
                className={`flex items-center gap-1 py-3.5 hover:text-[#6D2638] transition-colors ${
                  isActive('/collections/clothing') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                <span>Clothing</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </Link>

              {isClothingMenuOpen && (
                <div 
                  id="clothing-submenu-dropdown"
                  className="absolute top-full left-0 w-56 bg-[#FFFEFC] border border-[#E6E0D8] shadow-md py-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <Link
                    to="/collections/anarkalis"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Anarkalis &amp; Suit Sets
                  </Link>
                  <Link
                    to="/collections/sarees"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Handcrafted Sarees
                  </Link>
                  <Link
                    to="/collections/lehengas"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Festive &amp; Bridal Lehengas
                  </Link>
                  <Link
                    to="/collections/kurtas"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Kurtas &amp; Shararas
                  </Link>
                  <Link
                    to="/collections/contemporary"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Contemporary Pret &amp; Co-ords
                  </Link>
                </div>
              )}
            </li>

            {/* Ready to Ship Dropdown */}
            <li
              className="relative group"
              onMouseEnter={() => setIsReadyToShipMenuOpen(true)}
              onMouseLeave={() => setIsReadyToShipMenuOpen(false)}
            >
              <Link
                id="nav-link-ready-to-ship"
                to="/collections/ready-to-ship"
                className={`flex items-center gap-1 py-3.5 hover:text-[#6D2638] transition-colors ${
                  isActive('/collections/ready-to-ship') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                <span>Ready to Ship</span>
                <span className="text-[9px] uppercase tracking-wider font-sans bg-[#F5F1EB] text-[#6D2638] px-1 py-0.5 border border-[#6D2638]/20">
                  Fast
                </span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
              </Link>

              {isReadyToShipMenuOpen && (
                <div 
                  id="ready-to-ship-submenu-dropdown"
                  className="absolute top-full left-0 w-64 bg-[#FFFEFC] border border-[#E6E0D8] shadow-md py-3 z-30 animate-in fade-in slide-in-from-top-1 duration-150"
                >
                  <Link
                    to="/collections/ready-to-ship-stitched"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Ready-to-Ship Stitched (24h Dispatch)
                  </Link>
                  <Link
                    to="/collections/ready-to-ship-unstitched"
                    className="block px-4 py-2 text-xs hover:bg-[#F5F1EB] hover:text-[#6D2638] transition-colors"
                  >
                    Ready-to-Ship Unstitched Fabrics
                  </Link>
                </div>
              )}
            </li>

            {/* Accessories */}
            <li>
              <Link
                id="nav-link-accessories"
                to="/collections/accessories"
                className={`block py-3.5 hover:text-[#6D2638] transition-colors relative ${
                  isActive('/collections/accessories') ? 'text-[#6D2638] font-medium' : ''
                }`}
              >
                Accessories
                {isActive('/collections/accessories') && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#6D2638]" />
                )}
              </Link>
            </li>

            {/* Sale */}
            <li>
              <Link
                id="nav-link-sale"
                to="/collections/sale"
                className={`block py-3.5 text-[#6D2638] hover:opacity-80 transition-opacity font-medium relative ${
                  isActive('/collections/sale') ? 'underline underline-offset-4' : ''
                }`}
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Mega Menu Overlay */}
        <BrandMegaMenu
          isOpen={isDesignersMenuOpen}
          onClose={() => setIsDesignersMenuOpen(false)}
        />
      </nav>
    </header>
  );
};
