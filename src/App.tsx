import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CommerceProvider } from './context/CommerceContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { StoreHeader } from './components/StoreHeader';
import { StoreFooter } from './components/StoreFooter';
import { SearchDialog } from './components/SearchDialog';
import { MobileNavigation } from './components/MobileNavigation';
import { CartDrawer } from './components/CartDrawer';
import { ToastNotification } from './components/ToastNotification';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTop } from './components/BackToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { DesignersPage } from './pages/DesignersPage';
import { WishlistPage } from './pages/WishlistPage';
import { InfoPage } from './pages/InfoPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CommerceProvider>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FFFEFC] text-[#25231F] font-sans antialiased selection:bg-[#6D2638]/15 selection:text-[#6D2638]">
          {/* Top Promotional Announcement Bar */}
          <AnnouncementBar />

          {/* Sticky Store Header with Navigation & Mega Menu */}
          <StoreHeader />

          {/* Main Content Area */}
          <main className="flex-1 w-full flex flex-col">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/collections" element={<CollectionPage />} />
              <Route path="/collections/:slug" element={<CollectionPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/designers" element={<DesignersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/info/:topic" element={<InfoPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Storefront Footer */}
          <StoreFooter />

          {/* Global Accessible Overlays */}
          <SearchDialog />
          <MobileNavigation />
          <CartDrawer />
          <ToastNotification />
          <ScrollProgressBar />
          <BackToTop />
        </div>
      </CommerceProvider>
    </BrowserRouter>
  );
}
