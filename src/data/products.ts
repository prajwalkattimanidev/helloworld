import { Product, DesignerInfo, StyleJournalItem } from '../types';

export const DESIGNERS: DesignerInfo[] = [
  {
    id: "anita-dongre",
    name: "Anita Dongre",
    origin: "Mumbai, India",
    bio: "Synonymous with modern Indian elegance, sustainable luxury, and signature Gota Patti embroidery.",
    image: "/images/product-chanderi-suit.jpg",
    productCount: 4,
    letter: "A"
  },
  {
    id: "chandrima",
    name: "Chandrima",
    origin: "Kolkata, India",
    bio: "Reimagining Indian crafts through contemporary silhouettes, kaleidoscopic threadwork, and nomadic folklore.",
    image: "/images/product-bridal-lehenga.jpg",
    productCount: 2,
    letter: "C"
  },
  {
    id: "house-of-masaba",
    name: "House of Masaba",
    origin: "Mumbai, India",
    bio: "Vibrant motif storytelling, contemporary drape sarees, and play of unconventional traditional palettes.",
    image: "/images/product-velvet-anarkali.jpg",
    productCount: 2,
    letter: "H"
  },
  {
    id: "raw-mango",
    name: "Raw Mango",
    origin: "New Delhi, India",
    bio: "Celebrated for reviving indigenous Indian handlooms, Chanderi weaves, and pure Mashru silks.",
    image: "/images/product-organza-saree.jpg",
    productCount: 3,
    letter: "R"
  },
  {
    id: "rimple-harpreet",
    name: "Rimple & Harpreet",
    origin: "New Delhi, India",
    bio: "Regal archival textiles, museum-grade Zardozi, and dramatic Mughal-inspired couture silhouettes.",
    image: "/images/product-banarasi-silk.jpg",
    productCount: 3,
    letter: "R"
  },
  {
    id: "sabyasachi",
    name: "Sabyasachi",
    origin: "Kolkata, India",
    bio: "Quintessential Indian royalty characterized by vintage antique gold embroideries and nostalgic handcraft.",
    image: "/images/product-crimson-saree.jpg",
    productCount: 3,
    letter: "S"
  },
  {
    id: "tara-atelier",
    name: "Tara Atelier",
    origin: "Jaipur, India",
    bio: "Our in-house design studio curating accessible luxury pret, hand-block florals, and ready-to-ship silks.",
    image: "/images/product-ivory-couture.jpg",
    productCount: 4,
    letter: "T"
  },
  {
    id: "tarun-tahiliani",
    name: "Tarun Tahiliani",
    origin: "New Delhi, India",
    bio: "The master of Indian drape, structural chikankari, and ethereal weightless bridal couture.",
    image: "/images/product-bandhani-lehenga.jpg",
    productCount: 2,
    letter: "T"
  },
  {
    id: "torani",
    name: "Torani",
    origin: "New Delhi, India",
    bio: "Nostalgic fable-inspired aesthetics honoring grandmother’s trunks, hand-embroidered organzas, and chintz.",
    image: "/images/product-kundan-potli.jpg",
    productCount: 3,
    letter: "T"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Gulmohar Chanderi Silk Anarkali Set",
    designer: "Torani",
    designerId: "torani",
    slug: "gulmohar-chanderi-silk-anarkali-set",
    price: 38500,
    originalPrice: 42000,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: true,
    styleTab: "festive",
    category: "kurtas",
    subCategory: "Anarkali Sets",
    shortDescription: "Pure Chanderi silk flared anarkali paired with hand-embroidered dori organza dupatta and churidar.",
    description: "Inspired by blooming gulmohar canopies, this pure Chanderi silk ensemble features delicate marodi work on the yoke, scalloped zardozi hems, and a sheer silk organza dupatta lined with fine zari borders. Finished with soft mulmul lining for supreme comfort.",
    fabricCare: [
      "Fabric: Pure Handloom Chanderi Silk & Silk Organza",
      "Lining: 100% Cotton Mulmul",
      "Care: Strictly Dry Clean Only",
      "Origin: Handcrafted in New Delhi, India"
    ],
    shippingDetails: "Ready to Ship: Dispatches within 24 to 48 business hours via insured courier.",
    images: [
      "/images/product-crimson-saree.jpg",
      "/images/product-banarasi-silk.jpg",
      "/images/product-chanderi-suit.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "Custom Stitched"],
    availableColors: [
      { name: "Crimson Rose", hex: "#6D2638" },
      { name: "Antique Ivory", hex: "#F5F1EB" }
    ],
    variants: [
      { id: "v1-1", size: "XS", color: "Crimson Rose", inStock: true, stockCount: 2, sku: "TOR-GUL-XS-CR" },
      { id: "v1-2", size: "S", color: "Crimson Rose", inStock: true, stockCount: 4, sku: "TOR-GUL-S-CR" },
      { id: "v1-3", size: "M", color: "Crimson Rose", inStock: true, stockCount: 3, sku: "TOR-GUL-M-CR" },
      { id: "v1-4", size: "L", color: "Crimson Rose", inStock: true, stockCount: 1, sku: "TOR-GUL-L-CR" },
      { id: "v1-5", size: "XL", color: "Crimson Rose", inStock: false, stockCount: 0, sku: "TOR-GUL-XL-CR" },
      { id: "v1-6", size: "Custom Stitched", color: "Crimson Rose", inStock: true, stockCount: 5, sku: "TOR-GUL-CUST-CR" },
      { id: "v1-7", size: "S", color: "Antique Ivory", inStock: true, stockCount: 2, sku: "TOR-GUL-S-IV" },
      { id: "v1-8", size: "M", color: "Antique Ivory", inStock: true, stockCount: 3, sku: "TOR-GUL-M-IV" }
    ],
    tags: ["Festive", "Bestseller", "Chanderi", "Anarkali", "Wedding Guest"]
  },
  {
    id: "prod-2",
    name: "Chandrika Tissue Organza Saree",
    designer: "Raw Mango",
    designerId: "raw-mango",
    slug: "chandrika-tissue-organza-saree",
    price: 46000,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: false,
    isSale: false,
    isFeatured: true,
    styleTab: "occasionwear",
    category: "sarees",
    subCategory: "Handloom Sarees",
    shortDescription: "Luminous gold-woven metallic tissue organza saree accompanied by an unstitched silk brocade blouse piece.",
    description: "An ethereal statement drape woven with pure metallic zari threads in Varanasi. The fluid tissue catches ambient light gracefully, falling with tailored precision. Includes 0.8 meters of coordinating heavy mulberry silk brocade blouse piece.",
    fabricCare: [
      "Fabric: Pure Metallic Zari Tissue Organza",
      "Blouse Piece: Unstitched Pure Silk Brocade included",
      "Care: Protect from moisture; Dry Clean Only",
      "Storage: Wrap in muslin cloth"
    ],
    shippingDetails: "Ready to Ship: Dispatches within 24 hours.",
    images: [
      "/images/product-organza-saree.jpg",
      "/images/product-crimson-saree.jpg"
    ],
    availableSizes: ["Unstitched Fabric"],
    availableColors: [
      { name: "Champagne Gold", hex: "#D4AF37" },
      { name: "Pistachio Sage", hex: "#9CAF88" }
    ],
    variants: [
      { id: "v2-1", size: "Unstitched Fabric", color: "Champagne Gold", inStock: true, stockCount: 4, sku: "RM-CHN-GOLD" },
      { id: "v2-2", size: "Unstitched Fabric", color: "Pistachio Sage", inStock: true, stockCount: 2, sku: "RM-CHN-SAGE" }
    ],
    tags: ["Saree", "Handloom", "Varanasi", "Tissue", "Reception"]
  },
  {
    id: "prod-3",
    name: "Meenakari Embroidered Velvet Lehenga",
    designer: "Sabyasachi",
    designerId: "sabyasachi",
    slug: "meenakari-embroidered-velvet-lehenga",
    price: 165000,
    originalPrice: 185000,
    isNewArrival: false,
    isReadyToShip: false,
    isStitched: true,
    isSale: true,
    isFeatured: true,
    styleTab: "occasionwear",
    category: "lehengas",
    subCategory: "Bridal Lehengas",
    shortDescription: "Architectural jewel-toned velvet lehenga with handcrafted antique bullion zardozi and double organza veil.",
    description: "An iconic silhouette rendered in deep royal pomegranate micro-velvet. Embroidered with centuries-old Meenakari threadwork, Kashmiri tilla, and dabka stitches. Accompanied by a sweetheart-neckline choli and dual dupattas.",
    fabricCare: [
      "Fabric: Silk Velvet base with Tissue & Silk Organza veils",
      "Embroidery: Authentic Handcrafted Zardozi & Tilla",
      "Care: Specialist Luxury Dry Clean Only"
    ],
    shippingDetails: "Couture Made to Order: Handcrafted and delivered within 3-4 weeks. Made-to-measure fittings coordinated by concierge.",
    images: [
      "/images/product-bridal-lehenga.jpg",
      "/images/product-crimson-saree.jpg"
    ],
    availableSizes: ["S", "M", "L", "Custom Stitched"],
    availableColors: [
      { name: "Royal Pomegranate", hex: "#6D2638" },
      { name: "Midnight Teal", hex: "#1A3636" }
    ],
    variants: [
      { id: "v3-1", size: "S", color: "Royal Pomegranate", inStock: true, stockCount: 1, sku: "SAB-VEL-S-POM" },
      { id: "v3-2", size: "M", color: "Royal Pomegranate", inStock: true, stockCount: 1, sku: "SAB-VEL-M-POM" },
      { id: "v3-3", size: "Custom Stitched", color: "Royal Pomegranate", inStock: true, stockCount: 3, sku: "SAB-VEL-CUST-POM" }
    ],
    tags: ["Bridal", "Velvet", "Couture", "Sale", "Zardozi"]
  },
  {
    id: "prod-4",
    name: "Noor Gota Patti Silk Kurta Set",
    designer: "Anita Dongre",
    designerId: "anita-dongre",
    slug: "noor-gota-patti-silk-kurta-set",
    price: 32000,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: true,
    styleTab: "everyday",
    category: "kurtas",
    subCategory: "Kurta Sets",
    shortDescription: "Straight-cut raw silk kurta embellished with geometric Rajasthani Gota Patti ribbons and straight cigarette trousers.",
    description: "Understated refinement for intimate gatherings and celebrations. Crafted in rich dupion raw silk, detailed with signature hand-appliquéd Gota Patti motifs along the neckline and cuffs. Paired with comfortable slim-fit silk pants.",
    fabricCare: [
      "Fabric: 100% Handwoven Raw Dupion Silk",
      "Lining: Pure Cotton Shantoon",
      "Care: Dry Clean Only"
    ],
    shippingDetails: "Ready to Ship: Dispatches within 24 hours.",
    images: [
      "/images/product-chanderi-suit.jpg",
      "/images/product-banarasi-silk.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Mustard Saffron", hex: "#D49B28" },
      { name: "Blush Mauve", hex: "#C49A9B" }
    ],
    variants: [
      { id: "v4-1", size: "XS", color: "Mustard Saffron", inStock: true, stockCount: 3, sku: "AD-NOOR-XS-SAF" },
      { id: "v4-2", size: "S", color: "Mustard Saffron", inStock: true, stockCount: 5, sku: "AD-NOOR-S-SAF" },
      { id: "v4-3", size: "M", color: "Mustard Saffron", inStock: true, stockCount: 4, sku: "AD-NOOR-M-SAF" },
      { id: "v4-4", size: "L", color: "Mustard Saffron", inStock: true, stockCount: 2, sku: "AD-NOOR-L-SAF" },
      { id: "v4-5", size: "XL", color: "Mustard Saffron", inStock: true, stockCount: 1, sku: "AD-NOOR-XL-SAF" }
    ],
    tags: ["Gota Patti", "Silk", "Ready to Ship", "Diwali", "Puja"]
  },
  {
    id: "prod-5",
    name: "Rabaab Unstitched Banarasi Silk Suit Length",
    designer: "Tara Atelier",
    designerId: "tara-atelier",
    slug: "rabaab-unstitched-banarasi-silk-suit-length",
    price: 18500,
    originalPrice: 21000,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: false,
    isSale: true,
    isFeatured: true,
    styleTab: "everyday",
    category: "unstitched",
    subCategory: "Unstitched Suits",
    shortDescription: "3-piece unstitched handloom Banarasi katan silk kurta fabric, plain silk bottoms fabric, and meenakari zari dupatta.",
    description: "Curated unstitched pure Katan silk suit material featuring kadwa boota handweaving. Gives you the freedom to craft bespoke necklines, sleeves, and silhouettes tailored to your personal aesthetic.",
    fabricCare: [
      "Kurta Fabric: 2.5 meters Pure Banarasi Katan Silk",
      "Bottom Fabric: 2.5 meters Pure Santoon Silk",
      "Dupatta: 2.5 meters Handwoven Banarasi Brocade",
      "Care: Dry Clean Only"
    ],
    shippingDetails: "Ready to Ship: Next business day dispatch across India.",
    images: [
      "/images/product-ivory-couture.jpg",
      "/images/product-organza-saree.jpg"
    ],
    availableSizes: ["Unstitched Fabric"],
    availableColors: [
      { name: "Emerald Forest", hex: "#1C3F34" },
      { name: "Vintage Rose", hex: "#A85D6A" }
    ],
    variants: [
      { id: "v5-1", size: "Unstitched Fabric", color: "Emerald Forest", inStock: true, stockCount: 6, sku: "TA-RAB-UNST-EM" },
      { id: "v5-2", size: "Unstitched Fabric", color: "Vintage Rose", inStock: true, stockCount: 4, sku: "TA-RAB-UNST-VR" }
    ],
    tags: ["Unstitched", "Ready to Ship", "Banarasi", "Handloom", "Sale"]
  },
  {
    id: "prod-6",
    name: "Sultanat Draped Chikankari Concept Saree",
    designer: "Tarun Tahiliani",
    designerId: "tarun-tahiliani",
    slug: "sultanat-draped-chikankari-concept-saree",
    price: 89000,
    originalPrice: undefined,
    isNewArrival: false,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: true,
    styleTab: "festive",
    category: "sarees",
    subCategory: "Pre-Draped Sarees",
    shortDescription: "Pre-pleated Italian georgette concept saree featuring hand-embroidered Lucknowi chikankari and structured corset.",
    description: "Effortless glamor meets age-old craft. This pre-stitched drape eliminates the complexity of pinning, flowing seamlessly with an embellished corset blouse encrusted with micro-pearls, crystals, and shadow work.",
    fabricCare: [
      "Fabric: Georgette & Tulle blend",
      "Embroidery: Handcrafted Lucknowi Chikankari & Mukaish",
      "Care: Professional Dry Clean"
    ],
    shippingDetails: "Ready to Ship Stitched: Dispatches within 48 hours.",
    images: [
      "/images/product-bandhani-lehenga.jpg",
      "/images/product-crimson-saree.jpg"
    ],
    availableSizes: ["S", "M", "L"],
    availableColors: [
      { name: "Pearl Oyster", hex: "#EAE6DF" },
      { name: "Powder Coral", hex: "#E89B88" }
    ],
    variants: [
      { id: "v6-1", size: "S", color: "Pearl Oyster", inStock: true, stockCount: 2, sku: "TT-SULT-S-OYST" },
      { id: "v6-2", size: "M", color: "Pearl Oyster", inStock: true, stockCount: 2, sku: "TT-SULT-M-OYST" },
      { id: "v6-3", size: "L", color: "Pearl Oyster", inStock: false, stockCount: 0, sku: "TT-SULT-L-OYST" }
    ],
    tags: ["Pre-Stitched", "Concept Saree", "Chikankari", "Cocktail", "Drape"]
  },
  {
    id: "prod-7",
    name: "Zeenat Marodi Work Sharara Suit",
    designer: "Rimple & Harpreet",
    designerId: "rimple-harpreet",
    slug: "zeenat-marodi-work-sharara-suit",
    price: 74500,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: false,
    styleTab: "festive",
    category: "kurtas",
    subCategory: "Sharara Sets",
    shortDescription: "Mulberry silk short kurti paired with voluminous kalidar flared sharara pants and badla work veil.",
    description: "Archival textile artistry brought to life with intricate marodi thread embroidery, hammered metal sequin highlights, and a billowy paneled sharara.",
    fabricCare: [
      "Fabric: 100% Pure Mulberry Silk with Silk Crepe lining",
      "Care: Delicate Dry Clean Only"
    ],
    shippingDetails: "Ready to Ship Stitched: Dispatches within 2 days.",
    images: [
      "/images/product-banarasi-silk.jpg",
      "/images/product-crimson-saree.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "Custom Stitched"],
    availableColors: [
      { name: "Deep Ruby", hex: "#6D2638" },
      { name: "Ivory Gold", hex: "#ECE4D0" }
    ],
    variants: [
      { id: "v7-1", size: "XS", color: "Deep Ruby", inStock: true, stockCount: 1, sku: "RH-ZEE-XS-RUB" },
      { id: "v7-2", size: "S", color: "Deep Ruby", inStock: true, stockCount: 2, sku: "RH-ZEE-S-RUB" },
      { id: "v7-3", size: "M", color: "Deep Ruby", inStock: true, stockCount: 3, sku: "RH-ZEE-M-RUB" },
      { id: "v7-4", size: "L", color: "Deep Ruby", inStock: true, stockCount: 1, sku: "RH-ZEE-L-RUB" },
      { id: "v7-5", size: "Custom Stitched", color: "Deep Ruby", inStock: true, stockCount: 2, sku: "RH-ZEE-CUST-RUB" }
    ],
    tags: ["Sharara", "Marodi", "Ready to Ship", "Festive", "Heirloom"]
  },
  {
    id: "prod-8",
    name: "Sitara Printed Silk Co-ord Cape Set",
    designer: "House of Masaba",
    designerId: "house-of-masaba",
    slug: "sitara-printed-silk-co-ord-cape-set",
    price: 24500,
    originalPrice: 28000,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: true,
    isFeatured: true,
    styleTab: "everyday",
    category: "contemporary",
    subCategory: "Indo-Western Pret",
    shortDescription: "Contemporary printed crepe bustier, tailored cigarette trousers, and fluid floor-sweeping cape.",
    description: "An effortlessly chic 3-piece silhouette featuring the brand's iconic palm leaf and star motifs, tailored in fluid crepe with subtle gold foil stamps.",
    fabricCare: [
      "Fabric: Premium Silk Crepe",
      "Care: Gentle Dry Clean"
    ],
    shippingDetails: "Ready to Ship: Next business day dispatch.",
    images: [
      "/images/product-velvet-anarkali.jpg",
      "/images/product-ivory-couture.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Onyx Black & Gold", hex: "#222222" },
      { name: "Emerald Leaf", hex: "#1C3F34" }
    ],
    variants: [
      { id: "v8-1", size: "XS", color: "Onyx Black & Gold", inStock: true, stockCount: 3, sku: "MAS-SIT-XS" },
      { id: "v8-2", size: "S", color: "Onyx Black & Gold", inStock: true, stockCount: 4, sku: "MAS-SIT-S" },
      { id: "v8-3", size: "M", color: "Onyx Black & Gold", inStock: true, stockCount: 5, sku: "MAS-SIT-M" },
      { id: "v8-4", size: "L", color: "Onyx Black & Gold", inStock: true, stockCount: 2, sku: "MAS-SIT-L" }
    ],
    tags: ["Pret", "Contemporary", "Cape Set", "Sale", "Sangeet"]
  },
  {
    id: "prod-9",
    name: "Kashmiri Aari Embroidered Pashmina Shawl",
    designer: "Tara Atelier",
    designerId: "tara-atelier",
    slug: "kashmiri-aari-embroidered-pashmina-shawl",
    price: 28000,
    originalPrice: undefined,
    isNewArrival: false,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: false,
    styleTab: "occasionwear",
    category: "accessories",
    subCategory: "Shawls & Stoles",
    shortDescription: "Certified 100% fine Ladakhi Cashmere Pashmina hand-embroidered with dense floral Aari jaal work.",
    description: "Woven on traditional wooden looms in Srinagar from gossamer Ladakhi mountain cashmere, then embellished over 90 days with needlepoint botanical vines.",
    fabricCare: [
      "Material: 100% Certified Pure Pashmina Cashmere",
      "Care: Dry Clean Only; Never wring or machine wash"
    ],
    shippingDetails: "Ready to Ship: Next day dispatch with authenticity certificate.",
    images: [
      "/images/product-polki-jhumkas.jpg",
      "/images/product-chanderi-suit.jpg"
    ],
    availableSizes: ["Standard Shawl (100 x 200 cm)"],
    availableColors: [
      { name: "Natural Ecru", hex: "#E7E2D6" },
      { name: "Burgundy", hex: "#6D2638" }
    ],
    variants: [
      { id: "v9-1", size: "Standard Shawl (100 x 200 cm)", color: "Natural Ecru", inStock: true, stockCount: 3, sku: "TA-PASH-ECRU" },
      { id: "v9-2", size: "Standard Shawl (100 x 200 cm)", color: "Burgundy", inStock: true, stockCount: 2, sku: "TA-PASH-BURG" }
    ],
    tags: ["Pashmina", "Handloom", "Accessories", "Kashmir", "Heirloom"]
  },
  {
    id: "prod-10",
    name: "Bahaar Handcrafted Floral Kalidar Lehenga",
    designer: "Torani",
    designerId: "torani",
    slug: "bahaar-handcrafted-floral-kalidar-lehenga",
    price: 98000,
    originalPrice: 110000,
    isNewArrival: true,
    isReadyToShip: false,
    isStitched: true,
    isSale: true,
    isFeatured: true,
    styleTab: "occasionwear",
    category: "lehengas",
    subCategory: "Festive Lehengas",
    shortDescription: "Lightweight organza 16-kali flared lehenga with botanical hand-block print and subtle sequin dust.",
    description: "An ode to springtime in Punjab. Crafted with gossamer silk organza, hand-block printed using natural pigment dyes, and accented with handcrafted micro sequin veins.",
    fabricCare: [
      "Fabric: Silk Organza with Cotton Shantoon lining",
      "Care: Specialized Dry Clean"
    ],
    shippingDetails: "Made to Order: Dispatches in 2-3 weeks.",
    images: [
      "/images/product-kundan-potli.jpg",
      "/images/product-crimson-saree.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "Custom Stitched"],
    availableColors: [
      { name: "Powder Blush", hex: "#E8C8C8" },
      { name: "Mint Mist", hex: "#D2E2D7" }
    ],
    variants: [
      { id: "v10-1", size: "S", color: "Powder Blush", inStock: true, stockCount: 2, sku: "TOR-BAH-S-BLU" },
      { id: "v10-2", size: "M", color: "Powder Blush", inStock: true, stockCount: 2, sku: "TOR-BAH-M-BLU" },
      { id: "v10-3", size: "Custom Stitched", color: "Powder Blush", inStock: true, stockCount: 4, sku: "TOR-BAH-CUST-BLU" }
    ],
    tags: ["Organza", "Floral", "Mehendi", "Lightweight Lehenga", "Sale"]
  },
  {
    id: "prod-11",
    name: "Kundan & Freshwater Pearl Polki Choker",
    designer: "Tara Atelier",
    designerId: "tara-atelier",
    slug: "kundan-freshwater-pearl-polki-choker",
    price: 19500,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: false,
    styleTab: "occasionwear",
    category: "accessories",
    subCategory: "Fine Jewelry",
    shortDescription: "22kt gold dipped silver brass choker set with uncut glass polki, emerald bead drops, and matching earrings.",
    description: "Handcrafted by heritage karigars in Jaipur. Strung on adjustable silk zari cord to comfortably fit any neck circumference.",
    fabricCare: [
      "Metal: Premium Silver-Brass alloy, 22kt Gold Micropated",
      "Stones: Uncut Polki glass crystals, cultured freshwater pearls",
      "Care: Keep away from perfumes and cosmetics; store in airtight velvet pouch"
    ],
    shippingDetails: "Ready to Ship: Dispatches within 24 hours in gift-ready jewelry box.",
    images: [
      "/images/product-temple-choker.jpg",
      "/images/product-chanderi-suit.jpg"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Emerald & Pearl", hex: "#1C3F34" },
      { name: "Ruby & Pearl", hex: "#6D2638" }
    ],
    variants: [
      { id: "v11-1", size: "One Size", color: "Emerald & Pearl", inStock: true, stockCount: 5, sku: "TA-KUN-EM" },
      { id: "v11-2", size: "One Size", color: "Ruby & Pearl", inStock: true, stockCount: 3, sku: "TA-KUN-RU" }
    ],
    tags: ["Jewelry", "Polki", "Choker", "Wedding", "Ready to Ship"]
  },
  {
    id: "prod-12",
    name: "Varanasi Kadwa Buti Silk Brocade Kurta",
    designer: "Raw Mango",
    designerId: "raw-mango",
    slug: "varanasi-kadwa-buti-silk-brocade-kurta",
    price: 34000,
    originalPrice: undefined,
    isNewArrival: false,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: true,
    styleTab: "everyday",
    category: "kurtas",
    subCategory: "Kurta Sets",
    shortDescription: "Straight cut handwoven Katan silk kurta woven with classic floral coin butis, paired with matching straight pants.",
    description: "A testament to traditional handloom mastery. Pure mulberry silk woven on pit looms in Varanasi, finished with minimalist clean piping and concealed pockets.",
    fabricCare: [
      "Fabric: 100% Handloom Katan Silk",
      "Care: Dry Clean Only"
    ],
    shippingDetails: "Ready to Ship: Next business day dispatch.",
    images: [
      "/images/product-bridal-lehenga.jpg",
      "/images/product-organza-saree.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL"],
    availableColors: [
      { name: "Aubergine Plum", hex: "#4A2E44" },
      { name: "Amber Ochre", hex: "#C68B35" }
    ],
    variants: [
      { id: "v12-1", size: "XS", color: "Aubergine Plum", inStock: true, stockCount: 2, sku: "RM-KAD-XS" },
      { id: "v12-2", size: "S", color: "Aubergine Plum", inStock: true, stockCount: 3, sku: "RM-KAD-S" },
      { id: "v12-3", size: "M", color: "Aubergine Plum", inStock: true, stockCount: 4, sku: "RM-KAD-M" },
      { id: "v12-4", size: "L", color: "Aubergine Plum", inStock: true, stockCount: 1, sku: "RM-KAD-L" }
    ],
    tags: ["Kurta", "Handloom", "Raw Mango", "Silk Brocade", "Festive"]
  },
  {
    id: "prod-13",
    name: "Zari Jamdani Unstitched Chanderi Suit",
    designer: "Chandrima",
    designerId: "chandrima",
    slug: "zari-jamdani-unstitched-chanderi-suit",
    price: 16500,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: false,
    isSale: false,
    isFeatured: false,
    styleTab: "everyday",
    category: "unstitched",
    subCategory: "Unstitched Suits",
    shortDescription: "Airy Chanderi cotton-silk unstitched fabric woven with fine geometric Jamdani motifs and contrast dupatta.",
    description: "Unstitched dress material woven in Madhya Pradesh blending sheer breathability with celebratory metallic thread accents.",
    fabricCare: [
      "Top: 2.5m Chanderi Silk Cotton",
      "Bottom: 2.5m Fine Cotton Silk",
      "Dupatta: 2.5m Sheer Jamdani Organza",
      "Care: Gentle Handwash or Dry Clean"
    ],
    shippingDetails: "Ready to Ship Unstitched: Dispatches in 24 hours.",
    images: [
      "/images/product-organza-saree.jpg",
      "/images/product-ivory-couture.jpg"
    ],
    availableSizes: ["Unstitched Fabric"],
    availableColors: [
      { name: "Pristine Ivory & Coral", hex: "#FFFDF9" },
      { name: "Powder Blue & Gold", hex: "#D6E5EB" }
    ],
    variants: [
      { id: "v13-1", size: "Unstitched Fabric", color: "Pristine Ivory & Coral", inStock: true, stockCount: 5, sku: "CHA-JAM-IV" },
      { id: "v13-2", size: "Unstitched Fabric", color: "Powder Blue & Gold", inStock: true, stockCount: 3, sku: "CHA-JAM-BL" }
    ],
    tags: ["Unstitched", "Ready to Ship", "Jamdani", "Chanderi", "Summer Festive"]
  },
  {
    id: "prod-14",
    name: "Rani Bagh Pure Silk Kanjeevaram Saree",
    designer: "Tara Atelier",
    designerId: "tara-atelier",
    slug: "rani-bagh-pure-silk-kanjeevaram-saree",
    price: 52000,
    originalPrice: 58000,
    isNewArrival: false,
    isReadyToShip: true,
    isStitched: false,
    isSale: true,
    isFeatured: true,
    styleTab: "festive",
    category: "sarees",
    subCategory: "Silk Sarees",
    shortDescription: "Pure mulberry silk Kanchipuram weave with heavy korvai zari borders and mayil (peacock) motifs.",
    description: "Woven using authentic 3-ply twisted silk yarn in Tamil Nadu with authentic silver zari dipped in 24k gold wash. Weighty, heirloom-grade drape.",
    fabricCare: [
      "Fabric: 100% Pure Mulberry Silk with Silk Mark Certification",
      "Care: Specialist Dry Clean Only",
      "Storage: Air every 6 months, wrap in pure cotton"
    ],
    shippingDetails: "Ready to Ship: Dispatches within 24 hours.",
    images: [
      "/images/product-crimson-saree.jpg",
      "/images/product-organza-saree.jpg"
    ],
    availableSizes: ["Unstitched Fabric"],
    availableColors: [
      { name: "Crimson Maroon & Mustard", hex: "#6D2638" },
      { name: "Royal Purple & Green", hex: "#4C2B4E" }
    ],
    variants: [
      { id: "v14-1", size: "Unstitched Fabric", color: "Crimson Maroon & Mustard", inStock: true, stockCount: 3, sku: "TA-KANJ-CRIM" },
      { id: "v14-2", size: "Unstitched Fabric", color: "Royal Purple & Green", inStock: true, stockCount: 2, sku: "TA-KANJ-PURP" }
    ],
    tags: ["Kanjeevaram", "Silk Saree", "Bridal", "Sale", "Heirloom"]
  },
  {
    id: "prod-15",
    name: "Abeer Mirrored Silk Kurta & Gharara Set",
    designer: "Anita Dongre",
    designerId: "anita-dongre",
    slug: "abeer-mirrored-silk-kurta-gharara-set",
    price: 49500,
    originalPrice: undefined,
    isNewArrival: true,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: true,
    styleTab: "festive",
    category: "kurtas",
    subCategory: "Gharara Sets",
    shortDescription: "Shimmering real mirrorwork and resham embroidered tussar silk kurta paired with two-tier flared gharara.",
    description: "Festive grandeur reimagined with lightness. Features hundreds of hand-set micro glass mirrors, framed with resham silk threads that catch the evening lanterns.",
    fabricCare: [
      "Fabric: Tussar Silk with soft mulmul lining",
      "Care: Protect mirrors during specialist dry cleaning"
    ],
    shippingDetails: "Ready to Ship Stitched: Dispatches within 48 hours.",
    images: [
      "/images/product-chanderi-suit.jpg",
      "/images/product-banarasi-silk.jpg"
    ],
    availableSizes: ["XS", "S", "M", "L", "XL", "Custom Stitched"],
    availableColors: [
      { name: "Champagne Ivory", hex: "#F5F1EB" },
      { name: "Sunset Marigold", hex: "#E88732" }
    ],
    variants: [
      { id: "v15-1", size: "XS", color: "Champagne Ivory", inStock: true, stockCount: 2, sku: "AD-AB-XS-IV" },
      { id: "v15-2", size: "S", color: "Champagne Ivory", inStock: true, stockCount: 3, sku: "AD-AB-S-IV" },
      { id: "v15-3", size: "M", color: "Champagne Ivory", inStock: true, stockCount: 4, sku: "AD-AB-M-IV" },
      { id: "v15-4", size: "L", color: "Champagne Ivory", inStock: true, stockCount: 1, sku: "AD-AB-L-IV" }
    ],
    tags: ["Mirrorwork", "Gharara", "Ready to Ship", "Sangeet", "Festive"]
  },
  {
    id: "prod-16",
    name: "Nocturne Hand-Embroidered Zardozi Potli",
    designer: "Tara Atelier",
    designerId: "tara-atelier",
    slug: "nocturne-hand-embroidered-zardozi-potli",
    price: 8500,
    originalPrice: undefined,
    isNewArrival: false,
    isReadyToShip: true,
    isStitched: true,
    isSale: false,
    isFeatured: false,
    styleTab: "occasionwear",
    category: "accessories",
    subCategory: "Bags & Clutches",
    shortDescription: "Opulent micro-velvet drawstring potli bag encrusted with brass bullion zardozi and cultured seed pearls.",
    description: "Handcrafted in Old Delhi by third-generation embroiderers. Features braided silk drawstrings accented with carved brass latkans and a delicate wristlet handle.",
    fabricCare: [
      "Material: Silk Micro-velvet with satin lining",
      "Care: Spot clean with damp soft cloth; keep in dust bag"
    ],
    shippingDetails: "Ready to Ship: Next day dispatch.",
    images: [
      "/images/product-pashmina-shawl.jpg",
      "/images/product-chanderi-suit.jpg"
    ],
    availableSizes: ["One Size"],
    availableColors: [
      { name: "Wine Burgundy", hex: "#6D2638" },
      { name: "Antique Gold", hex: "#C5A059" }
    ],
    variants: [
      { id: "v16-1", size: "One Size", color: "Wine Burgundy", inStock: true, stockCount: 8, sku: "TA-POT-BUR" },
      { id: "v16-2", size: "One Size", color: "Antique Gold", inStock: true, stockCount: 6, sku: "TA-POT-GLD" }
    ],
    tags: ["Potli", "Velvet", "Accessories", "Ready to Ship", "Wedding"]
  }
];

export const STYLE_JOURNAL_LOOKS: StyleJournalItem[] = [
  {
    id: "journal-1",
    title: "The Regal Evening Affair",
    caption: "Layering deep wine velvets with antique bullion zardozi and raw silk textures for heritage celebrations.",
    tag: "Editorial Curation",
    image: "/images/product-crimson-saree.jpg",
    relatedProductIds: ["prod-1", "prod-3", "prod-16"],
    designer: "Sabyasachi & Tara Atelier"
  },
  {
    id: "journal-2",
    title: "Summer Soirees in Handloom Chanderi",
    caption: "Weightless breathability, soft pastels, and metallic borders that catch sunlight at garden weddings.",
    tag: "Artisanal Edit",
    image: "/images/product-organza-saree.jpg",
    relatedProductIds: ["prod-2", "prod-5", "prod-13"],
    designer: "Raw Mango & Chandrima"
  },
  {
    id: "journal-3",
    title: "Contemporary Drape & Structural Pret",
    caption: "Modern silhouettes and pre-stitched concept sarees that marry historic embroidery with effortless movement.",
    tag: "Modern Festive",
    image: "/images/product-bandhani-lehenga.jpg",
    relatedProductIds: ["prod-6", "prod-8", "prod-11"],
    designer: "Tarun Tahiliani & House of Masaba"
  }
];
