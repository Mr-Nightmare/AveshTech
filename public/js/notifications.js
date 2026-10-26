/**
 * Avesh Technologies - Free Automatic Live Tracking & Owner Notification Engine
 * 100% Free - Supports Telegram Push Notifications, Discord Webhooks & Live Realtime Visitor Radar
 */

const NOTIFICATION_STORAGE_KEYS = {
  TELEGRAM_TOKEN: 'avesh_tg_token',
  TELEGRAM_CHAT_ID: 'avesh_tg_chat_id',
  WEBHOOK_URL: 'avesh_webhook_url',
  NOTIF_PREFS: 'avesh_notif_prefs',
  VISITOR_HEARTBEATS: 'avesh_visitor_heartbeats',
  EVENT_LOGS: 'avesh_live_event_logs'
};

window.AveshNotifications = {
  // 1. Send free Telegram alert to owner's phone
  sendTelegramAlert: async function(message, eventType = 'general') {
    try {
      const prefs = this.getPreferences();
      if (!prefs[eventType] && eventType !== 'test') return;

      const token = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.TELEGRAM_TOKEN) || window.AVESH_CONFIG?.telegramBotToken;
      const chatId = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.TELEGRAM_CHAT_ID) || window.AVESH_CONFIG?.telegramChatId;

      if (!token || !chatId) {
        // Log locally if Telegram not yet configured by owner
        this.logLiveEvent(message, eventType);
        return;
      }

      const formattedMessage = `⚡ *AVESH TECH ALERT* ⚡\n${message}\n\n🕒 _${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}_`;

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: 'Markdown'
        })
      });

      this.logLiveEvent(message, eventType);
      return response.ok;
    } catch (err) {
      console.warn('Telegram notification failed:', err);
      this.logLiveEvent(message, eventType);
    }
  },

  // 2. Send Discord or Custom Webhook Alert
  sendWebhookAlert: async function(payload) {
    const webhook = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.WEBHOOK_URL);
    if (!webhook) return;

    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (e) {}
  },

  // 3. Pre-configured notification triggers
  notifyNewVisitor: function(pageName) {
    // Session debounced so owner is not flooded on every reload
    const visited = sessionStorage.getItem('avesh_visitor_alert_sent');
    if (!visited) {
      sessionStorage.setItem('avesh_visitor_alert_sent', 'true');
      this.sendTelegramAlert(
        `👀 *New Visitor Online*\nSomeone just landed on *${pageName || 'Home'}* to browse products.`,
        'visitor'
      );
    }
  },

  notifyProductView: function(productName, price) {
    const key = 'view_' + productName;
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, 'true');
      this.sendTelegramAlert(
        `👁️ *Customer Viewing Product*\nLooking at: *${productName}*\nPrice: ₹${price}`,
        'product_view'
      );
    }
  },

  notifyAddToCart: function(productName, price, customNote = '') {
    this.sendTelegramAlert(
      `🛒 *Item Added to Cart!*\nProduct: *${productName}*\nPrice: ₹${price}\n${customNote ? `Custom Note: _"${customNote}"_\n` : ''}Customer is preparing to checkout!`,
      'cart'
    );
  },

  notifyCheckoutInitiated: function(name, phone, amount) {
    this.sendTelegramAlert(
      `⚡ *Checkout Initiated!*\nCustomer: *${name || 'Browsing customer'}*\nPhone: *${phone || 'Entering details'}*\nCart Amount: *₹${amount}*\nCustomer is on the payment screen.`,
      'checkout'
    );
  },

  notifyOrderSuccess: function(order) {
    const itemsList = order.items.map(i => `• ${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}`).join('\n');
    const address = order.shipping_address;
    const addrStr = `${address.city}, ${address.state} (${address.pincode})`;

    this.sendTelegramAlert(
      `🎉 *NEW ORDER RECEIVED!* 🚀\n` +
      `*Order ID:* \`${order.id}\`\n` +
      `*Total Paid:* *₹${order.total}* via *${order.payment_method.toUpperCase()}*\n` +
      `*Customer:* ${order.customer_name} (${order.phone})\n` +
      `*City:* ${addrStr}\n` +
      `${order.referral_code ? `*Influencer Ref:* ${order.referral_code.toUpperCase()}\n` : ''}` +
      `${order.customer_notes ? `*Custom Inscription:* _"${order.customer_notes}"_\n` : ''}\n` +
      `*Items:*\n${itemsList}`,
      'order'
    );
  },

  notifyCustomQuoteRequest: function(name, phone, topic, message) {
    this.sendTelegramAlert(
      `📩 *Custom 3D / Project Inquiry!*\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Topic:* ${topic}\n` +
      `*Requirements:* _"${message}"_`,
      'contact'
    );
  },

  // 4. Live Event Logger for Admin Dashboard
  logLiveEvent: function(text, type = 'info') {
    try {
      const logs = JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEYS.EVENT_LOGS) || '[]');
      logs.unshift({
        id: 'evt-' + Date.now(),
        text: text.replace(/\*/g, '').replace(/_/g, ''),
        type: type,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      });
      // Keep last 40 events
      localStorage.setItem(NOTIFICATION_STORAGE_KEYS.EVENT_LOGS, JSON.stringify(logs.slice(0, 40)));
      window.dispatchEvent(new CustomEvent('avesh-live-event-logged'));
    } catch (e) {}
  },

  getLiveEvents: function() {
    try {
      return JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEYS.EVENT_LOGS) || '[]');
    } catch (e) {
      return [];
    }
  },

  // 5. Active Live Visitors Tracker (Heartbeat Beacon)
  startVisitorHeartbeat: function() {
    const sessionId = sessionStorage.getItem('avesh_visitor_session_id') || ('sess_' + Math.floor(Math.random() * 1000000));
    sessionStorage.setItem('avesh_visitor_session_id', sessionId);

    const updateHeartbeat = () => {
      try {
        const heartbeats = JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEYS.VISITOR_HEARTBEATS) || '{}');
        const now = Date.now();
        
        // Register current page
        heartbeats[sessionId] = {
          lastSeen: now,
          page: window.location.pathname || 'Home',
          title: document.title
        };

        // Clean up heartbeats older than 15 seconds
        for (const [id, data] of Object.entries(heartbeats)) {
          if (now - data.lastSeen > 15000) {
            delete heartbeats[id];
          }
        }

        localStorage.setItem(NOTIFICATION_STORAGE_KEYS.VISITOR_HEARTBEATS, JSON.stringify(heartbeats));
      } catch (e) {}
    };

    updateHeartbeat();
    setInterval(updateHeartbeat, 8000);
  },

  getLiveVisitorCount: function() {
    try {
      const heartbeats = JSON.parse(localStorage.getItem(NOTIFICATION_STORAGE_KEYS.VISITOR_HEARTBEATS) || '{}');
      const now = Date.now();
      let active = 0;
      for (const [id, data] of Object.entries(heartbeats)) {
        if (data && data.lastSeen && (now - data.lastSeen <= 15000)) {
          active++;
        }
      }
      return Math.max(1, active);
    } catch (e) {
      return 1;
    }
  },

  // 6. Settings & Preferences
  getPreferences: function() {
    try {
      const stored = localStorage.getItem(NOTIFICATION_STORAGE_KEYS.NOTIF_PREFS);
      return stored ? JSON.parse(stored) : {
        order: true,
        checkout: true,
        cart: true,
        contact: true,
        visitor: false // default false to avoid alert flood, owner can toggle
      };
    } catch (e) {
      return { order: true, checkout: true, cart: true, contact: true, visitor: false };
    }
  },

  savePreferences: function(prefs) {
    localStorage.setItem(NOTIFICATION_STORAGE_KEYS.NOTIF_PREFS, JSON.stringify(prefs));
  }
};

// Start live beacon automatically on all pages
document.addEventListener('DOMContentLoaded', () => {
  window.AveshNotifications.startVisitorHeartbeat();
});

