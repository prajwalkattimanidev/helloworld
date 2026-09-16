/**
 * Central Brand Configuration
 * Configure client identity, contact details, currency, navigation, and banners here.
 */

export const BRAND_CONFIG = {
  name: "TARANA ATELIER",
  shortName: "TARANA",
  tagline: "Couture & Considered Pret",
  subTitle: "Fine Indian Handlooms & Designer Ensembles",
  
  market: "India",
  currency: {
    code: "INR",
    symbol: "₹",
    locale: "en-IN",
  },

  contact: {
    email: "concierge@tarana-atelier.com",
    whatsappNumber: "+91 98200 12345",
    whatsappDisplay: "+91 98200 12345",
    whatsappUrl: "https://wa.me/919820012345?text=Hello%20Tarana%20Atelier,%20I%20would%20like%20styling%20assistance.",
    instagram: "https://instagram.com/tarana.atelier",
    instagramHandle: "@tarana.atelier",
    hours: "Monday – Saturday: 10:30 AM – 7:30 PM IST",
    location: "Khar West, Mumbai & Mehrauli, New Delhi",
  },

  announcements: [
    {
      id: "ann-1",
      text: "Complimentary express shipping across India on orders above ₹15,000",
      highlight: "Free Shipping",
      link: "/collections/ready-to-ship"
    },
    {
      id: "ann-2",
      text: "Curated Festive Edit '26: Discover handcrafted silks & zardozi heirlooms",
      highlight: "New Collection",
      link: "/collections/festive"
    },
    {
      id: "ann-3",
      text: "WhatsApp Concierge available for custom bridal appointments & bespoke fittings",
      highlight: "Personal Styling",
      link: "https://wa.me/919820012345"
    }
  ],

  navigation: [
    { name: "Home", path: "/" },
    { name: "New Arrivals", path: "/collections/new-arrivals", badge: "New" },
    { name: "Designers", path: "/designers", hasMegaMenu: true },
    { 
      name: "Clothing", 
      path: "/collections/clothing",
      subItems: [
        { name: "Anarkalis & Suits", path: "/collections/anarkalis" },
        { name: "Sarees & Drapes", path: "/collections/sarees" },
        { name: "Lehengas", path: "/collections/lehengas" },
        { name: "Kurtas & Tunics", path: "/collections/kurtas" },
        { name: "Co-ord Sets", path: "/collections/contemporary" },
      ]
    },
    { 
      name: "Ready to Ship", 
      path: "/collections/ready-to-ship", 
      badge: "Fast Dispatch",
      subItems: [
        { name: "Ready-to-Ship Stitched", path: "/collections/ready-to-ship-stitched" },
        { name: "Ready-to-Ship Unstitched", path: "/collections/ready-to-ship-unstitched" },
      ]
    },
    { name: "Accessories", path: "/collections/accessories" },
    { name: "Sale", path: "/collections/sale", isHighlight: true },
  ],

  editorialHero: {
    collectionLabel: "Autumn / Festive 2026",
    headline: "An expression of timeless elegance.",
    supportingText: "Discover considered pieces handcrafted in fine silks, organzas, and heritage embroideries for everyday moments and milestone occasions.",
    ctaText: "Shop the Collection",
    ctaLink: "/collections/new-arrivals",
    secondaryLinkText: "Explore Ready to Ship",
    secondaryLink: "/collections/ready-to-ship",
    imageDesktop: "/images/hero-festive-saree.jpg",
    imageMobile: "/images/hero-festive-saree.jpg",
    slides: [
      {
        id: "slide-festive-saree",
        collectionLabel: "Autumn / Festive 2026",
        headline: "An expression of timeless elegance.",
        supportingText: "Discover considered pieces handcrafted in fine silks, organzas, and heritage embroideries for everyday moments and milestone occasions.",
        ctaText: "Shop the Collection",
        ctaLink: "/collections/new-arrivals",
        secondaryLinkText: "Explore Ready to Ship",
        secondaryLink: "/collections/ready-to-ship",
        image: "/images/hero-festive-saree.jpg",
        aspectRatio: "2/3",
        palette: {
          bg: "#4A0812",
          accent: "#D4AF37",
        }
      },
      {
        id: "slide-royal-lehenga",
        collectionLabel: "The Bridal Atelier",
        headline: "Heirlooms woven for generations.",
        supportingText: "Intricate hand-zardozi craft on pure Mulberry silk and Banarasi brocades, tailored for unforgettable celebrations.",
        ctaText: "Explore Bridal Couture",
        ctaLink: "/collections/lehengas",
        secondaryLinkText: "Book Styling Appointment",
        secondaryLink: "https://wa.me/919820012345",
        image: "/images/hero-bridal-couture.jpg",
        aspectRatio: "2/3",
        palette: {
          bg: "#2A1810",
          accent: "#E2B262",
        }
      },
      {
        id: "slide-handloom-pret",
        collectionLabel: "Handcrafted Luxury Pret",
        headline: "Modern silhouettes with artisanal soul.",
        supportingText: "Lightweight Chanderi suits, flared Anarkalis, and delicate organza dupattas curated for effortless festive dressing.",
        ctaText: "View New Arrivals",
        ctaLink: "/collections/new-arrivals",
        secondaryLinkText: "Ready-to-Ship Edit",
        secondaryLink: "/collections/ready-to-ship",
        image: "/images/hero-luxury-pret.jpg",
        aspectRatio: "2/3",
        palette: {
          bg: "#1C1F26",
          accent: "#C29B38",
        }
      }
    ]
  },

  campaignBanner: {
    quote: "Made for moments worth remembering.",
    subtext: "Handwoven textiles by master artisans, translated into modern heirloom silhouettes.",
    ctaText: "Discover Festive Couture",
    ctaLink: "/collections/lehengas",
    bgImage: "/images/hero-bridal-couture.jpg",
  },

  readyToShipPanels: {
    stitched: {
      title: "Ready-to-Ship Stitched",
      description: "Tailored to perfection and pre-finished. Dispatched within 24 to 48 hours for immediate celebrations.",
      image: "/images/product-chanderi-suit.jpg",
      link: "/collections/ready-to-ship-stitched",
      cta: "Explore Stitched"
    },
    unstitched: {
      title: "Ready-to-Ship Unstitched",
      description: "Artisanal unstitched fabrics and pure silk suit lengths ready for your personal bespoke tailoring.",
      image: "/images/product-organza-saree.jpg",
      link: "/collections/ready-to-ship-unstitched",
      cta: "Explore Unstitched Fabric"
    }
  },

  demoDisclaimer: "Tarana Atelier Storefront Demo • Prices displayed in INR (₹) • Simulated checkout enabled for client review.",
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
