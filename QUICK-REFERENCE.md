# Kayurveda - Quick Reference Guide

## 🚀 Quick Start

```bash
# Development
npm install
npm run dev

# Production
npm run build
npm run preview
```

## 📱 Test PWA on Mobile

### Android (Chrome)
1. Visit app URL on phone
2. Wait for install prompt
3. Tap "Install"

### iOS (Safari)
1. Visit app URL on phone
2. Tap Share → Add to Home Screen
3. Tap Add

## 🎨 Key Design Elements

### Colors
- **Black**: `#000000`
- **White**: `#FFFFFF`
- **Gray-900**: `#1a1a1a`
- **Gray-800**: `#262626`

### Fonts
```css
font-family: -apple-system, BlinkMacSystemFont, 
             'SF Pro Display', 'Helvetica Neue';
```

### Animations
- **Glow Pulse**: 2s infinite
- **Transitions**: 0.3-0.8s ease
- **Hover**: scale(1.02)
- **Tap**: scale(0.98)

## 📂 Important Files

### Core
- `/src/app/Kayurveda.tsx` - Main component (2000+ lines)
- `/src/app/App.tsx` - Root wrapper
- `/src/main.tsx` - Entry point

### PWA
- `/public/manifest.json` - App manifest
- `/public/sw.js` - Service worker
- `/index.html` - PWA meta tags

### Styling
- `/src/styles/fonts.css` - SF Pro fonts
- `/src/styles/theme.css` - Dark theme
- `/src/styles/index.css` - Global styles

## 🔑 Key Features

### Onboarding (5 screens)
1. Welcome → Animated intro
2. Quiz → 8 dosha questions
3. Reveal → Show results
4. Concerns → Select issues
5. Unlock → Loading animation

### Dashboard (5 tabs)
1. **Home** - Daily overview
2. **Routine** - Morning/night tasks
3. **KAYA** - AI chat
4. **Progress** - Charts & photos
5. **Profile** - Settings

## 💾 Data Storage

### LocalStorage Keys
```javascript
'userDosha'          // vata|pitta|kapha
'doshaScores'        // {vata: 3, pitta: 2, kapha: 3}
'userConcerns'       // ["Acne", "Hair Fall", ...]
'currentScreen'      // Current app screen
'kayurveda_*'        // PWA data (auto-prefixed)
```

## 🎯 User Flow

```
Welcome Screen
    ↓
Dosha Quiz (8 questions)
    ↓
Dosha Reveal (Results + Balance)
    ↓
Concern Selection (Multi-select)
    ↓
Dashboard Unlock (Loading)
    ↓
Dashboard (5 tabs)
```

## 🔧 Customization Points

### Brand Colors
```typescript
// src/app/Kayurveda.tsx
const doshaInfo = {
  vata: { color: "from-blue-500 to-purple-500" },
  pitta: { color: "from-red-500 to-orange-500" },
  kapha: { color: "from-green-500 to-teal-500" }
}
```

### AI Responses
```typescript
// src/app/Kayurveda.tsx (Line ~300)
const kayaResponses = {
  acne: "Your response here...",
  hair: "Your response here...",
  // Add more responses
}
```

### Routine Data
```typescript
// src/app/Kayurveda.tsx (Line ~200)
const routineData = {
  morning: [
    {
      zone: "Face Care",
      emoji: "✨",
      steps: [/* ... */]
    }
  ]
}
```

## 🐛 Common Issues & Fixes

### Service Worker Not Working
```bash
# Clear cache
localStorage.clear()
# Hard refresh
Ctrl + Shift + R (Win/Linux)
Cmd + Shift + R (Mac)
```

### Install Prompt Not Showing
- Wait 3+ seconds
- Check if already installed
- iOS: Manual only (Share → Add to Home)

### Styling Issues
- Check `/src/styles/theme.css` for tokens
- Verify Tailwind classes are correct
- Inspect element in DevTools

## 📊 Performance Tips

### Optimize Build
```bash
# Build with analysis
npm run build

# Check bundle size
ls -lh dist/assets/
```

### Lighthouse Audit
1. Open DevTools
2. Go to Lighthouse tab
3. Select "Progressive Web App"
4. Click "Generate report"

Target Scores:
- PWA: 100
- Performance: >90
- Accessibility: >90

## 🔐 Security

### Headers (Add to hosting)
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🌐 Deployment Checklist

- [ ] Build passes (`npm run build`)
- [ ] PWA audit score 100
- [ ] Tested on Android Chrome
- [ ] Tested on iOS Safari
- [ ] HTTPS enabled
- [ ] Icons generated
- [ ] Splash screens added
- [ ] Error tracking setup
- [ ] Analytics integrated

## 📞 Quick Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production
npm run preview

# Type check
npx tsc --noEmit

# Lint code
npx eslint src/

# Format code
npx prettier --write src/
```

## 🎓 Learning Resources

- **React**: [react.dev](https://react.dev)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **PWA**: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps)
- **Motion**: [motion.dev](https://motion.dev)

## 💡 Pro Tips

1. **Debug PWA**: Use Chrome DevTools → Application tab
2. **Test Offline**: Network tab → Offline checkbox
3. **View Cache**: Application → Cache Storage
4. **Monitor**: Console for `[Kayurveda]` logs
5. **Hot Reload**: Vite supports HMR automatically

## 🎉 Success Metrics

After deployment, monitor:
- Install conversion rate
- Daily active users
- Routine completion rate
- Average session duration
- Offline usage stats
- Share/viral coefficient

---

**Need help?** Check:
1. `/PROJECT-SUMMARY.md` - Complete overview
2. `/PWA-SETUP.md` - PWA implementation guide
3. Code comments in `Kayurveda.tsx`

**Version 1.0.0** | Built with ❤️ for Ayurvedic wellness
