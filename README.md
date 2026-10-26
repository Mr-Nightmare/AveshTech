# Avesh Technologies - E-Commerce Platform & Deployment Architecture

Official web store for **Avesh Technologies** (New Delhi, India), specializing in:
- 🖨️ **3D Models**: Downloadable STL, OBJ, and 3MF files
- 🔧 **Custom 3D Prints**: On-demand FDM & Resin 3D printing
- 💡 **3D Shadow Light Lamps**: Personalized couple, name, and deity shadow projection lamps
- 📡 **IoT Hardware & Projects**: ESP32, Raspberry Pi, Arduino & smart home automation kits
- 🧰 **DIY Maker Kits**: Prototyping kits, relays, and sensors

---

## 🔒 Security & Deployment Architecture

This project is separated into isolated directories to guarantee that **NO admin code, database schemas, or sensitive keys are ever deployed to the public web (Netlify)**:

```
d:\code\aveshtech\
│
├── public/                     <-- 🚀 ONLY THIS FOLDER IS DEPLOYED TO NETLIFY
│   ├── index.html              # Homepage with hero, categories, products, customer reviews
│   ├── products.html           # Full catalog with search, category pills & filters
│   ├── product-detail.html     # Product specifications, 3D file download, customization
│   ├── cart.html               # Multi-payment checkout (Razorpay, UPI, Cards, WhatsApp)
│   ├── order-tracking.html     # Live courier tracking (Delhivery, BlueDart, DTDC, India Post)
│   ├── affiliate.html          # Creator / Influencer partner portal with custom ref links
│   ├── creator-dashboard.html  # Live creator analytics (clicks, orders, earnings, payouts)
│   ├── about.html              # Company story & mission
│   ├── contact.html            # Contact form & custom 3D print request submissions
│   ├── _redirects              # Netlify clean URLs & rewrite rules
│   ├── _headers                # Hardened security headers (anti-clickjacking, HSTS, CSP)
│   ├── assets/                 # Brand logos, icons, and product photography
│   ├── css/                    # Production design system
│   └── js/                     # Sanitized client scripts (NO admin PINs, NO secret backdoors)
│       ├── supabase-config.js  # Public client anon configuration
│       ├── store.js            # Unified customer store & cart engine
│       ├── auth.js             # Real Google OAuth, Supabase OTP & Email Sign In
│       └── notifications.js    # Client event telemetry
│
├── admin/                      <-- 🛡️ PRIVATE STORE OWNER CONTROL PANEL (NEVER DEPLOYED)
│   ├── index.html              # Full Owner Dashboard (Products, Orders, Users, Radar, Settings)
│   ├── start-admin.bat         # 1-Click launcher to open Admin on localhost:5502
│   ├── js/                     # Admin backend scripts & PIN protection
│   ├── css/                    # Admin styles
│   └── assets/                 # Admin assets
│
├── database/                   <-- 🗄️ PRIVATE SUPABASE SCHEMAS (NEVER DEPLOYED)
│   ├── supabase-schema.sql     # Full database schema, indexes, and RLS policies
│   └── README.md               # Supabase setup instructions
│
├── docs/                       <-- 📖 GUIDES & DOCUMENTATION (NEVER DEPLOYED)
│   ├── PUBLISHING_GUIDE.md     # Step-by-step Netlify & Supabase publishing guide
│   └── DEPLOYMENT_SECURITY.md  # Security verification report
│
├── netlify.toml                # Netlify config with publish = "public"
├── .gitignore                  # Git protection rules
└── .vscode/settings.json       # Live Server root configured to "/public"
```

---

## 🚀 How to Deploy to Netlify

### Option 1: Netlify Drag & Drop (Easiest)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop **ONLY the `public` folder** directly into the upload box.
3. Your site is live instantly with 100% of your administrative data completely secured on your local computer!

### Option 2: Connect GitHub to Netlify
1. Push your repository to GitHub.
2. In Netlify, create a "New Site from Git" and select your repository.
3. Netlify automatically reads `netlify.toml`:
   - **Publish directory**: `public`
   - **Build command**: *(leave blank)*
4. Netlify will only publish what is inside `public/`. Folders `admin/`, `database/`, and `docs/` are completely excluded from deployment.

---

## 🛡️ How to Access the Admin Control Panel

1. **Option A (1-Click Launcher)**:
   - Double-click `admin/start-admin.bat`.
   - It automatically starts a local server on port 5502 and opens your Admin Panel in your browser.
2. **Option B (VS Code Live Server)**:
   - Right-click `admin/index.html` in VS Code and click **"Open with Live Server"**.
3. **Option C (Direct Browser)**:
   - Open `admin/index.html` directly in Google Chrome or Microsoft Edge.

Enter your secure Owner PIN to unlock the dashboard. From here you can manage all live orders, add/edit products, track creator commissions, and manage registered users.

---

## 📞 Official Store Contact Information
- **WhatsApp & Phone**: +91 7988456595
- **Instagram**: [https://www.instagram.com/aveshtech.in/](https://www.instagram.com/aveshtech.in/)
- **Email**: aveshtech@gmail.com
- **Headquarters**: 123 Tech Hub, Electronics Market, New Delhi, India 110001
