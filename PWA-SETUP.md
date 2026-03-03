# Kayurveda PWA Setup Guide

## 🌟 Overview

Kayurveda is now a fully-featured Progressive Web App (PWA) optimized for mobile devices on both Android and iOS platforms. This guide explains the PWA implementation and how to test it.

## ✨ PWA Features Implemented

### 1. **Installability**
- ✅ Web App Manifest with all required fields
- ✅ Service Worker for offline functionality
- ✅ Install prompts for Android and iOS
- ✅ App icons in multiple sizes (72x72 to 512x512)
- ✅ Splash screens for iOS devices

### 2. **Offline Support**
- ✅ Service Worker caching strategy (Network First, Cache Fallback)
- ✅ Offline page functionality
- ✅ Background sync for data synchronization
- ✅ LocalStorage for wellness data persistence

### 3. **Native-Like Experience**
- ✅ Standalone display mode (no browser UI)
- ✅ Black theme color matching app design
- ✅ Safe area insets for notched devices
- ✅ Viewport configuration for mobile
- ✅ Touch-optimized interactions
- ✅ Haptic feedback support (where available)

### 4. **Performance**
- ✅ Code splitting (React, Motion, UI vendors)
- ✅ Lazy loading and dynamic imports
- ✅ Optimized asset delivery
- ✅ Performance monitoring

### 5. **Engagement Features**
- ✅ Push notifications support
- ✅ Wellness reminder scheduling
- ✅ Web Share API integration
- ✅ Add to Home Screen prompts

## 📱 Installation Instructions

### **Android Devices**
1. Open Kayurveda in Chrome browser
2. Wait for the "Install App" prompt to appear (after 3 seconds)
3. Tap "Install App"
4. The app will be added to your home screen
5. Launch from home screen for full-screen experience

**Alternative:**
- Tap the menu (⋮) in Chrome
- Select "Add to Home screen" or "Install app"

### **iOS Devices (iPhone/iPad)**
1. Open Kayurveda in Safari browser
2. Tap the Share button (□↑) at the bottom
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right corner
5. Launch from home screen for full-screen experience

## 🛠️ Technical Implementation

### **Files Structure**
```
kayurveda/
├── index.html                     # PWA meta tags and config
├── /public/
│   ├── manifest.json              # Web App Manifest
│   ├── sw.js                      # Service Worker
│   ├── icon-*.png                 # App icons (various sizes)
│   └── splash/                    # iOS splash screens
├── /src/
│   ├── main.tsx                   # App entry with PWA init
│   ├── app/
│   │   ├── Kayurveda.tsx          # Consolidated main component
│   │   ├── utils/pwa.ts           # PWA utilities
│   │   └── components/
│   │       └── InstallPrompt.tsx  # Install banner
│   └── styles/
│       └── fonts.css              # SF Pro / iOS fonts
└── vite.config.ts                 # Build config
```

### **Key Technologies**
- **Vite**: Build tool with PWA optimizations
- **React 18**: UI framework
- **Motion (Framer Motion)**: Animations
- **Service Worker**: Offline & caching
- **Web App Manifest**: Installability
- **LocalStorage**: Data persistence

## 🎨 Design Specifications

### **Color Scheme**
- **Background**: `#000000` (Pure Black)
- **Foreground**: `#FFFFFF` (Pure White)
- **Accents**: Gray scale (`#1a1a1a`, `#262626`, etc.)

### **Typography**
- **Font Family**: SF Pro Display, SF Pro Text, Helvetica Neue, Inter, system-ui
- **Font Weights**: 300 (Light), 400 (Normal), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Style**: iOS minimalist aesthetic

### **Responsive Breakpoints**
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🧪 Testing PWA Features

### **Test Installability**
1. **Chrome DevTools** → Application → Manifest
2. Check for "Manifest" section with all fields
3. Check "Service Workers" section shows active worker
4. Use Lighthouse audit for PWA score

### **Test Offline Mode**
1. Install the app
2. Open Chrome DevTools → Network
3. Set throttling to "Offline"
4. Navigate through the app
5. Verify cached content loads

### **Test Notifications** (requires HTTPS)
1. Grant notification permission
2. Wait for scheduled reminder
3. Verify notification appears
4. Test notification click action

### **Test Service Worker**
```javascript
// In browser console
navigator.serviceWorker.getRegistrations()
  .then(registrations => console.log(registrations));

// Check cache
caches.keys().then(keys => console.log(keys));
```

## 📊 PWA Audit Checklist

- [x] HTTPS or localhost
- [x] Web App Manifest with required fields
- [x] Service Worker registered
- [x] Icons (192x192 and 512x512 minimum)
- [x] Start URL responds when offline
- [x] Display mode is standalone/fullscreen
- [x] Theme color set
- [x] Viewport meta tag
- [x] Content sized correctly for viewport
- [x] Fast load time (< 3s on 3G)
- [x] Works offline
- [x] Provides custom offline page

## 🚀 Deployment Recommendations

### **For Production:**

1. **Generate Real Icons**
   ```bash
   # Use a tool like PWA Asset Generator
   npx pwa-asset-generator logo.svg ./public/icons
   ```

2. **Add HTTPS**
   - Required for Service Workers (except localhost)
   - Use Netlify, Vercel, or Cloudflare Pages (free HTTPS)

3. **Optimize Build**
   ```bash
   npm run build
   # Outputs to /dist with optimizations
   ```

4. **Test on Real Devices**
   - Android: Chrome browser
   - iOS: Safari browser
   - Test installation flow
   - Test offline mode
   - Test notifications

5. **Submit to App Stores (Optional)**
   - Use PWABuilder.com
   - Generate Android App Bundle
   - Submit to Google Play Store

## 🔧 Configuration

### **Customize Manifest** (`/public/manifest.json`)
```json
{
  "name": "Your App Name",
  "short_name": "Short Name",
  "theme_color": "#000000",
  "background_color": "#000000",
  // ... other fields
}
```

### **Customize Service Worker** (`/public/sw.js`)
```javascript
const CACHE_NAME = 'your-app-v1.0.0';
// Modify caching strategy as needed
```

### **Customize Icons**
- Replace `/public/icon-*.png` with your branded icons
- Maintain sizes: 72, 96, 128, 144, 152, 192, 384, 512

## 📈 Performance Metrics

### **Target Metrics**
- **Lighthouse PWA Score**: 100
- **Performance Score**: > 90
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Speed Index**: < 4.0s

### **Optimization Tips**
1. Use code splitting (already implemented)
2. Lazy load images with `loading="lazy"`
3. Minimize JavaScript bundle size
4. Use WEBP/AVIF for images
5. Enable compression (gzip/brotli)

## 🐛 Troubleshooting

### **Service Worker Not Registering**
- Check browser console for errors
- Ensure running on HTTPS or localhost
- Clear browser cache and try again

### **Install Prompt Not Showing**
- Check if app is already installed
- Verify manifest.json is valid
- Check if service worker is active
- iOS requires manual installation (no prompt)

### **Offline Mode Not Working**
- Verify service worker is active
- Check cache strategy in sw.js
- Inspect cached resources in DevTools

### **Notifications Not Working**
- Requires HTTPS (not localhost)
- User must grant permission
- Check browser notification settings
- iOS has limited push notification support

## 📚 Resources

- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Service Worker Guide](https://developers.google.com/web/fundamentals/primers/service-workers)
- [Web App Manifest](https://web.dev/add-manifest/)
- [iOS PWA Support](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

## 📞 Support

For issues or questions about the PWA implementation:
1. Check browser console for errors
2. Run Lighthouse audit
3. Verify all files are properly served
4. Test on multiple devices/browsers

---

**Built with ❤️ for the Ayurvedic wellness community**

Version 1.0.0 | March 2026
