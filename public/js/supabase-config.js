/**
 * Avesh Technologies - Core Configuration & State Store
 * Official Contact: Phone/WhatsApp +91 7988456595
 * Official Instagram: https://www.instagram.com/aveshtech.in/
 * Support Email: aveshtech@gmail.com
 */

// 1. Store Configuration & Credentials
const AVESH_CONFIG = {
  storeName: 'Avesh Technologies',
  brandShort: 'AVESH TECH',
  tagline: '3D Models, Custom 3D Prints, Shadow Lamps & IoT Kits',
  phone: '7988456595',
  phoneDisplay: '+91 7988456595',
  whatsappNumber: '917988456595',
  instagramUrl: 'https://www.instagram.com/aveshtech.in/',
  email: 'aveshtech@gmail.com',
  address: '123 Tech Hub, Electronics Market, New Delhi, India 110001',
  razorpayKey: 'rzp_live_TsVqGgN2IrKlE3', // Live Razorpay Key ID
  freeShippingThreshold: 999,
  standardShippingFee: 79,
  influencerCommissionRate: 0.10, // 10% commission for creators
  customerReferralDiscount: 0.10, // 10% discount for customer using ref code
  
  // Supabase Configuration
  supabaseUrl: 'https://fwnxrtgwewlwiefueecg.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3bnhydGd3ZXdsd2llZnVlZWNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI5OTY3NzIsImV4cCI6MjEwODU3Mjc3Mn0.ABa6nGCOMmntcrEJlvrWRNUz17AnzpYM0crZQDXGvgo'
};

// Expose globally
window.AVESH_CONFIG = AVESH_CONFIG;

// 2. Load stored settings overrides from Admin Panel & Supabase
try {
  const customConfig = localStorage.getItem('avesh_site_config');
  if (customConfig) {
    const parsed = JSON.parse(customConfig);
    delete parsed.supabaseUrl;
    delete parsed.supabaseAnonKey;
    Object.assign(window.AVESH_CONFIG, parsed);
  }
} catch (e) {
  console.warn('Config load fallback:', e);
}

// Asynchronously hydrate settings from Supabase store_settings table
(async function hydrateCloudSettings() {
  try {
    const sb = await window.waitForSupabase(3000);
    if (sb && typeof sb.from === 'function') {
      const { data } = await sb.from('store_settings').select('data').eq('id', 'current').maybeSingle();
      if (data && data.data) {
        delete data.data.supabaseUrl;
        delete data.data.supabaseAnonKey;
        Object.assign(window.AVESH_CONFIG, data.data);
      }
    }
  } catch (e) {}
})();

// 3. Supabase Client Initializer with graceful offline-first fallback
let supabaseInstance = null;

(function initSupabase() {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseInstance = window.supabase.createClient(AVESH_CONFIG.supabaseUrl, AVESH_CONFIG.supabaseAnonKey);
      window.supabaseClient = supabaseInstance;
      window.dispatchEvent(new CustomEvent('supabase-ready', { detail: supabaseInstance }));
    } catch (e) {
      console.log('Supabase initialized in offline/local-cache mode.');
    }
  } else {
    const sbScript = document.createElement('script');
    sbScript.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    sbScript.async = true;
    sbScript.onload = () => {
      try {
        if (window.supabase) {
          supabaseInstance = window.supabase.createClient(AVESH_CONFIG.supabaseUrl, AVESH_CONFIG.supabaseAnonKey);
          window.supabaseClient = supabaseInstance;
          window.dispatchEvent(new CustomEvent('supabase-ready', { detail: supabaseInstance }));
        }
      } catch (e) {
        console.log('Using local high-speed persistent store.');
      }
    };
    document.head.appendChild(sbScript);
  }
})();

// Razorpay SDK loader
(function initRazorpay() {
  if (!document.getElementById('razorpay-sdk')) {
    const rzp = document.createElement('script');
    rzp.id = 'razorpay-sdk';
    rzp.src = 'https://checkout.razorpay.com/v1/checkout.js';
    rzp.async = true;
    document.head.appendChild(rzp);
  }
})();

// Helper to wait for Supabase or timeout to local store
function waitForSupabase(timeoutMs = 3500) {
  return new Promise((resolve) => {
    if (window.supabaseClient) return resolve(window.supabaseClient);
    let resolved = false;
    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(null);
      }
    }, timeoutMs);
    window.addEventListener('supabase-ready', (e) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timer);
        resolve(e.detail || window.supabaseClient);
      }
    }, { once: true });
  });
}

// Format Currency
function formatINR(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

// Global Toast System
function showToast(message, type = 'success') {
  const existing = document.querySelectorAll('.avesh-toast');
  existing.forEach(t => t.remove());

  const icons = {
    success: '<i class="fa-solid fa-circle-check text-green-400 text-lg"></i>',
    error: '<i class="fa-solid fa-circle-xmark text-red-400 text-lg"></i>',
    info: '<i class="fa-solid fa-circle-info text-blue-400 text-lg"></i>',
    cart: '<i class="fa-solid fa-cart-shopping text-orange-400 text-lg"></i>'
  };

  const toast = document.createElement('div');
  toast.className = 'avesh-toast fixed bottom-5 right-5 z-[9999] flex items-center gap-3 bg-gray-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-gray-700 transform translate-y-10 opacity-0 transition-all duration-300 max-w-md text-sm font-medium';
  toast.innerHTML = `
    <span class="shrink-0">${icons[type] || icons.info}</span>
    <span class="flex-1">${message}</span>
    <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-white ml-2 text-xs"><i class="fa-solid fa-xmark"></i></button>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-10', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-10', 'opacity-0');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// Expose utilities
window.waitForSupabase = waitForSupabase;
window.formatINR = formatINR;
window.showToast = showToast;
