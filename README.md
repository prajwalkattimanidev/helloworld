# Tarana Atelier — Couture & Considered Prêt

An editorial luxury South Asian e-commerce web storefront built with React 19, TypeScript, Vite, Tailwind CSS, and Motion. Designed with meticulous craft, high-contrast typography, and fluid scroll interactions for couture, festive wear, and ready-to-ship handloom textiles.

---

## ✨ Features

- **Editorial Hero Campaign**: Responsive showcase with uncropped 2:3 archival photography, split-screen desktop layout, ambient backdrop lighting, and multi-look slide navigation.
- **Self-Contained Local Assets**: All curated high-resolution campaign photography and product imagery are stored locally under `public/images/` — zero external image CDN dependencies.
- **Curated Catalog & Faceted Search**:
  - Filter by Category (Sarees, Lehengas, Kurtas, Accessories), Price, Color, and Designer.
  - Quick-switch tabs for *Festive 2026*, *Occasionwear*, and *Everyday Luxury*.
  - Sort by Featured, New Arrivals, Price (Low to High / High to Low).
- **Designer Directory & Discovery**: Dedicated atelier profiles for renowned couturiers (Torani, Raw Mango, Sabyasachi, Anita Dongre, Tarun Tahiliani, etc.) with bio, heritage notes, and catalog counts.
- **Ready-to-Ship Edit**: Clear distinction between pre-finished ready-to-ship garments (dispatched within 24–48h) and bespoke made-to-order couture.
- **Interactive Shopping Bag & Drawer**: Slide-over cart drawer with quantity adjustments, free shipping progress tracker (qualifying orders over ₹15,000), promo code discount engine (`FESTIVE10`), and simulated checkout modal.
- **Bespoke WhatsApp Concierge**: Instant WhatsApp consultation links for styling appointments, bespoke bridal sizing, and customer assistance.
- **Fluid Scroll Animations**: Accessible viewport triggers, staggered product cards, top progress bar, and floating back-to-top controls with reduced-motion support.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **bun** / **yarn**

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/tarana-atelier.git
cd tarana-atelier

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm run preview
```

---

## 📦 Pushing to your GitHub Repository

To push this codebase into your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all code and images
git add .

# 3. Create an initial commit
git commit -m "feat: initial release of Tarana Atelier luxury fashion storefront"

# 4. Rename current branch to main
git branch -M main

# 5. Link your GitHub remote repository
# (Create a new repository on https://github.com/new first, then copy its URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# 6. Push code and assets to GitHub
git push -u origin main
```

---

## 📁 Project Structure

```
├── public/
│   └── images/                # Local high-res product & campaign image assets (3.9 MB)
│       ├── hero-festive-saree.jpg
│       ├── hero-bridal-couture.jpg
│       ├── hero-luxury-pret.jpg
│       ├── product-chanderi-suit.jpg
│       ├── product-bridal-lehenga.jpg
│       └── ...
├── src/
│   ├── components/            # Modular UI components (Navigation, Hero, Grids, Drawers)
│   ├── config/
│   │   └── brand.ts           # Centralized brand editorial configuration & INR currency helpers
│   ├── context/
│   │   ├── CartContext.tsx    # Shopping bag state with localStorage persistence
│   │   └── WishlistContext.tsx# Saved styles & wishlist state
│   ├── data/
│   │   └── products.ts        # 16 handcrafted products, 9 designers, and style journals
│   ├── pages/                 # Full-page routes (Home, Collection, Product Detail, Designers)
│   ├── types.ts               # Strict TypeScript models & interfaces
│   ├── App.tsx                # Client-side router configuration & root shell
│   └── main.tsx               # Application entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🎨 Design System & Typography

- **Headings**: Cormorant Garamond / Classical High-Contrast Serif
- **Body & Captions**: Plus Jakarta Sans / Neutral Grotesk
- **Palette**:
  - Pomegranate Velvet: `#6D2638`
  - Antique Gold: `#D4AF37`
  - Warm Off-White: `#FFFEFC`
  - Studio Crimson: `#4A0812`
  - Charcoal Ink: `#25231F`
