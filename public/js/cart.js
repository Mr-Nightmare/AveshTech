// cart.js - Shopping cart logic

const CART_KEY = 'aveshtech-cart';
const WHATSAPP_NUMBER = '919XXXXXXXXX'; // Replace with actual number

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.image || (Array.isArray(product.images) ? product.images[0] : ''),
      category: product.category,
      quantity: quantity
    });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

function updateQuantity(productId, newQuantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    item.quantity = newQuantity;
    saveCart(cart);
    if (typeof renderCart === 'function') renderCart();
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
  if (typeof renderCart === 'function') renderCart();
}

// Render cart items on cart page
function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  const cartContent = document.getElementById('cart-content');
  const emptyCart = document.getElementById('empty-cart');
  const cartTitleCount = document.getElementById('cart-title-count');
  
  const cart = getCart();
  
  if (cart.length === 0) {
    if (cartContent) cartContent.classList.add('hidden');
    if (emptyCart) emptyCart.classList.remove('hidden');
    return;
  }
  
  if (cartContent) cartContent.classList.remove('hidden');
  if (emptyCart) emptyCart.classList.add('hidden');
  
  // Update cart title count
  if (cartTitleCount) {
    cartTitleCount.textContent = `(${getCartItemCount()} items)`;
  }
  
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <!-- Product Image -->
        <a href="/product-detail.html?slug=${item.slug}" class="flex-shrink-0">
          <div class="w-20 h-20 rounded-lg overflow-hidden bg-gray-800">
            <img src="${item.image || 'https://placehold.co/200x200/1a1a2e/8b5cf6?text=Product'}" alt="${item.name}" class="w-full h-full object-cover">
          </div>
        </a>
        
        <!-- Product Info -->
        <div class="flex-grow min-w-0">
          <a href="/product-detail.html?slug=${item.slug}" class="text-white font-semibold hover:text-purple-400 transition line-clamp-1">${item.name}</a>
          <p class="text-gray-400 text-sm">${item.category}</p>
          <p class="text-purple-400 font-semibold mt-1">₹${item.price}</p>
        </div>
        
        <!-- Quantity Controls -->
        <div class="flex items-center border border-gray-700 rounded-lg">
          <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})" class="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-800 rounded-l-lg transition">−</button>
          <span class="px-3 py-1 text-white border-x border-gray-700 min-w-[40px] text-center">${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})" class="px-3 py-1 text-gray-300 hover:text-white hover:bg-gray-800 rounded-r-lg transition">+</button>
        </div>
        
        <!-- Item Total -->
        <div class="text-right min-w-[80px]">
          <p class="text-white font-bold">₹${item.price * item.quantity}</p>
        </div>
        
        <!-- Remove Button -->
        <button onclick="removeFromCart(${item.id})" class="text-red-400 hover:text-red-300 transition p-1" title="Remove item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </button>
      </div>
    `).join('');
  }
  
  // Update summary
  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  
  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');
  
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : `₹${shipping}`;
  if (totalEl) totalEl.textContent = `₹${total}`;
}

// WhatsApp checkout
function checkoutWhatsApp() {
  const cart = getCart();
  if (cart.length === 0) return;
  
  const subtotal = getCartTotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  
  let itemsList = cart.map(item => 
    `• ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
  ).join('\n');
  
  const message = encodeURIComponent(
    `Hi! I'd like to place an order:\n\n` +
    `${itemsList}\n\n` +
    `Subtotal: ₹${subtotal}\n` +
    `Shipping: ${shipping === 0 ? 'FREE' : '₹' + shipping}\n` +
    `*Total: ₹${total}*\n\n` +
    `Please confirm and share payment details.`
  );
  
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
}

function initCartPage() {
  renderCart();
}
