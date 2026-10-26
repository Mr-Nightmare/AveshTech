// products.js - Product listing and filtering

// Demo/fallback products (used when Supabase is not configured or has no data)
const DEMO_PRODUCTS = [
  {
    id: 1,
    name: 'Iron Man Mark 85 Helmet - 3D Model',
    slug: 'iron-man-mk85-helmet',
    description: 'Highly detailed 3D printable Iron Man Mark 85 helmet. Includes STL and OBJ files with support structures.',
    price: 499,
    original_price: 799,
    category: '3d-models',
    category_name: '3D Models',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Iron+Man+Helmet'],
    featured: true,
    stock: 999
  },
  {
    id: 2,
    name: 'Custom Name Shadow Lamp',
    slug: 'custom-name-shadow-lamp',
    description: 'Personalized 3D shadow lamp that projects your name or custom text. Perfect gift for birthdays and anniversaries.',
    price: 899,
    original_price: null,
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Shadow+Lamp'],
    featured: true,
    stock: 50
  },
  {
    id: 3,
    name: 'ESP32 Development Board',
    slug: 'esp32-dev-board',
    description: 'ESP32 WiFi + Bluetooth development board. Perfect for IoT projects, home automation, and prototyping.',
    price: 349,
    original_price: 449,
    category: 'iot',
    category_name: 'IoT Products',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=ESP32+Board'],
    featured: true,
    stock: 100
  },
  {
    id: 4,
    name: 'Baby Groot Planter - 3D Printed',
    slug: 'baby-groot-planter',
    description: 'Adorable Baby Groot planter, 3D printed with high quality PLA. Perfect for succulents and small plants.',
    price: 599,
    original_price: null,
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Groot+Planter'],
    featured: true,
    stock: 25
  },
  {
    id: 5,
    name: 'Dragon Ball Z Goku Figure',
    slug: 'goku-figure-3d',
    description: 'Hand-painted 3D printed Goku figure in iconic Kamehameha pose. Premium PLA with acrylic paint finish.',
    price: 1299,
    original_price: 1599,
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Goku+Figure'],
    featured: false,
    stock: 15
  },
  {
    id: 6,
    name: 'Couple Shadow Lamp - Heart Design',
    slug: 'couple-shadow-lamp-heart',
    description: 'Romantic couple shadow lamp with heart design. Projects beautiful shadow art on your wall. USB powered.',
    price: 999,
    original_price: 1299,
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Couple+Lamp'],
    featured: false,
    stock: 30
  },
  {
    id: 7,
    name: 'Arduino Uno R3 Starter Kit',
    slug: 'arduino-uno-starter-kit',
    description: 'Complete Arduino Uno R3 starter kit with breadboard, jumper wires, LEDs, resistors, sensors, and tutorial booklet.',
    price: 1499,
    original_price: 1999,
    category: 'iot',
    category_name: 'IoT Products',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Arduino+Kit'],
    featured: true,
    stock: 40
  },
  {
    id: 8,
    name: 'Mandalorian Helmet - STL File',
    slug: 'mandalorian-helmet-stl',
    description: 'Full-size wearable Mandalorian helmet 3D model. Optimized for FDM printing with minimal supports.',
    price: 399,
    original_price: null,
    category: '3d-models',
    category_name: '3D Models',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Mando+Helmet'],
    featured: false,
    stock: 999
  },
  {
    id: 9,
    name: 'Smart Home Relay Module 4-Channel',
    slug: 'smart-relay-4ch',
    description: '4-Channel WiFi smart relay module. Control your appliances remotely via app. Works with ESP8266/ESP32.',
    price: 549,
    original_price: 699,
    category: 'iot',
    category_name: 'IoT Products',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Relay+Module'],
    featured: false,
    stock: 60
  },
  {
    id: 10,
    name: 'Photo Shadow Lamp - Custom',
    slug: 'photo-shadow-lamp-custom',
    description: 'Upload your photo and get a custom shadow lamp. We convert any photo into stunning shadow art. LED included.',
    price: 1199,
    original_price: 1499,
    category: 'shadow-lamps',
    category_name: 'Shadow Lamps',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Photo+Lamp'],
    featured: true,
    stock: 20
  },
  {
    id: 11,
    name: 'Pikachu Desk Buddy - 3D Printed',
    slug: 'pikachu-desk-buddy',
    description: 'Cute Pikachu desk buddy with phone holder feature. 3D printed and hand-painted with premium finish.',
    price: 449,
    original_price: null,
    category: '3d-prints',
    category_name: 'Custom 3D Prints',
    images: ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Pikachu'],
    featured: false,
    stock: 35
  },
  {
    id: 12,
    name: 'Raspberry Pi Pico W',
    slug: 'raspberry-pi-pico-w',
    description: 'Raspberry Pi Pico W with WiFi. Compact and powerful microcontroller for IoT and embedded projects.',
    price: 649,
    original_price: null,
    category: 'iot',
    category_name: 'IoT Products',
    images: ['https://placehold.co/600x600/1a1a2e/06b6d4?text=Pi+Pico+W'],
    featured: false,
    stock: 75
  }
];

// Fetch products from Supabase or fall back to demo data
async function fetchProducts(options = {}) {
  const { category, featured, limit, offset = 0, sort } = options;
  
  try {
    const sb = await waitForSupabase();
    let query = sb.from('products').select('*');
    
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    if (featured) {
      query = query.eq('featured', true);
    }
    if (sort === 'price-asc') {
      query = query.order('price', { ascending: true });
    } else if (sort === 'price-desc') {
      query = query.order('price', { ascending: false });
    } else if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
    }
    if (limit) {
      query = query.range(offset, offset + limit - 1);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    if (data && data.length > 0) return data;
    // Fall back to demo data if no products in Supabase
    return filterDemoProducts(options);
  } catch (e) {
    console.log('Using demo products:', e.message);
    return filterDemoProducts(options);
  }
}

function filterDemoProducts(options = {}) {
  let products = [...DEMO_PRODUCTS];
  const { category, featured, limit, offset = 0, sort } = options;
  
  if (category && category !== 'all') {
    products = products.filter(p => p.category === category);
  }
  if (featured) {
    products = products.filter(p => p.featured);
  }
  if (sort === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === 'newest') {
    products.sort((a, b) => b.id - a.id);
  }
  if (limit) {
    products = products.slice(offset, offset + limit);
  }
  return products;
}

// Fetch single product by slug
async function fetchProductBySlug(slug) {
  try {
    const sb = await waitForSupabase();
    const { data, error } = await sb.from('products').select('*').eq('slug', slug).single();
    if (error) throw error;
    if (data) return data;
    return DEMO_PRODUCTS.find(p => p.slug === slug) || null;
  } catch (e) {
    console.log('Using demo product:', e.message);
    return DEMO_PRODUCTS.find(p => p.slug === slug) || null;
  }
}

// Render a product card
function renderProductCard(product) {
  const image = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : 'https://placehold.co/600x600/1a1a2e/8b5cf6?text=Product';
  
  const categoryNames = {
    '3d-models': '3D Models',
    '3d-prints': 'Custom 3D Prints',
    'shadow-lamps': 'Shadow Lamps',
    'iot': 'IoT Products'
  };
  
  const priceHTML = product.original_price
    ? `<span class="text-lg font-bold text-purple-400">₹${product.price}</span>
       <span class="text-sm text-gray-500 line-through ml-2">₹${product.original_price}</span>`
    : `<span class="text-lg font-bold text-purple-400">₹${product.price}</span>`;

  const card = document.createElement('div');
  card.className = 'product-card bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden';
  card.innerHTML = `
    <a href="/product-detail.html?slug=${product.slug}" class="block">
      <div class="aspect-square bg-gray-800 overflow-hidden">
        <img src="${image}" alt="${product.name}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy">
      </div>
    </a>
    <div class="p-4">
      <span class="text-xs text-purple-400 uppercase tracking-wider">${product.category_name || categoryNames[product.category] || product.category}</span>
      <a href="/product-detail.html?slug=${product.slug}">
        <h3 class="text-white font-semibold mt-1 line-clamp-2 hover:text-purple-400 transition">${product.name}</h3>
      </a>
      <p class="text-gray-400 text-sm mt-1 line-clamp-2">${product.description}</p>
      <div class="flex items-center justify-between mt-3">
        <div>${priceHTML}</div>
        <button onclick="addToCartQuick(${product.id}, '${product.name.replace(/'/g, "\\'")}', '${product.slug}', ${product.price}, '${image}', '${product.category}')" 
          class="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  `;
  return card;
}

// Quick add to cart from product listing
function addToCartQuick(id, name, slug, price, image, category) {
  const cart = JSON.parse(localStorage.getItem('aveshtech-cart') || '[]');
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, slug, price, image, category, quantity: 1 });
  }
  localStorage.setItem('aveshtech-cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${name} added to cart!`);
}

// Render skeleton loading cards
function renderSkeletons(container, count = 6) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden';
    skeleton.innerHTML = `
      <div class="aspect-square skeleton"></div>
      <div class="p-4 space-y-3">
        <div class="h-3 w-20 skeleton rounded"></div>
        <div class="h-5 w-3/4 skeleton rounded"></div>
        <div class="h-3 w-full skeleton rounded"></div>
        <div class="flex justify-between items-center mt-3">
          <div class="h-6 w-16 skeleton rounded"></div>
          <div class="h-9 w-24 skeleton rounded-lg"></div>
        </div>
      </div>
    `;
    container.appendChild(skeleton);
  }
}

// Load featured products on homepage
async function loadFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  
  renderSkeletons(container, 4);
  
  const products = await fetchProducts({ featured: true, limit: 4 });
  container.innerHTML = '';
  
  if (products.length === 0) {
    container.innerHTML = '<p class="text-gray-400 col-span-full text-center py-8">No featured products yet.</p>';
    return;
  }
  
  products.forEach(product => {
    container.appendChild(renderProductCard(product));
  });
}

// Initialize the products listing page
async function initProductsPage() {
  const grid = document.getElementById('products-grid');
  const noProducts = document.getElementById('no-products');
  if (!grid) return;
  
  // Get category from URL
  const params = new URLSearchParams(window.location.search);
  let activeCategory = params.get('category') || 'all';
  let activeSort = 'featured';
  
  // Highlight active filter button
  function setActiveFilter(category) {
    activeCategory = category;
    document.querySelectorAll('[data-category]').forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.remove('bg-gray-800', 'text-gray-300');
        btn.classList.add('bg-purple-600', 'text-white');
      } else {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('bg-gray-800', 'text-gray-300');
      }
    });
  }
  
  // Load products
  async function loadProducts() {
    renderSkeletons(grid, 6);
    const products = await fetchProducts({ category: activeCategory, sort: activeSort });
    grid.innerHTML = '';
    
    if (products.length === 0) {
      grid.classList.add('hidden');
      if (noProducts) noProducts.classList.remove('hidden');
      return;
    }
    
    grid.classList.remove('hidden');
    if (noProducts) noProducts.classList.add('hidden');
    products.forEach(product => {
      grid.appendChild(renderProductCard(product));
    });
  }
  
  // Set initial active filter
  setActiveFilter(activeCategory);
  
  // Filter button click handlers
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      setActiveFilter(btn.dataset.category);
      // Update URL without reload
      const url = new URL(window.location);
      if (btn.dataset.category === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', btn.dataset.category);
      }
      window.history.pushState({}, '', url);
      loadProducts();
    });
  });
  
  // Sort change handler
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      loadProducts();
    });
  }
  
  // Initial load
  await loadProducts();
}
