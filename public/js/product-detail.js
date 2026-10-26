// product-detail.js - Single product page logic

async function initProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  
  if (!slug) {
    window.location.href = '/products.html';
    return;
  }
  
  const product = await fetchProductBySlug(slug);
  
  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div class="text-center py-20">
        <p class="text-6xl mb-4">😕</p>
        <h2 class="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <p class="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <a href="/products.html" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition inline-block">Browse Products</a>
      </div>
    `;
    return;
  }
  
  // Update page title
  document.title = `${product.name} | Avesh Tech`;
  
  // Update breadcrumb
  const breadcrumb = document.getElementById('product-breadcrumb');
  if (breadcrumb) {
    breadcrumb.innerHTML = `
      <a href="/" class="text-gray-400 hover:text-purple-400 transition">Home</a>
      <span class="text-gray-600 mx-2">/</span>
      <a href="/products.html" class="text-gray-400 hover:text-purple-400 transition">Products</a>
      <span class="text-gray-600 mx-2">/</span>
      <span class="text-purple-400">${product.name}</span>
    `;
  }
  
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['https://placehold.co/600x600/1a1a2e/8b5cf6?text=Product'];
  
  const categoryNames = {
    '3d-models': '3D Models',
    '3d-prints': 'Custom 3D Prints',
    'shadow-lamps': 'Shadow Lamps',
    'iot': 'IoT Products'
  };
  
  const priceHTML = product.original_price
    ? `<span class="text-3xl font-bold text-purple-400">₹${product.price}</span>
       <span class="text-lg text-gray-500 line-through ml-3">₹${product.original_price}</span>
       <span class="ml-3 bg-green-900/50 text-green-400 text-sm px-2 py-1 rounded">
         ${Math.round((1 - product.price / product.original_price) * 100)}% OFF
       </span>`
    : `<span class="text-3xl font-bold text-purple-400">₹${product.price}</span>`;
  
  // Thumbnails HTML
  const thumbnailsHTML = images.map((img, i) => `
    <button onclick="changeMainImage('${img}')" class="w-16 h-16 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-purple-500' : 'border-gray-700'} hover:border-purple-400 transition flex-shrink-0">
      <img src="${img}" alt="Thumbnail ${i + 1}" class="w-full h-full object-cover">
    </button>
  `).join('');
  
  const detailContainer = document.getElementById('product-detail');
  detailContainer.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <!-- Image Gallery -->
      <div>
        <div class="aspect-square bg-gray-800 rounded-xl overflow-hidden mb-4">
          <img id="main-image" src="${images[0]}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div id="thumbnails" class="flex gap-2 overflow-x-auto pb-2">
          ${thumbnailsHTML}
        </div>
      </div>
      
      <!-- Product Info -->
      <div class="space-y-6">
        <div>
          <span class="text-sm text-purple-400 uppercase tracking-wider">${product.category_name || categoryNames[product.category] || product.category}</span>
          <h1 class="text-3xl font-bold text-white mt-2">${product.name}</h1>
        </div>
        
        <div class="flex items-center flex-wrap gap-2">
          ${priceHTML}
        </div>
        
        <div class="flex items-center space-x-1">
          ${'★'.repeat(5).split('').map((s, i) => `<span class="${i < 4 ? 'text-yellow-400' : 'text-gray-600'}">${s}</span>`).join('')}
          <span class="text-gray-400 text-sm ml-2">(4.0)</span>
        </div>
        
        <p class="text-gray-300 leading-relaxed">${product.description}</p>
        
        <div class="flex items-center space-x-1 text-sm">
          <span class="${product.stock > 0 ? 'text-green-400' : 'text-red-400'}">
            ${product.stock > 0 ? '● In Stock' : '● Out of Stock'}
          </span>
          ${product.stock > 0 && product.stock < 10 ? `<span class="text-yellow-400 ml-2">(Only ${product.stock} left!)</span>` : ''}
        </div>
        
        <!-- Quantity Selector -->
        <div class="flex items-center space-x-4">
          <span class="text-gray-300">Quantity:</span>
          <div class="flex items-center border border-gray-700 rounded-lg">
            <button onclick="changeQuantity(-1)" class="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-l-lg transition">−</button>
            <input id="quantity-input" type="number" value="1" min="1" max="${product.stock}" class="w-16 text-center bg-transparent text-white border-x border-gray-700 py-2 focus:outline-none">
            <button onclick="changeQuantity(1)" class="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-r-lg transition">+</button>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="space-y-3">
          <button onclick="addToCartFromDetail()" class="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>
            <span>Add to Cart</span>
          </button>
          <button onclick="orderViaWhatsApp()" class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <span>Order via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Store product data for cart/whatsapp functions
  window._currentProduct = product;
  window._currentProductImage = images[0];
  
  // Load related products
  loadRelatedProducts(product.category, product.id);
}

function changeMainImage(src) {
  const mainImg = document.getElementById('main-image');
  if (mainImg) mainImg.src = src;
  
  // Update thumbnail borders
  document.querySelectorAll('#thumbnails button').forEach(btn => {
    const img = btn.querySelector('img');
    if (img && img.src === src) {
      btn.classList.remove('border-gray-700');
      btn.classList.add('border-purple-500');
    } else {
      btn.classList.remove('border-purple-500');
      btn.classList.add('border-gray-700');
    }
  });
}

function changeQuantity(delta) {
  const input = document.getElementById('quantity-input');
  if (!input) return;
  let val = parseInt(input.value) + delta;
  const max = parseInt(input.max) || 999;
  if (val < 1) val = 1;
  if (val > max) val = max;
  input.value = val;
}

function addToCartFromDetail() {
  const product = window._currentProduct;
  if (!product) return;
  const quantity = parseInt(document.getElementById('quantity-input')?.value || 1);
  const image = window._currentProductImage;
  
  const cart = JSON.parse(localStorage.getItem('aveshtech-cart') || '[]');
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: image,
      category: product.category,
      quantity: quantity
    });
  }
  localStorage.setItem('aveshtech-cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

function orderViaWhatsApp() {
  const product = window._currentProduct;
  if (!product) return;
  const quantity = parseInt(document.getElementById('quantity-input')?.value || 1);
  const total = product.price * quantity;
  
  const message = encodeURIComponent(
    `Hi! I'd like to order:\n\n` +
    `📦 *${product.name}*\n` +
    `💰 Price: ₹${product.price} x ${quantity} = ₹${total}\n\n` +
    `Please confirm availability and payment details.`
  );
  
  window.open(`https://wa.me/919XXXXXXXXX?text=${message}`, '_blank');
}

async function loadRelatedProducts(category, excludeId) {
  const container = document.getElementById('related-products');
  if (!container) return;
  
  renderSkeletons(container, 4);
  
  let products = await fetchProducts({ category, limit: 5 });
  products = products.filter(p => p.id !== excludeId).slice(0, 4);
  
  container.innerHTML = '';
  if (products.length === 0) {
    container.innerHTML = '<p class="text-gray-400 col-span-full text-center py-4">No related products found.</p>';
    return;
  }
  products.forEach(p => container.appendChild(renderProductCard(p)));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('product-detail')) {
    initProductDetail();
  }
});
