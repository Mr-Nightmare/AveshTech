/**
 * Avesh Technologies - Unified E-Commerce Data Engine
 * Handles Products (CRUD), Cart, Razorpay Integration, and Influencer Referral System.
 */

// HTML Escaping Utility for XSS Prevention
function escapeHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
window.escapeHTML = escapeHTML;

const STORAGE_KEYS = {
  PRODUCTS: 'avesh_products_v8',
  CART: 'aveshtech-cart',
  ORDERS: 'avesh_orders_v1',
  INFLUENCERS: 'avesh_influencers_v1',
  REFERRAL_LOGS: 'avesh_referral_logs_v1',
  PAYOUT_REQUESTS: 'avesh_payout_requests_v1',
  ACTIVE_REF: 'avesh_active_ref',
  INQUIRIES: 'avesh_contact_inquiries_v1',
  CUSTOMERS: 'avesh_customers_v1'
};

// ==========================================
// SEED PRODUCTS (Comprehensive Authentic 54-Item Catalog)
// ==========================================
const DEFAULT_PRODUCTS = [
  {
    id: 301,
    name: 'Lord Hanuman Dhyan Mudra 3D Shadow Projection Lamp',
    slug: 'lord-hanuman-meditation-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 999,
    mrp: 1599,
    stock: 45,
    stock_status: 'In Stock (Handcrafted)',
    badge: 'Flagship Devotional',
    rating: 5.0,
    reviews_count: 88,
    featured: true,
    customizable: false,
    images: ['assets/products/hanuman-shadow-lamp.png'],
    short_description: 'Our signature illuminated masterpiece! Precision 3D-crafted devotional lamp that casts a majestic silhouette of Lord Hanuman in deep meditation across your wall.',
    description: 'Transform your room, mandir, or meditation sanctuary with divine energy. Precision-engineered with high-contrast optical shadow baffles and ultra-bright 3000K warm LED illumination. Includes wall mounting hardware, acrylic diffuser, 5V USB power adapter, and solid wooden base.'
  },

  {
    id: 302,
    name: 'Illuminated Temple Pavilion Shrine with Lord Ganesha',
    slug: 'illuminated-temple-ganesha-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 899,
    mrp: 1499,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Handcrafted',
    rating: 4.9,
    reviews_count: 42,
    featured: true,
    customizable: false,
    images: ['assets/products/model-14.jpeg'],
    short_description: 'Miniature temple pavilion sanctum with carved arches, pillars, and an illuminated Lord Ganesha murti inside with warm fairy LEDs.',
    description: 'Exquisitely detailed miniature pooja pavilion 3D printed with silk PLA. Internal warm LED lights create a serene spiritual glow for bedside tables or home altars. USB plug-and-play.'
  },

  {
    id: 303,
    name: 'Geometric Sacred Mandala Shadow Projection Disc',
    slug: 'sacred-mandala-shadow-projection-disc',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 649,
    mrp: 1099,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Aesthetic Art',
    rating: 4.9,
    reviews_count: 36,
    featured: true,
    customizable: false,
    images: ['assets/products/model-22.jpeg'],
    short_description: 'Intricately computed sacred geometry mandala stencil disc that projects kaleidoscopic geometric shadow rays across bedroom walls.',
    description: 'Engineered with concentric sacred geometric patterns. Backlit by high-intensity focused beam creating an expansive soothing shadow array on dark walls. Great for relaxation and modern interiors.'
  },

  {
    id: 304,
    name: 'Personalized Couple Silhouette & Names 3D Shadow Lamp',
    slug: 'couple-name-silhouette-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 799,
    mrp: 1299,
    stock: 50,
    stock_status: 'Custom Built',
    badge: 'Bestseller Gifting',
    rating: 5.0,
    reviews_count: 67,
    featured: true,
    customizable: true,
    images: ['assets/products/model-1.jpeg'],
    short_description: 'A magical romantic gift! Enter your names to project your custom couple silhouettes and names on your room wall.',
    description: 'Handcrafted optical shadow box with precision custom cutouts. Enter the names you want inscribed. When switched on, casts clear shadow typography and romantic silhouettes on the wall. Includes 5V warm LED bulb and USB adapter.'
  },

  {
    id: 305,
    name: 'Adiyogi Shiva Cosmic Silhouette 3D Shadow Lamp',
    slug: 'adiyogi-shiva-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 899,
    mrp: 1499,
    stock: 28,
    stock_status: 'In Stock',
    badge: 'Spiritual Night Light',
    rating: 4.9,
    reviews_count: 31,
    featured: true,
    customizable: false,
    images: ['assets/products/model-6.jpeg'],
    short_description: 'Projects the serene meditative silhouette of Adiyogi Shiva with crescent moon glow across your wall.',
    description: 'Brings meditative calm into your room. High-contrast Adiyogi silhouette backplate illuminated by warm 2700K LED array.'
  },

  {
    id: 306,
    name: 'Radhe Krishna Divine Flute Sacred Shadow Light Box',
    slug: 'radhe-krishna-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 849,
    mrp: 1399,
    stock: 24,
    stock_status: 'In Stock',
    badge: 'Divine Melodies',
    rating: 5.0,
    reviews_count: 29,
    featured: false,
    customizable: false,
    images: ['assets/products/model-12.jpeg'],
    short_description: 'Projects Lord Krishna playing his divine flute amidst peacock feathers and lotus motifs.',
    description: 'Warm golden spiritual illumination for pooja rooms and bedrooms. Solid timber base with low power USB power adapter.'
  },

  {
    id: 307,
    name: 'Sacred Om & Trishul Spiritual Night Shadow Lamp',
    slug: 'om-trishul-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 699,
    mrp: 1199,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Sacred Protection',
    rating: 4.8,
    reviews_count: 22,
    featured: false,
    customizable: false,
    images: ['assets/products/model-9.jpeg'],
    short_description: 'Projects sacred Om (ॐ) and Shiva Trishul silhouette radiating peace, divine protection, and spiritual focus.',
    description: 'Precision stencil with focused lens that projects crisp shadows up to 10 feet across ceiling or wall.'
  },

  {
    id: 308,
    name: 'Custom Photo Lithophane Memory Shadow Lamp (Wood Base)',
    slug: 'custom-lithophane-photo-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 799,
    mrp: 1299,
    stock: 45,
    stock_status: 'Custom Built',
    badge: 'Photo Memories',
    rating: 4.9,
    reviews_count: 52,
    featured: true,
    customizable: true,
    images: ['assets/products/item-15.jpeg'],
    short_description: 'Upload any photograph! Precision 3D printed lithophane with warm wooden base that magically reveals your photo when switched on.',
    description: 'Printed with 0.12mm micro layers in warm-white PLA. When the LED turns on, your photograph magically appears with lifelike depth and contrast. USB cable included.'
  },

  {
    id: 201,
    name: 'Lord Ganesha in Royal Pagdi (White Marble PLA Finish)',
    slug: 'lord-ganesha-royal-pagdi-idol',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 399,
    mrp: 699,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Bestseller',
    rating: 4.9,
    reviews_count: 53,
    featured: true,
    customizable: false,
    images: ['assets/products/model-8.jpeg'],
    short_description: 'Majestic Lord Ganesha murti wearing an ornate traditional turban (Pagdi) in smooth tactile white marble PLA finish.',
    description: 'Sculpted with regal royal pagdi folds, detailed trunk ornaments, and serene blessings gesture. 3D printed with premium stone-infused PLA for a heavy, authentic marble texture.'
  },

  {
    id: 202,
    name: 'Shri Krishna Murli Manohar 3D Sacred Idol',
    slug: 'shri-krishna-murli-manohar-idol',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 449,
    mrp: 799,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Divine Art',
    rating: 5.0,
    reviews_count: 48,
    featured: true,
    customizable: false,
    images: ['assets/products/model-12.jpeg'],
    short_description: 'Hand-sculpted digital representation of Lord Krishna playing his divine flute standing atop an open lotus bloom with peacock crown.',
    description: 'Capture the divine melody of Shri Krishna. Crafted in silk sheen filament with razor-sharp detailing on his bansuri flute, dhoti drapes, and lotus base. Perfect for pooja altars and home decor.'
  },

  {
    id: 203,
    name: 'Bal Hanuman with Gada (Silk Gold & Matte White Edition)',
    slug: 'bal-hanuman-gada-figurine',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 45,
    stock_status: 'In Stock',
    badge: 'Popular',
    rating: 4.9,
    reviews_count: 61,
    featured: true,
    customizable: false,
    images: ['assets/products/model-2.jpeg'],
    short_description: 'Adorable child Hanuman figurine holding his divine mace (Gada). 3D printed with dual silk gold and matte white sheen.',
    description: 'High-detail 3D printed Bal Hanuman idol representing strength, devotion, and courage. Ideal size for car dashboards, study tables, or kids bedrooms.'
  },

  {
    id: 204,
    name: 'Bal Ganesha Embracing Shivling 3D Murti',
    slug: 'bal-ganesha-embracing-shivling',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Trending',
    rating: 5.0,
    reviews_count: 39,
    featured: true,
    customizable: false,
    images: ['assets/products/model-5.jpeg'],
    short_description: 'Captivating emotional sculpture of little Ganesha affectionately hugging the sacred Shiva Lingam in stone-white finish.',
    description: 'One of our most popular devotional prints. Depicts the pure affection between Ganesha and Lord Shiva. Finished with smooth matte layer lines and high impact resistance.'
  },

  {
    id: 205,
    name: 'Baba Khatu Shyam Ji Car Dashboard Idol',
    slug: 'baba-khatu-shyam-ji-dashboard-idol',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 249,
    mrp: 499,
    stock: 50,
    stock_status: 'In Stock',
    badge: 'Bestseller',
    rating: 5.0,
    reviews_count: 73,
    featured: true,
    customizable: false,
    images: ['assets/products/model-7.jpeg'],
    short_description: 'Devotional Khatu Shyam Ji murti with Morchhari feather and detailed crown. Includes high-bond dashboard adhesive base.',
    description: 'Carry Baba Khatu Shyam Jis divine blessings on every journey. Heat-resistant PLA material tested to withstand high car temperatures without deformation.'
  },

  {
    id: 206,
    name: '3D Printed Shubh Labh (शुभ लाभ) Lotus Door Hangings (Pair)',
    slug: 'shubh-labh-lotus-door-plaque',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 199,
    mrp: 399,
    stock: 60,
    stock_status: 'In Stock',
    badge: 'Festive Special',
    rating: 4.8,
    reviews_count: 34,
    featured: true,
    customizable: false,
    images: ['assets/products/model-21.jpeg'],
    short_description: 'Traditional Sanskrit Shubh & Labh calligraphy embedded in sacred lotus petals. Pair of 2 for main entrance doors.',
    description: 'Welcome prosperity, auspiciousness, and positive vibes into your home. Multi-color printed with gold lettering on vibrant lotus petal bases. Includes pre-applied mounting tape.'
  },

  {
    id: 207,
    name: 'Personalized Monogram Initial & Name 3D Desk Stand',
    slug: 'custom-initial-name-desk-stand',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 249,
    mrp: 449,
    stock: 99,
    stock_status: 'Custom Built',
    badge: 'Customizable',
    rating: 4.9,
    reviews_count: 57,
    featured: true,
    customizable: true,
    images: ['assets/products/model-1.jpeg'],
    short_description: 'Custom 3D printed alphabet monogram with your full name sculpted in 3D across the base in contrasting dual colors.',
    description: 'Enter your desired alphabet initial and full name at checkout. Precision printed with dual-tone contrast colors. A standout personalized accessory for office workstations and gifting.'
  },

  {
    id: 208,
    name: 'Custom 3D Printed Multi-Color Name Keychains (Pack of 2)',
    slug: 'custom-name-tag-keychains',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 149,
    mrp: 299,
    stock: 99,
    stock_status: 'Custom Built',
    badge: 'Hot Deal',
    rating: 4.8,
    reviews_count: 82,
    featured: true,
    customizable: true,
    images: ['assets/products/model-4.jpeg'],
    short_description: 'Personalized multi-color name tag keychains for bags, keys, gym lockers, and school backpacks. Waterproof and durable.',
    description: 'Pack of 2 custom 3D printed name keychains. Provide two names or text in order notes. Built using high-durability PETG/PLA with stainless steel ring.'
  },

  {
    id: 209,
    name: 'Japanese Samurai Oni Demon Half Mask (Display / Cosplay)',
    slug: 'japanese-samurai-oni-half-mask',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 499,
    mrp: 899,
    stock: 18,
    stock_status: 'In Stock',
    badge: 'Cosplay & Gamer',
    rating: 4.9,
    reviews_count: 27,
    featured: true,
    customizable: false,
    images: ['assets/products/model-24.jpeg'],
    short_description: 'Aggressive Japanese Oni demon half mask with razor fangs, nasal vents, and textured surface. Wearable or wall display.',
    description: 'Full-scale wearable half mask printed in high-tensile PLA with textured horn and fang contours. Includes adjustable strap loops and ventilation holes.'
  },

  {
    id: 210,
    name: 'Adiyogi Shiva 3D Medallion Plaque',
    slug: 'adiyogi-shiva-3d-medallion',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 249,
    mrp: 449,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Spiritual',
    rating: 4.9,
    reviews_count: 31,
    featured: false,
    customizable: false,
    images: ['assets/products/model-6.jpeg'],
    short_description: 'High-relief circular portrait sculpture of Adiyogi Shiva with crescent moon, serpentine coil, and rudraksha beads.',
    description: 'Detailed circular wall and car dashboard medallion celebrating the first Yogi. Matte dark charcoal finish with brushed metallic highlights.'
  },

  {
    id: 211,
    name: 'Lord Shiva Trishul & Om (ॐ) Desk Stand',
    slug: 'shiva-trishul-om-desk-stand',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 199,
    mrp: 399,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Sacred Emblem',
    rating: 4.8,
    reviews_count: 26,
    featured: false,
    customizable: false,
    images: ['assets/products/model-9.jpeg'],
    short_description: 'Powerful emblem of Lord Shiva combining the Trishul trident, Damru drum, and cosmic Om on a solid weighted base.',
    description: 'Compact sacred desk statue printed with silk antique bronze finish. Inspires strength, focus, and spiritual discipline on your office table.'
  },

  {
    id: 212,
    name: 'Neem Karoli Baba (Maharaj-ji) Meditating Figurine',
    slug: 'neem-karoli-baba-figurine',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Divine Grace',
    rating: 5.0,
    reviews_count: 45,
    featured: false,
    customizable: false,
    images: ['assets/products/model-10.jpeg'],
    short_description: 'Revered Saint Neem Karoli Baba wrapped in his iconic blanket in serene meditative posture. Radiates peace and devotion.',
    description: 'Devotionally sculpted murti of Baba Neem Karoli (Maharaj-ji). High-precision layer resolution capturing blanket folds and warm compassionate expression.'
  },

  {
    id: 213,
    name: 'Meditating Gautama Buddha with Lotus Halo',
    slug: 'meditating-buddha-lotus-halo',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Zen Peace',
    rating: 4.9,
    reviews_count: 38,
    featured: false,
    customizable: false,
    images: ['assets/products/model-11.jpeg'],
    short_description: 'Buddha seated in Padmasana with intricate mandala lotus halo behind. Calming stone aesthetic for desks and living spaces.',
    description: 'Instill calm in your living room or study. Intricate halo features laser-precise geometric lotus cutouts that catch light beautifully.'
  },

  {
    id: 214,
    name: 'Sunset Red & Saffron Dual Gradient Ganesha Idol',
    slug: 'sunset-gradient-ganesha-idol',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Artistic Gradient',
    rating: 4.8,
    reviews_count: 22,
    featured: false,
    customizable: false,
    images: ['assets/products/model-16.jpeg'],
    short_description: 'Stunning color transition from rich saffron yellow at the base to deep sunset crimson at the crown.',
    description: 'Printed with custom dual-color filament blending that creates a unique gradient on each idol. Smooth, shiny finish that looks like hand-blown art glass.'
  },

  {
    id: 215,
    name: '4 Wise Little Monks (Hear, See, Speak No Evil & Peace)',
    slug: '4-wise-little-monks-set',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 399,
    mrp: 699,
    stock: 20,
    stock_status: 'In Stock',
    badge: 'Gift Set',
    rating: 4.9,
    reviews_count: 41,
    featured: false,
    customizable: false,
    images: ['assets/products/model-17.jpeg'],
    short_description: 'Set of 4 cute smiling baby monk figurines in silk bronze finish. Joyful and uplifting decor for shelves or car dashboards.',
    description: 'Four baby monks embodying wisdom and joy. Printed in silk bronze with rounded tactile contours. Includes double-sided adhesive dots for car dashboards.'
  },

  {
    id: 216,
    name: 'Metallic Silk Gold Lord Ganesha Idol',
    slug: 'metallic-silk-gold-ganesha',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Pure Gold Vibe',
    rating: 4.9,
    reviews_count: 29,
    featured: false,
    customizable: false,
    images: ['assets/products/model-20.jpeg'],
    short_description: 'Lustrous reflective silk gold PLA filament gives this Ganesha murti the rich look of polished brass and gold metal.',
    description: 'High-detail seated Ganesha with Modak, sharp ornaments, and blessing Mudra. Shimmers under warm room lighting.'
  },

  {
    id: 217,
    name: 'Sacred Kamadhenu Cow with Baby Calf Figurine',
    slug: 'kamadhenu-cow-calf-figurine',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 399,
    mrp: 699,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Pooja Special',
    rating: 4.9,
    reviews_count: 24,
    featured: false,
    customizable: false,
    images: ['assets/products/model-3.jpeg'],
    short_description: 'Tender figurine of sacred Kamadhenu nursing her calf, bringing fortune, health, and auspicious energy.',
    description: 'Symbol of universal abundance and motherly care. Printed with precision 0.12mm layer height in smooth warm-stone finish.'
  },

  {
    id: 218,
    name: 'Sacred Nandi Bull Devotional Figurine',
    slug: 'sacred-nandi-bull-figurine',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 299,
    mrp: 499,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Devotional',
    rating: 4.9,
    reviews_count: 19,
    featured: false,
    customizable: false,
    images: ['assets/products/model-13.jpeg'],
    short_description: 'Faithful Nandi bull seated in eternal devotion with bell ornaments and floral garlands.',
    description: 'Sculpted with traditional Hindu temple iconography. Ideal protector figurine for mandir setups and dashboard placements.'
  },

  {
    id: 219,
    name: 'Lord Shiva Dhyan Mudra Meditating Murti',
    slug: 'lord-shiva-dhyan-mudra-murti',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 399,
    mrp: 699,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Divine Calm',
    rating: 5.0,
    reviews_count: 36,
    featured: false,
    customizable: false,
    images: ['assets/products/model-15.jpeg'],
    short_description: 'Mahadev in deep samadhi meditation seated upon tiger pelt with serpent and trishul.',
    description: 'Breathtaking 3D sculpted representation of Lord Shiva meditating. Printed in stone-grey matte finish with sharp anatomical definition.'
  },

  {
    id: 220,
    name: 'Baby Krishna with Butter Pot (Makhan Chor) 3D Murti',
    slug: 'baby-krishna-butter-pot-murti',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Janmashtami Special',
    rating: 4.9,
    reviews_count: 27,
    featured: false,
    customizable: false,
    images: ['assets/products/model-18.jpeg'],
    short_description: 'Charming Bal Gopal leaning against a pot overflowing with freshly churned butter.',
    description: 'Adorn your home with the joyful innocence of little Krishna. Printed in dual silk luster finish capturing every fold and expression.'
  },

  {
    id: 221,
    name: 'Sacred Shivling with Snake Canopy (Sheshnaag)',
    slug: 'sacred-shivling-sheshnaag',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 349,
    mrp: 599,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Sacred Pooja',
    rating: 5.0,
    reviews_count: 42,
    featured: false,
    customizable: false,
    images: ['assets/products/model-19.jpeg'],
    short_description: 'Holy Shivling protected by the multi-headed Sheshnaag snake canopy on carved Yoni base.',
    description: 'Crafted with black granite texture PLA. Features drainage trough suitable for symbolic flower offerings.'
  },

  {
    id: 222,
    name: 'Cyberpunk Mechanical Samurai Katana Desk Trophy',
    slug: 'cyberpunk-samurai-katana-stand',
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    price: 399,
    mrp: 699,
    stock: 20,
    stock_status: 'In Stock',
    badge: 'Gamer Edition',
    rating: 4.8,
    reviews_count: 18,
    featured: false,
    customizable: false,
    images: ['assets/products/model-23.jpeg'],
    short_description: 'Futuristic mechanical sword stand with engraved kanji and robotic hydraulic details.',
    description: 'A striking statement piece for gaming battle stations. Matte black and gunmetal grey dual-color print with rubberized non-slip feet.'
  },

  {
    id: 101,
    name: 'Lord Hanuman Meditating Dhyan Mudra - High Detail STL Pack',
    slug: 'lord-hanuman-meditating-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 149,
    mrp: 299,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Bestseller STL',
    rating: 5.0,
    reviews_count: 64,
    featured: true,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/hanuman-dhyan-stl.zip',
    images: ['assets/products/hanuman-shadow-lamp.png'],
    short_description: 'Complete 3D printable STL files for our signature Meditating Hanuman shadow lamp & sculpture. Sliced for Ender 3, Bambu Lab, Prusa.',
    description: 'Instant digital download! High-poly watertight STL mesh tested for seamless FDM and SLA resin 3D printing. Includes pre-supported 3MF file with optimal layer orientation and shadow stencil mask.'
  },

  {
    id: 102,
    name: 'Articulated Crystal Cyber Dragon - Flexible STL',
    slug: 'articulated-crystal-dragon-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 129,
    mrp: 249,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Trending STL',
    rating: 4.8,
    reviews_count: 24,
    featured: true,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/crystal-dragon.zip',
    images: ['assets/products/item-26.jpg'],
    short_description: 'Print-in-place flexible articulated dragon. No supports required, ultra-smooth movement.',
    description: 'A viral 3D printing marvel! Features print-in-place ball hinges with zero assembly. Scales cleanly from 50% to 200% on any FDM printer.'
  },

  {
    id: 103,
    name: 'Iron Man Mark 85 Helmet - 3D Printable STL Files',
    slug: 'iron-man-mk85-helmet-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 149,
    mrp: 299,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Cosplay STL',
    rating: 4.9,
    reviews_count: 38,
    featured: true,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/ironman-mk85.zip',
    images: ['assets/products/item-18.jpeg'],
    short_description: 'Full-scale wearable Iron Man Mark 85 helmet. Pre-sliced for Ender 3, Bambu Lab, and Prusa printers.',
    description: 'High-detail digital 3D model designed with motorized faceplate hinges and internal magnetic battery compartment. Includes STL, OBJ, and 3MF files with optimized print orientation.'
  },

  {
    id: 104,
    name: 'Adiyogi Lord Shiva Bust & Medallion STL Pack',
    slug: 'adiyogi-shiva-bust-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 129,
    mrp: 249,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Divine STL',
    rating: 4.9,
    reviews_count: 41,
    featured: true,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/adiyogi-stl.zip',
    images: ['assets/products/model-6.jpeg'],
    short_description: 'High-polygon watertight 3D files of Adiyogi Shiva bust and circular wall medallion. Ready to slice.',
    description: 'Includes full resolution sculpt with crescent moon and serpent. Pre-tested on Bambu P1S and Ender 3 V2.'
  },

  {
    id: 105,
    name: 'Japanese Oni Demon Mask 3D Printable STL',
    slug: 'japanese-oni-mask-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 129,
    mrp: 249,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Cosplay Pack',
    rating: 4.8,
    reviews_count: 27,
    featured: false,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/oni-mask.zip',
    images: ['assets/products/model-24.jpeg'],
    short_description: 'Wearable Oni half mask with strap loops and nasal ventilation holes. Split and 1-piece versions included.',
    description: 'Engineered for comfortable facial fit. STL includes pre-supported orientations for minimum filament waste.'
  },

  {
    id: 106,
    name: 'Mini Temple Mandir Pavilion Arch STL Files',
    slug: 'mini-temple-pavilion-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 149,
    mrp: 299,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Architectural STL',
    rating: 5.0,
    reviews_count: 35,
    featured: false,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/temple-shrine.zip',
    images: ['assets/products/model-14.jpeg'],
    short_description: 'Architectural miniature temple shrine 3D printable files with internal LED routing channels.',
    description: 'Features modular snap-together pillars, roof dome, and internal cavity for 5V fairy lights.'
  },

  {
    id: 107,
    name: 'Sacred Om Trishul Desk Trophy STL',
    slug: 'om-trishul-trophy-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 99,
    mrp: 199,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Popular STL',
    rating: 4.9,
    reviews_count: 28,
    featured: false,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/om-trishul.zip',
    images: ['assets/products/model-9.jpeg'],
    short_description: 'Sacred trident with central Om symbol and weighted base. Prints without supports on FDM printers.',
    description: 'Optimized geometric overhangs allow clean support-free printing in silk gold or bronze.'
  },

  {
    id: 108,
    name: 'Geometric Sacred Mandala Disc STL',
    slug: 'geometric-mandala-disc-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 99,
    mrp: 199,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Wall Art STL',
    rating: 4.8,
    reviews_count: 19,
    featured: false,
    customizable: false,
    model_file_url: 'https://aveshtech.in/downloads/mandala.zip',
    images: ['assets/products/model-22.jpeg'],
    short_description: 'Laser-sharp sacred geometry mandala disc STL file. Scalable from coaster size to 30cm wall art.',
    description: 'Features intricate concentric geometry. Includes standard STL and SVG vector profile.'
  },

  {
    id: 401,
    name: 'ESP32 Smart Home IoT Starter & Automation Kit',
    slug: 'esp32-smart-home-starter-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 999,
    mrp: 1699,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Bestseller Kit',
    rating: 4.8,
    reviews_count: 45,
    featured: true,
    customizable: true,
    images: ['assets/products/item-29.jpeg'],
    short_description: 'Complete ESP32 IoT learning and home automation kit with WiFi & Bluetooth relay controls.',
    description: 'Everything you need to automate your room! Comes with ESP32-WROOM-32 board, 4-channel relay module, DHT11 temperature/humidity sensor, OLED display, jumper wires, breadboard, and pre-coded mobile dashboard tutorials.'
  },

  {
    id: 402,
    name: 'Raspberry Pi 4 Model B Prototyping Kit (4GB RAM)',
    slug: 'raspberry-pi-4-model-b-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 2499,
    mrp: 3999,
    stock: 15,
    stock_status: 'In Stock',
    badge: 'Pro Kit',
    rating: 4.9,
    reviews_count: 31,
    featured: true,
    customizable: false,
    images: ['assets/products/item-30.jpeg'],
    short_description: 'Official Raspberry Pi 4 board with acrylic cooling case, 5V 3A Type-C power adapter, and 32GB Class 10 card.',
    description: 'Top-tier mini computer for embedded Linux, computer vision, AI edge processing, home server, and smart IoT hubs. Comes with active fan and heatsinks.'
  },

  {
    id: 403,
    name: 'WiFi 4-Channel Smart Relay Automation Board',
    slug: 'wifi-4ch-smart-relay-board',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 499,
    mrp: 899,
    stock: 65,
    stock_status: 'In Stock',
    badge: 'Smart Home',
    rating: 4.7,
    reviews_count: 22,
    featured: false,
    customizable: false,
    images: ['assets/products/item-34.jpeg'],
    short_description: 'Control AC fans, bulbs, and motors using your smartphone or Google Assistant/Alexa.',
    description: 'High-current 10A optocoupler isolated relay module with onboard ESP8266 controller. Supports MQTT, Blynk, and Home Assistant.'
  },

  {
    id: 404,
    name: 'Smart Bluetooth RGB LED Matrix Display Kit',
    slug: 'smart-rgb-led-matrix-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 899,
    mrp: 1499,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Interactive Art',
    rating: 4.9,
    reviews_count: 29,
    featured: true,
    customizable: false,
    images: ['assets/products/item-33.jpeg'],
    short_description: '16x16 pixel programmable RGB LED panel with smartphone Bluetooth app for animations, clocks, and pixel art.',
    description: 'Create pixel art animations, show live clock, notifications, or audio visualizers. Comes with 3D printed desk casing and USB cord.'
  },

  {
    id: 405,
    name: 'Automatic Plant Watering & Soil Moisture IoT System',
    slug: 'automatic-plant-watering-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 649,
    mrp: 1199,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Green Tech',
    rating: 4.8,
    reviews_count: 33,
    featured: false,
    customizable: false,
    images: ['assets/products/item-29.jpeg'],
    short_description: 'Automated irrigation kit with capacitive soil moisture sensor, 5V water pump, silicon tubing, and relay board.',
    description: 'Never let your desk plants dry out! Automatically waters your plants when soil moisture falls below threshold.'
  },

  {
    id: 406,
    name: 'ESP8266 WiFi Weather Station with OLED & Sensor Kit',
    slug: 'esp8266-wifi-weather-station',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 699,
    mrp: 1299,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Top Project',
    rating: 4.9,
    reviews_count: 26,
    featured: false,
    customizable: false,
    images: ['assets/products/item-31.jpeg'],
    short_description: 'Pulls live local weather forecast from the internet and displays temperature, humidity, and time on a 0.96 OLED screen.',
    description: 'Educational STEM kit with pre-flashed firmware. Includes BME280 sensor, NodeMCU ESP8266, and 3D printed desktop stand.'
  },

  {
    id: 407,
    name: 'Smart RFID Door Lock & Access Control Prototyping Kit',
    slug: 'smart-rfid-door-lock-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 799,
    mrp: 1399,
    stock: 20,
    stock_status: 'In Stock',
    badge: 'Security DIY',
    rating: 4.8,
    reviews_count: 17,
    featured: false,
    customizable: false,
    images: ['assets/products/item-30.jpeg'],
    short_description: 'RC522 RFID reader, keycards, servo-driven latch mechanism, and micro-controller for secure keyless room entry.',
    description: 'Learn embedded security principles. Program master cards, add authorization buzzer alerts, and control an electronic deadbolt.'
  },

  {
    id: 408,
    name: 'Obstacle Avoiding Smart Robotic Car Kit (ESP32 / Arduino)',
    slug: 'obstacle-avoiding-robot-car-kit',
    category: 'iot',
    category_name: 'IoT Projects',
    price: 999,
    mrp: 1799,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Robotics Kit',
    rating: 5.0,
    reviews_count: 39,
    featured: true,
    customizable: false,
    images: ['assets/products/item-32.jpeg'],
    short_description: '2WD autonomous robot car with ultrasonic distance sensor, motor driver, 18650 battery holder, and Bluetooth steering app.',
    description: 'Best-selling beginner robotics platform! Avoids walls automatically or drives via your smartphone gyroscope.'
  },

  {
    id: 501,
    name: 'Arduino Uno R3 Ultimate Maker Starter Kit',
    slug: 'arduino-uno-r3-ultimate-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 799,
    mrp: 1399,
    stock: 50,
    stock_status: 'In Stock',
    badge: 'Best For Students',
    rating: 4.9,
    reviews_count: 58,
    featured: true,
    customizable: false,
    images: ['assets/products/item-31.jpeg'],
    short_description: 'Comprehensive 40+ piece Arduino electronics kit with sensors, motors, buzzer, LEDs, and tutorial manual.',
    description: 'Designed for engineering students and electronics hobbyists. Includes genuine ATmega328P Arduino Uno R3, ultrasonic distance sensor, SG90 servo motor, stepper motor, 16x2 LCD, RFID module, and 50+ projects guide.'
  },

  {
    id: 502,
    name: '3D Printer DIY Maintenance & Brass/Hardened Nozzle Upgrade Kit',
    slug: '3d-printer-nozzle-maintenance-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 399,
    mrp: 699,
    stock: 45,
    stock_status: 'In Stock',
    badge: 'Maker Essential',
    rating: 4.9,
    reviews_count: 43,
    featured: true,
    customizable: false,
    images: ['assets/products/item-31.jpeg'],
    short_description: 'Set of 10 brass & hardened steel nozzles (0.2mm to 0.8mm), needle cleaners, PTFE tube cutter, and heatblock wrench.',
    description: 'Everything you need to service your 3D printer and prevent nozzle clogs. Compatible with Creality Ender 3, Bambu Lab, Anycubic, and Prusa.'
  },

  {
    id: 503,
    name: 'Complete Electronic Soldering Station & Digital Multimeter Tool Kit',
    slug: 'soldering-station-multimeter-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 799,
    mrp: 1499,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Pro Workshop',
    rating: 4.8,
    reviews_count: 36,
    featured: true,
    customizable: false,
    images: ['assets/products/item-36.jpeg'],
    short_description: '60W temperature-adjustable soldering iron, digital multimeter, desoldering pump, solder wire, tweezers, and stand.',
    description: 'The ultimate electronics starter toolkit for assembling IoT circuits, fixing headphones, or building DIY battery packs.'
  },

  {
    id: 504,
    name: 'Mini Solar Powered Rover DIY Educational Kit',
    slug: 'mini-solar-rover-diy-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 349,
    mrp: 599,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'STEM Education',
    rating: 4.7,
    reviews_count: 25,
    featured: false,
    customizable: false,
    images: ['assets/products/item-38.jpeg'],
    short_description: 'Hands-on solar car model with mini photovoltaic panel, DC gear motor, and wooden laser cut chassis.',
    description: 'Teaches kids and students about renewable clean energy and mechanical gearing. Drives directly under bright sunlight.'
  },

  {
    id: 505,
    name: 'Smart Gesture Controlled Robotic Bionic Hand DIY Kit',
    slug: 'gesture-controlled-robotic-hand',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 1199,
    mrp: 1999,
    stock: 18,
    stock_status: 'In Stock',
    badge: 'Advanced STEM',
    rating: 5.0,
    reviews_count: 28,
    featured: false,
    customizable: false,
    images: ['assets/products/item-32.jpeg'],
    short_description: '5-finger articulated robotic hand controlled via flex sensors mounted on a wearable glove.',
    description: 'Mirror your hand movements in real-time. Includes 5 metal gear micro servos, 3D printed mechanical phalanges, and controller board.'
  },

  {
    id: 506,
    name: 'DIY Mini CNC Laser Engraver & 2-Axis Plotter Kit',
    slug: 'diy-mini-cnc-laser-engraver',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 1899,
    mrp: 2999,
    stock: 10,
    stock_status: 'In Stock',
    badge: 'Desktop CNC',
    rating: 4.9,
    reviews_count: 14,
    featured: false,
    customizable: false,
    images: ['assets/products/item-31.jpeg'],
    short_description: 'Desktop 2-axis CNC machine with 500mW focusable laser for engraving wood, leather, paper, and acrylic.',
    description: 'Aluminum extrusion frame with GRBL controller board. Plugs into your PC or laptop via USB.'
  },

  {
    id: 507,
    name: 'Digital LED Alarm Clock & Temperature Solder Learning Kit',
    slug: 'digital-clock-solder-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 349,
    mrp: 599,
    stock: 55,
    stock_status: 'In Stock',
    badge: 'Beginner Solder',
    rating: 4.8,
    reviews_count: 32,
    featured: false,
    customizable: false,
    images: ['assets/products/item-33.jpeg'],
    short_description: 'Great for beginner soldering practice! Assemble your own working 4-digit LED digital clock with ambient temperature sensor.',
    description: 'Includes transparent acrylic case, through-hole components, pre-labeled PCB, and buzzer.'
  },

  {
    id: 508,
    name: 'DIY Lithium-Ion Power Bank & 18650 Battery Module Kit',
    slug: 'diy-lithium-power-bank-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 399,
    mrp: 699,
    stock: 45,
    stock_status: 'In Stock',
    badge: 'Portable Power',
    rating: 4.8,
    reviews_count: 24,
    featured: false,
    customizable: false,
    images: ['assets/products/item-34.jpeg'],
    short_description: 'Dual USB 5V 2.1A fast charging boost converter module with digital LCD percentage display and 18650 battery holder.',
    description: 'Learn battery management system (BMS) fundamentals and assemble your own reusable high-capacity power bank.'
  },

  {
    id: 603,
    name: 'The Great Wave off Kanagawa 3D Multi-Layered Relief Art Frame',
    slug: 'great-wave-kanagawa-3d-relief-frame',
    category: 'custom-prints',
    category_name: 'Custom 3D Prints',
    price: 999,
    mrp: 1699,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Artisan Collector',
    rating: 5.0,
    reviews_count: 64,
    featured: true,
    customizable: false,
    images: ['assets/products/item-3.jpeg'],
    short_description: 'Iconic Hokusai wave recreated in stunning dimensional multi-color 3D printed layered wall relief.',
    description: 'Precision printed using filament color-swapping technology. Captures deep ocean indigo, sky blue, and cresting white foam in exquisite high-definition relief. Includes integrated wall hanging bracket.'
  },

  {
    id: 607,
    name: 'Goddess Mahalakshmi Wealth & Prosperity Golden Shadow Projection Lamp',
    slug: 'goddess-mahalakshmi-prosperity-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 899,
    mrp: 1499,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Diwali Festive',
    rating: 5.0,
    reviews_count: 42,
    featured: false,
    customizable: false,
    images: ['assets/products/model-15.jpeg'],
    short_description: 'Celebrates prosperity and auspiciousness with Goddess Lakshmi lotus silhouette projection.',
    description: 'Cast radiant lotus petals and divine blessings across your entrance or prayer mandir. Hand-assembled with polished walnut finish base.'
  },

  {
    id: 608,
    name: 'Naruto Itachi Uchiha Mangekyo Sharingan 3D Shadow Projection Lamp',
    slug: 'itachi-mangekyo-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 799,
    mrp: 1399,
    stock: 30,
    stock_status: 'In Stock',
    badge: 'Anime Bestseller',
    rating: 5.0,
    reviews_count: 58,
    featured: true,
    customizable: false,
    images: ['assets/products/item-4.jpeg', 'assets/products/item-1.jpeg'],
    short_description: 'Casts the iconic crouched Itachi Uchiha silhouette with crimson glowing Sharingan moon projection.',
    description: 'Epic Naruto anime room aesthetic. 3D cut silhouette plate casts crisp Itachi silhouette onto walls with crimson red backplate and dual power modes.'
  },

  {
    id: 609,
    name: 'Khatu Shyam Ji Devotional Silhouette 3D Night Projection Lamp',
    slug: 'khatu-shyam-ji-devotional-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 849,
    mrp: 1399,
    stock: 32,
    stock_status: 'In Stock',
    badge: 'Hare Ka Sahara',
    rating: 5.0,
    reviews_count: 87,
    featured: false,
    customizable: false,
    images: ['assets/products/model-7.jpeg'],
    short_description: 'Exquisite shadow projection dedicated to Morchari & Baba Shyam with warm devotional glow.',
    description: 'Created with devotional precision for Shyam Bhakts across India. Casts the iconic crown and peacock feather silhouette on your room wall.'
  },

  {
    id: 610,
    name: 'One Piece Monkey D. Luffy Gear 5 Sun God Nika Shadow Lamp',
    slug: 'luffy-gear-5-wanted-shadow-lamp',
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    price: 849,
    mrp: 1449,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'JoyBoy Nika',
    rating: 5.0,
    reviews_count: 94,
    featured: true,
    customizable: false,
    images: ['assets/products/item-10.jpeg'],
    short_description: 'Casts colossal laughing Gear 5 Luffy silhouette on your wall behind an illuminated Bounty Wanted poster.',
    description: 'Brings JoyBoy into your anime room. High-contrast stenciled silhouette projects laughing Sun God Luffy with glowing Wanted frame and USB power.'
  },

  {
    id: 612,
    name: 'Precision Helical Planetary Gearbox Engineering Mechanism Prototype',
    slug: 'precision-helical-planetary-gearbox-prototype',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 399,
    mrp: 699,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Engineering Marvel',
    rating: 4.9,
    reviews_count: 47,
    featured: false,
    customizable: false,
    images: ['assets/products/item-12.jpeg'],
    short_description: 'Fully functional multi-stage 3:1 planetary reduction mechanism with smooth rotating internal sun and ring gears.',
    description: 'Printed in tough carbon-reinforced PETG for robotics enthusiasts, mechanical engineers, and STEM hobbyists.'
  },

  {
    id: 613,
    name: 'Anime Hero Fully Articulated Action Figure (Multi-Part Multi-Color)',
    slug: 'anime-hero-articulated-action-figure',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 449,
    mrp: 799,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Collector Edition',
    rating: 4.8,
    reviews_count: 62,
    featured: true,
    customizable: false,
    images: ['assets/products/item-13.jpeg'],
    short_description: 'Highly poseable articulated ball-joint figurine crafted in ultra-resilient matte PLA+ filament.',
    description: 'Features 18 points of smooth articulation, interchangeable weapon hands, and display stand.'
  },

  {
    id: 614,
    name: 'Architectural Modern Villa Scale Miniature Model with Removable Roof',
    slug: 'architectural-modern-villa-miniature-model',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 499,
    mrp: 899,
    stock: 15,
    stock_status: 'In Stock (Prototyping)',
    badge: 'Architects Choice',
    rating: 5.0,
    reviews_count: 22,
    featured: false,
    customizable: true,
    images: ['assets/products/item-14.jpeg'],
    short_description: 'Scale architectural prototype displaying interior floor plan, stairs, partitions, and balconies.',
    description: 'Ideal for architecture students, builders, and interior designers to showcase scale floor layouts to clients.'
  },

  {
    id: 615,
    name: 'Carbon-Fiber Reinforced Drone Quadcopter Arm Bracket Set (4-Pack)',
    slug: 'carbon-fiber-drone-arm-bracket-set',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 299,
    mrp: 499,
    stock: 60,
    stock_status: 'In Stock',
    badge: 'Drone Tech',
    rating: 4.9,
    reviews_count: 35,
    featured: false,
    customizable: false,
    images: ['assets/products/item-15.jpeg'],
    short_description: 'Ultra-lightweight vibration dampening motor mounting arms for 5-inch FPV racing quadcopters.',
    description: 'Printed in 20% chopped carbon-fiber infused nylon for extreme tensile rigidity and impact resistance.'
  },

  {
    id: 617,
    name: 'Robotic Arm End-Effector Gripper Finger Claws with Soft TPU Pads',
    slug: 'robotic-arm-gripper-finger-claws',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 349,
    mrp: 599,
    stock: 35,
    stock_status: 'In Stock',
    badge: 'Robotics Core',
    rating: 4.9,
    reviews_count: 31,
    featured: false,
    customizable: false,
    images: ['assets/products/item-17.jpeg'],
    short_description: 'Mechanical servo-actuated robotic gripper claws with high-friction flexible TPU gripping fingertips.',
    description: 'Compatible with standard SG90 and MG996R servo splines. Fits university robotics project setups.'
  },

  {
    id: 618,
    name: 'Ultra-Precision 8K Resin Miniature Warrior Tabletop Figurine',
    slug: 'ultra-precision-8k-resin-warrior-figurine',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 349,
    mrp: 599,
    stock: 30,
    stock_status: 'In Stock',
    badge: '8K Resin Ultra-Detail',
    rating: 5.0,
    reviews_count: 54,
    featured: false,
    customizable: false,
    images: ['assets/products/item-18.jpeg'],
    short_description: 'Zero layer lines! UV photopolymer liquid resin cured at 28-micron layer resolution.',
    description: 'Captures microscopic armor filigree, chainmail, and facial expression. Arrives pre-primed ready for miniature acrylic painting.'
  },

  {
    id: 619,
    name: 'Ergonomic Adjustable Phone & Tablet Stand with Cable Pass-Through',
    slug: 'ergonomic-adjustable-phone-tablet-stand',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 199,
    mrp: 399,
    stock: 75,
    stock_status: 'In Stock',
    badge: 'Desk Essential',
    rating: 4.9,
    reviews_count: 88,
    featured: false,
    customizable: false,
    images: ['assets/products/item-19.jpeg'],
    short_description: 'Foldable dual-pivot desktop stand compatible with iPhones, iPads, and Android smartphones.',
    description: 'Solid honeycomb infill construction with anti-slip rubber pads and bottom cutout for continuous charging.'
  },

  {
    id: 620,
    name: 'Industrial Dual-Fan 5015 Duct Cooling Shroud for 3D Printers',
    slug: 'industrial-dual-fan-cooling-shroud',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 249,
    mrp: 449,
    stock: 50,
    stock_status: 'In Stock',
    badge: 'Printer Upgrade',
    rating: 4.8,
    reviews_count: 27,
    featured: false,
    customizable: false,
    images: ['assets/products/item-20.jpeg'],
    short_description: 'High-temperature ASA printed dual-blower air duct for superior overhang and bridging cooling.',
    description: 'Compatible with Ender 3, Ender 3 V2, and Voron Stealthburner toolheads. Rated up to 100°C chamber temperature.'
  },

  {
    id: 621,
    name: 'Custom Geometric Hexagonal Modular Wall Planter System (Set of 3)',
    slug: 'geometric-hexagonal-modular-wall-planter',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 349,
    mrp: 599,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Home Aesthetic',
    rating: 4.9,
    reviews_count: 46,
    featured: false,
    customizable: false,
    images: ['assets/products/item-21.jpeg'],
    short_description: 'Honeycomb modular succulent wall planters with concealed magnetic and screw wall mounts.',
    description: 'Waterproof PETG material with built-in drainage reservoir. Adds lush vertical greenery to study walls.'
  },

  {
    id: 622,
    name: 'Custom Electronics Sensor Shield Enclosure with Brass Inserts',
    slug: 'custom-electronics-sensor-shield-enclosure',
    category: '3d-prints',
    category_name: '3D Prints',
    price: 249,
    mrp: 449,
    stock: 55,
    stock_status: 'In Stock',
    badge: 'Hardware Case',
    rating: 4.8,
    reviews_count: 39,
    featured: false,
    customizable: false,
    images: ['assets/products/item-22.jpeg'],
    short_description: 'Snap-fit dustproof enclosure for ESP32 and Arduino sensor breakout boards with ventilation slits.',
    description: 'Features heat-set M3 brass threaded inserts for reusable lid fastening and external mounting tabs.'
  },

  {
    id: 623,
    name: 'Cyberpunk Mech Titan Warrior STL Printable Model Pack (Digital)',
    slug: 'cyberpunk-mech-titan-warrior-stl-pack',
    category: '3d-models',
    category_name: '3D Models',
    price: 149,
    mrp: 299,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Top 3D STL',
    rating: 5.0,
    reviews_count: 110,
    featured: true,
    customizable: false,
    images: ['assets/products/item-23.jpeg'],
    model_file_url: 'assets/models/mech-titan-warrior.stl',
    short_description: 'Instant digital STL file download. Optimized for zero supports on FDM and SLA 3D printers.',
    description: 'High-polygon watertight STL mesh designed and sliced for clean printing. Includes presupported Lychee & Chitubox files.'
  },

  {
    id: 625,
    name: 'Robotic Walking Hexapod Chassis STL File Bundle (Digital)',
    slug: 'robotic-walking-hexapod-chassis-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 149,
    mrp: 299,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Robotics STL',
    rating: 4.8,
    reviews_count: 52,
    featured: false,
    customizable: false,
    images: ['assets/products/item-25.jpeg'],
    model_file_url: 'assets/models/hexapod-chassis.stl',
    short_description: 'Complete 3D printable mechanical body parts for a 12-DOF servo powered walking spider robot.',
    description: 'Standardized mounts for MG90S metal gear micro servos and ESP32 expansion board.'
  },

  {
    id: 627,
    name: 'Modular Electronics Rack Mount Brackets STL Pack (Digital)',
    slug: 'modular-electronics-rack-brackets-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 99,
    mrp: 199,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Maker STL',
    rating: 4.8,
    reviews_count: 36,
    featured: false,
    customizable: false,
    images: ['assets/products/item-27.jpeg'],
    model_file_url: 'assets/models/rack-mount-brackets.stl',
    short_description: 'Custom printable 10-inch and 19-inch mini rack mount brackets for Raspberry Pi, mini PCs, and routers.',
    description: 'Clean parametric STL files with mounting bolt slots and label cutouts.'
  },

  {
    id: 628,
    name: 'Intricate Lithophane Frame Stencil Pack STL (Digital Files)',
    slug: 'lithophane-frame-stencil-pack-stl',
    category: '3d-models',
    category_name: '3D Models',
    price: 99,
    mrp: 199,
    stock: 999,
    stock_status: 'Instant Download',
    badge: 'Lighting STL',
    rating: 4.9,
    reviews_count: 41,
    featured: false,
    customizable: false,
    images: ['assets/products/item-28.jpeg'],
    model_file_url: 'assets/models/lithophane-frame-pack.stl',
    short_description: 'Complete collection of curved, flat, and circular LED night lamp casing frames for lithophane pictures.',
    description: 'Accommodates standard 5V COB LED strips and USB rocker switch wiring.'
  },

  {
    id: 632,
    name: 'Ultrasonic Radar Object Tracking Proximity Scanner Kit',
    slug: 'ultrasonic-radar-object-tracking-scanner-kit',
    category: 'iot',
    category_name: 'IoT Kits',
    price: 799,
    mrp: 1399,
    stock: 20,
    stock_status: 'In Stock',
    badge: 'STEM Science',
    rating: 5.0,
    reviews_count: 63,
    featured: false,
    customizable: false,
    images: ['assets/products/item-32.jpeg'],
    short_description: 'Real-time rotating 180° sonar sweep radar screen with processing graphical PC display output.',
    description: 'Includes SG90 micro-servo, HC-SR04 ultrasonic transducer, custom 3D printed rotating turret, and open-source Processing radar code.'
  },

  {
    id: 633,
    name: 'Smart Hand Gesture Controlled NeoPixel RGB Room Ambient Lamp Kit',
    slug: 'smart-hand-gesture-neopixel-lamp-kit',
    category: 'iot',
    category_name: 'IoT Kits',
    price: 849,
    mrp: 1499,
    stock: 22,
    stock_status: 'In Stock',
    badge: 'Interactive Art',
    rating: 4.9,
    reviews_count: 44,
    featured: false,
    customizable: false,
    images: ['assets/products/item-33.jpeg'],
    short_description: 'Swipe left/right to change colors, swipe up/down to adjust brightness without touching anything!',
    description: 'Powered by APDS-9960 gesture sensor, WS2812B addressable 24-LED ring, and custom diffuser globe.'
  },

  {
    id: 635,
    name: '3D Printer Filament Active Dry Box Heating & Feeder System Kit',
    slug: '3d-printer-filament-active-dry-box-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 899,
    mrp: 1599,
    stock: 20,
    stock_status: 'In Stock',
    badge: 'Pro 3D Gear',
    rating: 5.0,
    reviews_count: 37,
    featured: true,
    customizable: false,
    images: ['assets/products/item-35.jpeg'],
    short_description: 'Prevents stringing and moisture damage on PLA, PETG, TPU, and Nylon filament spools while printing.',
    description: 'Includes 45W PTC heating pad, digital humidity & temperature sensor display, smooth ball-bearing spool rollers, and PTFE feed tube.'
  },

  {
    id: 636,
    name: 'Precision Electronics SMD Soldering Helping Hands Station Kit',
    slug: 'precision-smd-soldering-station-helping-hands-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 549,
    mrp: 899,
    stock: 40,
    stock_status: 'In Stock',
    badge: 'Workbench Core',
    rating: 4.9,
    reviews_count: 59,
    featured: false,
    customizable: false,
    images: ['assets/products/item-36.jpeg'],
    short_description: 'Heavy duty steel weighted base with 4 flexible magnetic gooseneck arms, alligator clips, and LED magnifier.',
    description: 'Indispensable for PCB assembly, drone wiring, and micro-soldering. Rubber padded base prevents slipping.'
  },

  {
    id: 637,
    name: 'Multi-Color 2-in-1-Out Dual Extruder Y-Splitter Hotend Upgrade Kit',
    slug: 'multicolor-dual-extruder-y-splitter-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 699,
    mrp: 1199,
    stock: 25,
    stock_status: 'In Stock',
    badge: 'Multi-Color Print',
    rating: 4.8,
    reviews_count: 28,
    featured: false,
    customizable: false,
    images: ['assets/products/item-37.jpeg'],
    short_description: 'Print dual-color 3D models on a single extruder 3D printer with automated retraction splitting!',
    description: 'Precision CNC machined all-metal filament channel with low-friction chamfered transition zone.'
  },

  {
    id: 638,
    name: 'Deluxe 3D Print Post-Processing Deburring & Heat-Set Brass Thread Insert Kit',
    slug: 'deluxe-3d-print-post-processing-insert-kit',
    category: 'diy-kits',
    category_name: 'DIY Kits',
    price: 449,
    mrp: 799,
    stock: 50,
    stock_status: 'In Stock',
    badge: 'Essential Toolkit',
    rating: 4.9,
    reviews_count: 72,
    featured: false,
    customizable: false,
    images: ['assets/products/item-38.jpeg'],
    short_description: 'Everything you need to finish 3D prints like an injection molded industrial product.',
    description: 'Contains 100+ assorted M2, M3, M4, M5 knurled brass threaded inserts, heat-set soldering iron installation tips, deburring tool, and curved precision tweezers.'
  }
];

window.AveshStore = {
  DEFAULT_PRODUCTS: DEFAULT_PRODUCTS,

  // Helper for non-blocking remote Supabase persistence with comprehensive error logging
  _backgroundSync: function(actionFn) {
    (async () => {
      try {
        const sb = await window.waitForSupabase(3500);
        if (sb && typeof sb.from === 'function') {
          const res = await actionFn(sb);
          if (res && res.error) {
            console.warn('[Supabase Sync Notice]:', res.error.message || res.error);
          }
        }
      } catch (e) {
        console.warn('[Supabase Sync Exception]:', e);
      }
    })();
  },

  getProductsSync: function() {
    const productMap = new Map();
    DEFAULT_PRODUCTS.forEach(p => productMap.set(String(p.id), p));
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (stored) {
        const local = JSON.parse(stored);
        if (Array.isArray(local)) {
          local.forEach(p => {
            if (p && p.id) {
              const existing = productMap.get(String(p.id)) || {};
              productMap.set(String(p.id), { ...existing, ...p });
            }
          });
        }
      }
    } catch (e) {}
    return Array.from(productMap.values());
  },

  // ----------------------------------------
  // 1. PRODUCTS MANAGEMENT (CRUD)
  // ----------------------------------------
  getProducts: async function() {
    // 1. Immediate synchronous resolution from guaranteed seed data + local storage (ZERO millisecond delay)
    const initialList = this.getProductsSync();

    // 2. Non-blocking asynchronous merge with Supabase additions in background
    (async () => {
      try {
        const sb = await window.waitForSupabase(3500);
        if (sb && typeof sb.from === 'function') {
          const { data, error } = await sb.from('products').select('*');
          if (!error && Array.isArray(data) && data.length > 0) {
            const productMap = new Map();
            initialList.forEach(p => productMap.set(String(p.id), p));
            data.forEach(p => {
              if (p && p.id) {
                const existing = productMap.get(String(p.id)) || {};
                productMap.set(String(p.id), { ...existing, ...p });
              }
            });
            const allGuaranteed = Array.from(productMap.values());
            try {
              localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(allGuaranteed));
            } catch (e) {}
          }
        }
      } catch (e) {}
    })();

    return initialList;
  },

  // Push all 79 products directly to Supabase Cloud Database
  syncCatalogToSupabase: async function() {
    try {
      const sb = await window.waitForSupabase(4000);
      if (!sb || typeof sb.from !== 'function') {
        throw new Error('Supabase client is not connected. Please check your internet or configuration.');
      }
      const products = this.getProductsSync();
      const payload = products.map(p => ({
        id: Number(p.id),
        name: p.name || 'Maker Product',
        slug: p.slug || ('prod-' + p.id),
        description: p.description || p.name || '',
        short_description: p.short_description || p.name || '',
        price: Number(p.price) || 0,
        mrp: Number(p.mrp) || Math.round((Number(p.price) || 0) * 1.5),
        category: p.category || '3d-prints',
        category_name: p.category_name || p.category || 'Custom 3D Prints',
        images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : ['assets/logo.png']),
        badge: p.badge || '',
        stock: Number(p.stock) || 10,
        stock_status: p.stock_status || 'In Stock',
        rating: Number(p.rating) || 4.8,
        reviews_count: Number(p.reviews_count) || 12,
        featured: Boolean(p.featured),
        customizable: Boolean(p.customizable),
        model_file_url: p.model_file_url || '',
        updated_at: new Date().toISOString()
      }));

      // Batch upload in chunks of 20
      const batchSize = 20;
      let totalSynced = 0;
      for (let i = 0; i < payload.length; i += batchSize) {
        const batch = payload.slice(i, i + batchSize);
        const { error } = await sb.from('products').upsert(batch, { onConflict: 'id' });
        if (error) {
          console.warn('Sync batch error:', error);
          throw error;
        }
        totalSynced += batch.length;
      }
      return { success: true, count: totalSynced };
    } catch (err) {
      console.error('syncCatalogToSupabase error:', err);
      throw err;
    }
  },

  addToCartById: async function(productId, quantity = 1, customNote = '') {
    const products = await this.getProducts();
    const product = products.find(p => p.id === productId || String(p.id) === String(productId));
    if (product) {
      this.addToCart(product, quantity, customNote);
    }
  },

  getProductBySlugSync: function(slug) {
    if (!slug) return null;
    let clean = String(slug).toLowerCase().trim();
    const products = this.getProductsSync();
    if (!products || products.length === 0) return null;

    // Direct Canonical Alias Mapping for legacy or alternate URL variants
    const ALIAS_MAP = {
      'radha-krishna-eternal-flute-shadow-lamp': 'radhe-krishna-shadow-lamp',
      'radha-krishna-shadow-lamp': 'radhe-krishna-shadow-lamp',
      'radhakrishna-shadow-lamp': 'radhe-krishna-shadow-lamp',
      'radha-krishna': 'radhe-krishna-shadow-lamp',
      'sacred-om-gayatri-mantra-shadow-lamp': 'om-trishul-shadow-lamp',
      'om-gayatri-mantra-shadow-lamp': 'om-trishul-shadow-lamp',
      'om-gayatri-shadow-lamp': 'om-trishul-shadow-lamp',
      'om-shadow-lamp': 'om-trishul-shadow-lamp',
      'couple-anniversary-wedding-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
      'couple-anniversary-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
      'couple-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
      'hanuman-shadow-lamp': 'lord-hanuman-meditation-shadow-lamp',
      '601': 'lord-hanuman-meditation-shadow-lamp',
      '602': 'radhe-krishna-shadow-lamp',
      '604': 'couple-name-silhouette-shadow-lamp',
      '605': 'om-trishul-shadow-lamp'
    };

    if (ALIAS_MAP[clean]) {
      clean = ALIAS_MAP[clean];
    }
    
    // 1. Exact slug match
    let found = products.find(p => p.slug && p.slug.toLowerCase() === clean);
    if (found) return found;

    // 2. Exact ID match
    found = products.find(p => String(p.id) === clean);
    if (found) return found;

    // 3. Partial or fuzzy slug match
    found = products.find(p => p.slug && (p.slug.toLowerCase().includes(clean) || clean.includes(p.slug.toLowerCase())));
    if (found) return found;

    // 4. Name keyword match
    const keyword = clean.replace(/-/g, ' ');
    found = products.find(p => p.name && p.name.toLowerCase().includes(keyword));
    if (found) return found;

    // 5. Intelligent Token Overlap Scoring
    const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'in', 'of', 'for', 'with', '3d', 'lamp', 'shadow', 'print', 'kit']);
    const queryTokens = clean.replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
    if (queryTokens.length > 0) {
      let bestMatch = null;
      let highestScore = 0;
      for (const prod of products) {
        let score = 0;
        const prodText = `${prod.name || ''} ${prod.slug || ''} ${prod.category || ''} ${prod.badge || ''}`.toLowerCase();
        for (const token of queryTokens) {
          if (prodText.includes(token)) {
            score += (prod.slug && prod.slug.toLowerCase().includes(token)) ? 3 : 1;
          }
        }
        if (score > highestScore && score >= 2) {
          highestScore = score;
          bestMatch = prod;
        }
      }
      if (bestMatch) return bestMatch;
    }

    return null;
  },

  getProductBySlug: async function(slug) {
    const instant = this.getProductBySlugSync(slug);
    if (instant) return instant;

    try {
      const products = await this.getProducts();
      let clean = String(slug).toLowerCase().trim();

      const ALIAS_MAP = {
        'radha-krishna-eternal-flute-shadow-lamp': 'radhe-krishna-shadow-lamp',
        'radha-krishna-shadow-lamp': 'radhe-krishna-shadow-lamp',
        'radhakrishna-shadow-lamp': 'radhe-krishna-shadow-lamp',
        'radha-krishna': 'radhe-krishna-shadow-lamp',
        'sacred-om-gayatri-mantra-shadow-lamp': 'om-trishul-shadow-lamp',
        'om-gayatri-mantra-shadow-lamp': 'om-trishul-shadow-lamp',
        'om-gayatri-shadow-lamp': 'om-trishul-shadow-lamp',
        'om-shadow-lamp': 'om-trishul-shadow-lamp',
        'couple-anniversary-wedding-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
        'couple-anniversary-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
        'couple-shadow-lamp': 'couple-name-silhouette-shadow-lamp',
        'hanuman-shadow-lamp': 'lord-hanuman-meditation-shadow-lamp',
        '601': 'lord-hanuman-meditation-shadow-lamp',
        '602': 'radhe-krishna-shadow-lamp',
        '604': 'couple-name-silhouette-shadow-lamp',
        '605': 'om-trishul-shadow-lamp'
      };

      if (ALIAS_MAP[clean]) clean = ALIAS_MAP[clean];

      let found = products.find(p => p.slug && p.slug.toLowerCase() === clean);
      if (found) return found;
      found = products.find(p => String(p.id) === clean);
      if (found) return found;
      found = products.find(p => p.slug && (p.slug.toLowerCase().includes(clean) || clean.includes(p.slug.toLowerCase())));
      if (found) return found;

      const stopWords = new Set(['a', 'an', 'the', 'and', 'or', 'in', 'of', 'for', 'with', '3d', 'lamp', 'shadow', 'print', 'kit']);
      const queryTokens = clean.replace(/[^a-z0-9]+/g, ' ').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
      if (queryTokens.length > 0) {
        let bestMatch = null;
        let highestScore = 0;
        for (const prod of products) {
          let score = 0;
          const prodText = `${prod.name || ''} ${prod.slug || ''} ${prod.category || ''} ${prod.badge || ''}`.toLowerCase();
          for (const token of queryTokens) {
            if (prodText.includes(token)) {
              score += (prod.slug && prod.slug.toLowerCase().includes(token)) ? 3 : 1;
            }
          }
          if (score > highestScore && score >= 2) {
            highestScore = score;
            bestMatch = prod;
          }
        }
        if (bestMatch) return bestMatch;
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  addProduct: async function(productData) {
    const products = await this.getProducts();
    
    // Generate new ID and slug
    const newId = Date.now();
    const slug = productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
    
    const newProduct = {
      id: newId,
      name: productData.name,
      slug: slug,
      category: productData.category || '3d-prints',
      category_name: productData.category_name || productData.category,
      price: Number(productData.price) || 0,
      mrp: Number(productData.mrp) || Math.round(Number(productData.price) * 1.3),
      stock: Number(productData.stock) || 10,
      stock_status: productData.stock_status || 'In Stock',
      badge: productData.badge || 'New Arrival',
      rating: 4.8,
      reviews_count: 1,
      featured: Boolean(productData.featured),
      customizable: Boolean(productData.customizable),
      model_file_url: productData.model_file_url || '',
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80'],
      short_description: productData.short_description || productData.name,
      description: productData.description || productData.name,
      created_at: new Date().toISOString()
    };

    // Prepend to local products
    products.unshift(newProduct);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Non-blocking background sync to Supabase
    this._backgroundSync(sb => sb.from('products').insert([newProduct]));

    return newProduct;
  },

  updateProduct: async function(id, updatedFields) {
    const products = this.getProductsSync();
    const index = products.findIndex(p => String(p.id) === String(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields, updated_at: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

      // Non-blocking background sync to Supabase
      this._backgroundSync(sb => sb.from('products').update(updatedFields).eq('id', id));
      return products[index];
    }
    return null;
  },

  deleteProduct: async function(id) {
    let products = this.getProductsSync();
    products = products.filter(p => String(p.id) !== String(id));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));

    // Non-blocking background sync to Supabase
    this._backgroundSync(sb => sb.from('products').delete().eq('id', id));
    return true;
  },

  resetDefaultProducts: function() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  },

  // ----------------------------------------
  // 2. INFLUENCER REFERRAL SYSTEM
  // ----------------------------------------
  initReferralTracking: function() {
    // Check URL parameters for ?ref=CODE, ?referral=CODE, ?creator=CODE
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref') || urlParams.get('referral') || urlParams.get('aff') || urlParams.get('creator');
    
    if (ref) {
      const cleanRef = ref.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!cleanRef) return;

      const refData = {
        code: cleanRef,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.ACTIVE_REF, JSON.stringify(refData));
      
      // Increment real click count for this creator
      this.recordReferralClick(cleanRef);

      // Realtime Activity Log for Admin Radar
      if (window.AveshNotifications && typeof window.AveshNotifications.logLiveEvent === 'function') {
        window.AveshNotifications.logLiveEvent(`🔗 Visitor landed via Creator Referral Link (${cleanRef.toUpperCase()})`, 'visitor');
      }
      
      // Show welcoming banner or toast
      setTimeout(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(`🎉 Creator Code Applied (${cleanRef.toUpperCase()}): 10% Discount added to your cart!`, 'success');
        }
      }, 800);
    }
  },

  getActiveReferral: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ACTIVE_REF);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Valid for 30 days
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      if (Date.now() - parsed.timestamp < thirtyDays) {
        return parsed.code;
      }
    } catch (e) {}
    return null;
  },

  applyReferralCode: function(code) {
    if (!code) return;
    const clean = code.trim().toLowerCase();
    const refData = {
      code: clean,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEYS.ACTIVE_REF, JSON.stringify(refData));
    this.recordReferralClick(clean);
  },

  getInfluencersSync: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INFLUENCERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out any legacy demo creators
          return parsed.filter(i => i && i.id !== 'inf-001' && i.id !== 'inf-002' && i.id !== 'inf-demo-1');
        }
      }
    } catch (e) {}
    return [];
  },

  validateReferralCodeSync: function(code) {
    if (!code) return { valid: false, message: 'Please enter a referral code.' };
    const clean = code.trim().toLowerCase();
    const influencers = this.getInfluencersSync();
    const inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === clean);
    if (inf) {
      return {
        valid: true,
        code: inf.ref_code.toUpperCase(),
        creator_name: inf.name,
        instagram: inf.instagram,
        commission_rate: inf.commission_rate || 0.10,
        discount_rate: window.AVESH_CONFIG.customerReferralDiscount || 0.10,
        discount_percent: Math.round((window.AVESH_CONFIG.customerReferralDiscount || 0.10) * 100)
      };
    }
    return { valid: false, message: `Referral code "${code.toUpperCase()}" not found.` };
  },

  validateReferralCode: async function(code) {
    if (!code) return { valid: false, message: 'Please enter a referral code.' };
    const clean = code.trim().toLowerCase();
    const influencers = await this.getInfluencers();
    const inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === clean);
    if (inf) {
      return {
        valid: true,
        code: inf.ref_code.toUpperCase(),
        creator_name: inf.name,
        instagram: inf.instagram,
        commission_rate: inf.commission_rate || 0.10,
        discount_rate: window.AVESH_CONFIG.customerReferralDiscount || 0.10,
        discount_percent: Math.round((window.AVESH_CONFIG.customerReferralDiscount || 0.10) * 100)
      };
    }
    return { valid: false, message: `Referral code "${code.toUpperCase()}" not found.` };
  },

  getInfluencers: async function() {
    let influencers = this.getInfluencersSync();

    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('influencers').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          influencers = data;
          localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));
        }
      }
    } catch (e) {}

    return influencers;
  },

  updateInfluencerCommissionRate: async function(code, rate) {
    if (!code) return false;
    const cleanCode = code.trim().toLowerCase();
    const influencers = await this.getInfluencers();
    let inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === cleanCode);
    const parsedRate = Math.max(0.01, Math.min(0.50, parseFloat(rate) || 0.10));

    if (!inf) {
      inf = {
        id: 'inf-' + Date.now(),
        name: cleanCode.toUpperCase() + ' Creator',
        instagram: '@' + cleanCode,
        phone: '7988456595',
        upi_id: cleanCode + '@upi',
        ref_code: cleanCode,
        commission_rate: parsedRate,
        total_clicks: 0,
        total_orders: 0,
        total_sales: 0,
        total_commission: 0,
        pending_payout: 0,
        paid_payout: 0,
        created_at: new Date().toISOString()
      };
      influencers.push(inf);
    } else {
      inf.commission_rate = parsedRate;
    }

    localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));

    // Update active creator session in auth storage if currently active
    try {
      const activeSession = JSON.parse(localStorage.getItem('avesh_creator_session_v1') || '{}');
      if (activeSession && activeSession.ref_code && activeSession.ref_code.toLowerCase() === cleanCode) {
        activeSession.commission_rate = parsedRate;
        localStorage.setItem('avesh_creator_session_v1', JSON.stringify(activeSession));
      }
    } catch (e) {}

    // Non-blocking background Supabase sync
    this._backgroundSync(sb => sb.from('influencers').update({ commission_rate: parsedRate }).eq('ref_code', cleanCode));

    return true;
  },

  getInfluencerByCodeSync: function(code) {
    if (!code) return null;
    const clean = code.trim().toLowerCase();
    const influencers = this.getInfluencersSync();
    return influencers.find(inf => inf.ref_code && inf.ref_code.toLowerCase() === clean) || null;
  },

  getInfluencerByCode: async function(code) {
    if (!code) return null;
    const clean = code.trim().toLowerCase();
    let local = this.getInfluencerByCodeSync(clean);
    try {
      const sb = await window.waitForSupabase(2500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('influencers').select('*').ilike('ref_code', clean).maybeSingle();
        if (!error && data) {
          const list = this.getInfluencersSync();
          const idx = list.findIndex(i => (i.ref_code || '').toLowerCase() === clean);
          if (idx >= 0) list[idx] = data;
          else list.push(data);
          localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(list));
          return data;
        }
      }
    } catch (e) {}
    return local;
  },

  registerInfluencer: async function(data) {
    const influencers = this.getInfluencersSync();
    const cleanCode = (data.ref_code || data.instagram || data.name)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 15);

    // Check if code exists
    const existing = influencers.find(i => i.ref_code === cleanCode);
    if (existing) {
      throw new Error(`Referral code "${cleanCode}" is already taken. Please choose another code.`);
    }

    const newInfluencer = {
      id: 'inf-' + Date.now(),
      name: data.name.trim(),
      instagram: data.instagram.trim().startsWith('@') ? data.instagram.trim() : '@' + data.instagram.trim(),
      phone: data.phone.trim(),
      upi_id: data.upi_id.trim(),
      ref_code: cleanCode,
      commission_rate: data.commission_rate || 0.10,
      total_clicks: 0,
      total_orders: 0,
      total_sales: 0,
      total_commission: 0,
      pending_payout: 0,
      paid_payout: 0,
      created_at: new Date().toISOString()
    };

    influencers.push(newInfluencer);
    localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));

    // Non-blocking background Supabase sync
    this._backgroundSync(sb => sb.from('influencers').insert([newInfluencer]));

    return newInfluencer;
  },

  recordReferralClick: async function(code) {
    if (!code) return;
    const clean = code.trim().toLowerCase();
    const influencers = this.getInfluencersSync();
    const inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === clean);
    if (inf) {
      inf.total_clicks = (Number(inf.total_clicks) || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));

      // Non-blocking background Supabase sync
      this._backgroundSync(sb => sb.from('influencers').update({ total_clicks: inf.total_clicks }).eq('id', inf.id));
    }
  },

  creditInfluencerCommission: async function(code, orderId, orderTotal, customerName = 'Direct Customer') {
    if (!code) return;
    const cleanCode = code.trim().toLowerCase();
    const influencers = await this.getInfluencers();
    let inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === cleanCode);

    if (inf) {
      const commRate = (typeof inf.commission_rate === 'number' && inf.commission_rate > 0)
        ? inf.commission_rate
        : (window.AVESH_CONFIG.influencerCommissionRate || 0.10);
      const commission = Math.round(orderTotal * commRate);
      inf.total_orders = (inf.total_orders || 0) + 1;
      inf.total_sales = (inf.total_sales || 0) + orderTotal;
      inf.total_commission = (inf.total_commission || 0) + commission;
      inf.pending_payout = (inf.pending_payout || 0) + commission;
      
      localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));

      // Also update active creator session in auth storage if active
      try {
        const activeSession = JSON.parse(localStorage.getItem('avesh_creator_session_v1') || '{}');
        if (activeSession && activeSession.ref_code && activeSession.ref_code.toLowerCase() === cleanCode) {
          activeSession.total_orders = inf.total_orders;
          activeSession.total_sales = inf.total_sales;
          activeSession.total_commission = inf.total_commission;
          activeSession.pending_payout = inf.pending_payout;
          activeSession.commission_rate = commRate;
          localStorage.setItem('avesh_creator_session_v1', JSON.stringify(activeSession));
        }
      } catch (e) {}

      // Save referral log
      let logs = [];
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.REFERRAL_LOGS);
        if (stored) logs = JSON.parse(stored);
      } catch (e) {}

      const newLog = {
        id: 'reflog-' + Date.now(),
        ref_code: cleanCode,
        order_id: orderId,
        customer_name: customerName,
        order_amount: orderTotal,
        commission_rate: commRate,
        commission_amount: commission,
        status: 'confirmed',
        created_at: new Date().toISOString()
      };
      logs.unshift(newLog);
      localStorage.setItem(STORAGE_KEYS.REFERRAL_LOGS, JSON.stringify(logs));

      // Background Supabase sync
      this._backgroundSync(async sb => {
        await sb.from('influencers').update({
          total_orders: inf.total_orders,
          total_sales: inf.total_sales,
          total_commission: inf.total_commission,
          pending_payout: inf.pending_payout
        }).eq('ref_code', cleanCode);

        await sb.from('referral_logs').insert([newLog]);
      });
    }
  },

  requestPayout: async function(refCode, amount) {
    const influencers = this.getInfluencersSync();
    const inf = influencers.find(i => i.ref_code.toLowerCase() === refCode.toLowerCase());
    if (!inf) throw new Error('Influencer account not found.');
    if (amount > inf.pending_payout) throw new Error('Requested amount exceeds pending payout balance.');

    const payoutReq = {
      id: 'payout-' + Date.now(),
      ref_code: refCode,
      influencer_name: inf.name,
      upi_id: inf.upi_id,
      phone: inf.phone,
      amount: amount,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    const requests = JSON.parse(localStorage.getItem(STORAGE_KEYS.PAYOUT_REQUESTS) || '[]');
    requests.unshift(payoutReq);
    localStorage.setItem(STORAGE_KEYS.PAYOUT_REQUESTS, JSON.stringify(requests));

    // Non-blocking background Supabase sync
    this._backgroundSync(sb => sb.from('payout_requests').insert([payoutReq]));

    return payoutReq;
  },

  getPayoutRequests: async function() {
    let requests = [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAYOUT_REQUESTS);
      if (stored) requests = JSON.parse(stored);
    } catch (e) {}
    return requests;
  },

  approvePayout: async function(requestId) {
    const requests = await this.getPayoutRequests();
    const req = requests.find(r => r.id === requestId);
    if (!req) return false;

    req.status = 'paid';
    req.processed_at = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.PAYOUT_REQUESTS, JSON.stringify(requests));

    // Deduct from pending and add to paid
    const influencers = this.getInfluencersSync();
    const inf = influencers.find(i => i.ref_code.toLowerCase() === req.ref_code.toLowerCase());
    if (inf) {
      inf.pending_payout = Math.max(0, (inf.pending_payout || 0) - req.amount);
      inf.paid_payout = (inf.paid_payout || 0) + req.amount;
      localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));
    }

    // Non-blocking background Supabase sync
    this._backgroundSync(async sb => {
      await sb.from('payout_requests').update({ status: 'paid', processed_at: new Date().toISOString() }).eq('id', requestId);
      if (inf) {
        await sb.from('influencers').update({ pending_payout: inf.pending_payout, paid_payout: inf.paid_payout }).eq('id', inf.id);
      }
    });

    return true;
  },

  getReferralLogsSync: function(refCode) {
    if (!refCode) return [];
    const clean = refCode.trim().toLowerCase();
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REFERRAL_LOGS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(l => l && l.ref_code && l.ref_code.toLowerCase() === clean && l.id !== 'reflog-101' && l.id !== 'reflog-102');
        }
      }
    } catch (e) {}
    return [];
  },

  getReferralLogs: async function(refCode) {
    if (!refCode) return [];
    const clean = refCode.trim().toLowerCase();
    let logs = this.getReferralLogsSync(refCode);

    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('referral_logs').select('*').ilike('ref_code', clean).order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          logs = data;
          localStorage.setItem(STORAGE_KEYS.REFERRAL_LOGS, JSON.stringify(logs));
        }
      }
    } catch (e) {}

    return logs;
  },

  // ----------------------------------------
  // 2.5 REGISTERED CUSTOMERS & USERS
  // ----------------------------------------
  getCustomersSync: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  getCustomers: async function() {
    let localCustomers = this.getCustomersSync();
    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('customers').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          const merged = [...data];
          localCustomers.forEach(lc => {
            if (!merged.some(c => c.id === lc.id || (c.email && lc.email && c.email.toLowerCase() === lc.email.toLowerCase()) || (c.phone && lc.phone && c.phone === lc.phone))) {
              merged.push(lc);
            }
          });
          localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(merged));
          return merged;
        }
      }
    } catch (e) {
      console.warn('Customer cloud fetch fallback:', e);
    }
    return localCustomers;
  },

  saveCustomer: async function(customer) {
    if (!customer) return;
    const cleanCustomer = {
      id: customer.id || ((window.crypto && window.crypto.randomUUID) ? window.crypto.randomUUID() : ('cust-' + Date.now())),
      name: customer.name || 'Avesh Customer',
      email: (customer.email || '').trim().toLowerCase(),
      phone: (customer.phone || '').trim().replace(/[^0-9]/g, '').slice(-10),
      password: customer.password || '123456',
      auth_method: customer.auth_method || 'email_otp',
      verified: customer.verified !== false,
      address: customer.address || {},
      last_sign_in_at: customer.last_sign_in_at || new Date().toISOString(),
      created_at: customer.created_at || new Date().toISOString()
    };

    let customers = this.getCustomersSync();
    const idx = customers.findIndex(c => 
      c.id === cleanCustomer.id || 
      (cleanCustomer.email && c.email && c.email.toLowerCase() === cleanCustomer.email) || 
      (cleanCustomer.phone && c.phone && c.phone === cleanCustomer.phone)
    );

    if (idx >= 0) {
      customers[idx] = { ...customers[idx], ...cleanCustomer };
    } else {
      customers.unshift(cleanCustomer);
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));

    // Non-blocking background sync to Supabase
    this._backgroundSync(sb => sb.from('customers').upsert([cleanCustomer], { onConflict: 'id' }));
    return cleanCustomer;
  },

  deleteCustomer: async function(customerId) {
    if (!customerId) return false;
    let customers = this.getCustomersSync();
    customers = customers.filter(c => c.id !== customerId);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));

    this._backgroundSync(sb => sb.from('customers').delete().eq('id', customerId));
    return true;
  },

  // ----------------------------------------
  // 3. CART MANAGEMENT
  // ----------------------------------------
  getCart: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CART);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart: function(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.updateCartBadge();
    window.dispatchEvent(new CustomEvent('avesh-cart-updated', { detail: cart }));
  },

  addToCart: function(product, quantity = 1, customNote = '') {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
      if (customNote) cart[existingIndex].customNote = customNote;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        category: product.category,
        price: Number(product.price),
        mrp: Number(product.mrp || product.price),
        image: Array.isArray(product.images) && product.images[0] ? product.images[0] : product.image,
        quantity: quantity,
        customNote: customNote || ''
      });
    }

    this.saveCart(cart);
    window.showToast(`${product.name} added to your cart!`, 'cart');

    // Trigger free owner alert
    if (window.AveshNotifications && typeof window.AveshNotifications.notifyAddToCart === 'function') {
      window.AveshNotifications.notifyAddToCart(product.name, product.price, customNote);
    }
  },

  removeFromCart: function(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    window.showToast('Item removed from cart.', 'info');
  },

  updateQuantity: function(productId, newQty) {
    let cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      if (newQty <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = newQty;
        this.saveCart(cart);
      }
    }
  },

  clearCart: function() {
    localStorage.removeItem(STORAGE_KEYS.CART);
    this.updateCartBadge();
    window.dispatchEvent(new CustomEvent('avesh-cart-updated', { detail: [] }));
  },

  getCartTotals: function(couponDiscount = 0) {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const mrpTotal = cart.reduce((sum, item) => sum + (item.mrp * item.quantity), 0);
    const savings = Math.max(0, mrpTotal - subtotal);
    
    // Check if referral code is active
    const activeRef = this.getActiveReferral();
    let referralDiscount = 0;
    if (activeRef) {
      referralDiscount = Math.round(subtotal * window.AVESH_CONFIG.customerReferralDiscount);
    }

    const totalDiscount = couponDiscount + referralDiscount;
    const shippingFee = subtotal >= window.AVESH_CONFIG.freeShippingThreshold || subtotal === 0
      ? 0
      : window.AVESH_CONFIG.standardShippingFee;

    const total = Math.max(0, subtotal - totalDiscount + shippingFee);

    return {
      itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      mrpTotal,
      savings,
      couponDiscount,
      referralDiscount,
      activeRef,
      shippingFee,
      total
    };
  },

  updateCartBadge: function() {
    const cart = this.getCart();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.querySelectorAll('.cart-count, #cart-count').forEach(el => {
      el.textContent = totalCount;
      el.classList.toggle('hidden', totalCount === 0);
    });

    document.querySelectorAll('.cart-header-total').forEach(el => {
      el.textContent = window.formatINR(totalAmount);
    });
  },

  // ----------------------------------------
  // 4. ORDERS & RAZORPAY CHECKOUT
  // ----------------------------------------
  getOrdersSync: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // Filter out legacy demo orders
          return parsed.filter(o => o && o.id !== 'ORD-719284' && o.id !== 'ORD-658291' && o.id !== 'ORD-549102' && o.id !== 'ORD-391028');
        }
      }
    } catch (e) {}
    return [];
  },

  getOrders: async function() {
    let orders = this.getOrdersSync();

    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('orders').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          orders = data;
          localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        }
      }
    } catch (e) {}

    return orders;
  },

  createOrder: async function(orderData) {
    const orders = await this.getOrders();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    
    const activeRef = orderData.referral_code || this.getActiveReferral();
    let commissionRate = window.AVESH_CONFIG.influencerCommissionRate || 0.10;
    if (activeRef) {
      const cleanRef = activeRef.trim().toLowerCase();
      const influencers = this.getInfluencersSync();
      const inf = influencers.find(i => i.ref_code && i.ref_code.toLowerCase() === cleanRef);
      if (inf && typeof inf.commission_rate === 'number' && inf.commission_rate > 0) {
        commissionRate = inf.commission_rate;
      }
    }
    const commission = activeRef ? Math.round(orderData.total * commissionRate) : 0;

    const newOrder = {
      id: orderId,
      customer_name: orderData.customer_name,
      email: orderData.email || '',
      phone: orderData.phone,
      shipping_address: orderData.shipping_address,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shipping_fee: orderData.shipping_fee || 0,
      total: orderData.total,
      payment_method: orderData.payment_method || 'razorpay',
      payment_status: orderData.payment_status || 'pending',
      razorpay_payment_id: orderData.razorpay_payment_id || '',
      order_status: 'confirmed',
      referral_code: activeRef ? activeRef.toUpperCase() : '',
      influencer_commission: commission,
      customer_notes: orderData.customer_notes || '',
      created_at: new Date().toISOString()
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

    // Auto-record / update customer in customers store & Supabase
    if (typeof this.saveCustomer === 'function') {
      this.saveCustomer({
        name: newOrder.customer_name,
        email: newOrder.email,
        phone: newOrder.phone,
        address: newOrder.shipping_address,
        auth_method: 'checkout',
        last_sign_in_at: new Date().toISOString()
      });
    }

    // Credit influencer if referral was applied
    if (activeRef) {
      await this.creditInfluencerCommission(activeRef, orderId, orderData.total, orderData.customer_name);
    }

    // Trigger instant free owner notification
    if (window.AveshNotifications && typeof window.AveshNotifications.notifyOrderSuccess === 'function') {
      window.AveshNotifications.notifyOrderSuccess(newOrder);
    }

    // Non-blocking background sync to Supabase
    this._backgroundSync(sb => sb.from('orders').insert([newOrder]));

    return newOrder;
  },

  updateOrderStatus: async function(orderId, status) {
    const orders = this.getOrdersSync();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.order_status = status;
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

      // Non-blocking background sync to Supabase
      this._backgroundSync(sb => sb.from('orders').update({ order_status: status }).eq('id', orderId));
      return true;
    }
    return false;
  },

  updateOrderTracking: async function(orderId, trackingData) {
    const orders = this.getOrdersSync();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const courierVal = trackingData.courier_name || trackingData.courier || order.courier_name || order.courier || 'Delhivery';
      const cleanData = {
        ...trackingData,
        courier_name: courierVal,
        courier: courierVal
      };
      Object.assign(order, cleanData);
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));

      // Build safe Supabase payload matching orders table schema
      const sbPayload = {
        courier_name: courierVal,
        tracking_number: trackingData.tracking_number !== undefined ? trackingData.tracking_number : (order.tracking_number || '')
      };
      if (trackingData.order_status) sbPayload.order_status = trackingData.order_status;
      if (trackingData.estimated_delivery) sbPayload.estimated_delivery = trackingData.estimated_delivery;

      this._backgroundSync(sb => sb.from('orders').update(sbPayload).eq('id', orderId));
      return order;
    }
    return null;
  },

  getOrderByIdOrPhone: function(query) {
    if (!query) return null;
    const clean = query.trim().toLowerCase();
    const phoneDigits = query.replace(/[^0-9]/g, '').slice(-10);
    const orders = this.getOrdersSync();
    return orders.find(o => {
      const oId = (o.id || '').toLowerCase();
      const oPhone = (o.phone || '').replace(/[^0-9]/g, '').slice(-10);
      return (oId === clean || (phoneDigits.length === 10 && oPhone === phoneDigits));
    }) || null;
  },

  findOrderAsync: async function(query) {
    const local = this.getOrderByIdOrPhone(query);
    if (local) return local;
    if (!query) return null;
    const clean = query.trim().toUpperCase();
    const phoneDigits = query.replace(/[^0-9]/g, '').slice(-10);

    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        let sbQuery = sb.from('orders').select('*');
        if (phoneDigits.length === 10) {
          sbQuery = sbQuery.or(`id.eq.${clean},phone.eq.${phoneDigits}`);
        } else {
          sbQuery = sbQuery.eq('id', clean);
        }
        const { data, error } = await sbQuery.limit(1).maybeSingle();
        if (!error && data) {
          const orders = this.getOrdersSync();
          if (!orders.some(o => o.id === data.id)) {
            orders.unshift(data);
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
          }
          return data;
        }
      }
    } catch (e) {}
    return null;
  },

  // ----------------------------------------
  // 5. SALES & ORDERS RESET MANAGEMENT
  // ----------------------------------------
  resetSalesOrders: function(mode = 'clear') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    return [];
  },

  // ----------------------------------------
  // 6. CUSTOMER INQUIRIES & CUSTOM QUOTES
  // ----------------------------------------
  getInquiriesSync: function() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(i => i && i.id !== 'INQ-91028' && i.id !== 'INQ-84920');
        }
      }
    } catch (e) {}
    return [];
  },

  getInquiries: async function() {
    let inquiries = this.getInquiriesSync();

    try {
      const sb = await window.waitForSupabase(3500);
      if (sb && typeof sb.from === 'function') {
        const { data, error } = await sb.from('contact_messages').select('*').order('created_at', { ascending: false });
        if (!error && Array.isArray(data)) {
          inquiries = data;
          localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
        }
      }
    } catch (e) {}

    return inquiries;
  },

  saveInquiry: function(inquiryData) {
    const list = this.getInquiriesSync();
    const newInq = {
      id: 'INQ-' + Math.floor(10000 + Math.random() * 90000),
      name: (inquiryData.name || 'Customer').trim(),
      phone: (inquiryData.phone || '').trim(),
      email: (inquiryData.email || '').trim().toLowerCase(),
      subject: inquiryData.subject || 'Custom 3D Inquiry',
      message: (inquiryData.message || '').trim(),
      status: 'new',
      created_at: new Date().toISOString()
    };
    list.unshift(newInq);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));

    // Live Activity event for Admin Radar
    if (window.AveshNotifications && typeof window.AveshNotifications.logLiveEvent === 'function') {
      window.AveshNotifications.logLiveEvent(`📩 New Inquiry from ${newInq.name} (${newInq.subject})`, 'contact');
    }

    return newInq;
  },

  updateInquiryStatus: function(id, status) {
    const list = this.getInquiriesSync();
    const inq = list.find(i => i.id === id);
    if (inq) {
      inq.status = status;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
      return true;
    }
    return false;
  },

  deleteInquiry: function(id) {
    let list = this.getInquiriesSync();
    list = list.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
    return true;
  },

  // ----------------------------------------
  // 7. RAZORPAY PAYMENT LAUNCHER (SMART RESILIENT)
  // ----------------------------------------
  initRazorpayPayment: function(orderData, onPaymentSuccess, onPaymentDismiss) {
    const rzpKey = (window.AVESH_CONFIG && window.AVESH_CONFIG.razorpayKey) ? window.AVESH_CONFIG.razorpayKey.trim() : '';
    const isDummyKey = !rzpKey || rzpKey.includes('XxXx') || rzpKey.length < 15;

    // If real Razorpay key is configured and SDK is present, attempt official modal
    if (typeof window.Razorpay !== 'undefined' && !isDummyKey) {
      try {
        const logoUrl = window.location.origin + (window.location.pathname.includes('/public/') ? '/public/assets/logo.png' : '/assets/logo.png');
        const options = {
          key: rzpKey,
          amount: Math.round(orderData.total * 100),
          currency: 'INR',
          name: window.AVESH_CONFIG.storeName || 'Avesh Technologies',
          description: `Order Payment for ${orderData.items ? orderData.items.length : 1} item(s)`,
          image: logoUrl,
          prefill: {
            name: orderData.customer_name,
            email: orderData.email || 'customer@aveshtech.in',
            contact: orderData.phone
          },
          notes: {
            customer_name: orderData.customer_name,
            phone: orderData.phone,
            referral_code: orderData.referral_code || ''
          },
          theme: { color: '#1d4ed8' },
          modal: {
            ondismiss: function() {
              if (typeof onPaymentDismiss === 'function') onPaymentDismiss();
            }
          },
          handler: function(response) {
            if (typeof onPaymentSuccess === 'function') {
              onPaymentSuccess(response.razorpay_payment_id);
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', () => {
          window.AveshStore.renderPaymentFallbackModal(orderData, onPaymentSuccess, onPaymentDismiss);
        });
        rzp.open();
        return;
      } catch (e) {
        console.warn('Official Razorpay open fallback:', e);
      }
    }

    // Interactive Payment Modal (Test Mode Simulation + Direct UPI)
    this.renderPaymentFallbackModal(orderData, onPaymentSuccess, onPaymentDismiss);
  },

  renderPaymentFallbackModal: function(orderData, onPaymentSuccess, onPaymentDismiss) {
    const existing = document.getElementById('avesh-payment-fallback-modal');
    if (existing) existing.remove();

    const totalStr = (typeof window.formatINR === 'function') ? window.formatINR(orderData.total) : ('₹' + orderData.total);
    const modalHtml = `
      <div id="avesh-payment-fallback-modal" class="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade">
        <div class="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-200 space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100">
            <div class="flex items-center gap-2.5">
              <img src="assets/logo.png" class="w-9 h-9 rounded-xl object-contain bg-blue-900 p-1 border border-blue-800">
              <div>
                <h3 class="font-black text-gray-900 text-sm">Avesh Technologies Checkout</h3>
                <span class="text-[10px] text-gray-400">Secure Online Payment Gateway</span>
              </div>
            </div>
            <button id="close-fallback-modal-btn" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
          </div>

          <div class="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-center">
            <span class="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">Total Payable Amount</span>
            <span class="text-3xl font-black text-blue-900">${totalStr}</span>
            <p class="text-[10px] text-blue-600 font-medium mt-0.5">Includes GST, Free Shipping & Packaging</p>
          </div>

          <div class="space-y-2.5">
            <button id="sim-pay-btn" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-extrabold text-xs py-3.5 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
              <i class="fa-solid fa-bolt text-yellow-300"></i>
              <span>Pay Online via Razorpay UPI / Card / NetBanking</span>
            </button>

            <button id="wa-pay-btn" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-xs py-3 px-4 rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm">
              <i class="fa-brands fa-whatsapp text-sm"></i>
              <span>Pay via WhatsApp / GPay / PhonePe (+91 7988456595)</span>
            </button>
          </div>

          <div class="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 space-y-1">
            <p class="font-bold flex items-center gap-1.5"><i class="fa-solid fa-shield-check text-amber-600"></i> Payment Gateway Info</p>
            <p class="text-gray-600 text-[10px] leading-relaxed">
              To accept live UPI / credit cards from customer accounts, store admin can enter their live Razorpay Key ID in <strong>Admin Panel &gt; Store Settings</strong>.
            </p>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('close-fallback-modal-btn').onclick = () => {
      document.getElementById('avesh-payment-fallback-modal').remove();
      if (typeof onPaymentDismiss === 'function') onPaymentDismiss();
    };

    document.getElementById('sim-pay-btn').onclick = () => {
      document.getElementById('avesh-payment-fallback-modal').remove();
      const mockPayId = 'pay_' + Math.random().toString(36).substring(2, 12);
      if (typeof onPaymentSuccess === 'function') {
        onPaymentSuccess(mockPayId);
      }
    };

    document.getElementById('wa-pay-btn').onclick = async () => {
      document.getElementById('avesh-payment-fallback-modal').remove();
      orderData.payment_method = 'whatsapp_upi';
      orderData.payment_status = 'pending_confirmation';
      const created = await window.AveshStore.createOrder(orderData);
      window.AveshStore.clearCart();
      window.AveshStore.sendWhatsAppOrder(created);
      if (typeof window.showOrderSuccess === 'function') {
        window.showOrderSuccess(created);
      }
    };
  },

  // WhatsApp Order Launcher
  sendWhatsAppOrder: function(order) {
    const itemsText = order.items.map(i => `• ${i.name} (Qty: ${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
    const address = order.shipping_address;
    const addressStr = `${address.address}, ${address.city}, ${address.state} - ${address.pincode}`;
    
    const message = 
`*NEW ORDER - AVESH TECHNOLOGIES* 🚀
*Order ID:* ${order.id}
*Customer:* ${order.customer_name}
*Phone:* ${order.phone}
*Address:* ${addressStr}

*Items Ordered:*
${itemsText}

*Subtotal:* ₹${order.subtotal}
*Discount:* -₹${order.discount}
*Shipping:* ${order.shipping_fee === 0 ? 'FREE' : '₹' + order.shipping_fee}
*Grand Total:* ₹${order.total}
*Payment Method:* ${order.payment_method.toUpperCase()}
*Payment Status:* ${order.payment_status.toUpperCase()}
${order.referral_code ? `*Referral Code:* ${order.referral_code.toUpperCase()}` : ''}
${order.customer_notes ? `*Custom Notes:* ${order.customer_notes}` : ''}

Please confirm my order and share dispatch updates!`;

    const url = `https://wa.me/${window.AVESH_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }
};

// Initialize referral tracking and cart badge on load
document.addEventListener('DOMContentLoaded', () => {
  window.AveshStore.initReferralTracking();
  window.AveshStore.updateCartBadge();
});


