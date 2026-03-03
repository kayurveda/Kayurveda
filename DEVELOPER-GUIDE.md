# Developer Onboarding Guide 👨‍💻

Welcome to the Kayurveda development team! This guide will get you up and running quickly.

---

## 🎯 Day 1: Setup & Orientation

### 1. Clone & Install (10 minutes)
```bash
# Clone the repository
git clone https://github.com/yourusername/kayurveda.git
cd kayurveda

# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:3000
```

### 2. Read Key Documentation (30 minutes)
In order of priority:
1. [README.md](./README.md) - Project overview
2. [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Quick commands & tips
3. [ARCHITECTURE.md](./ARCHITECTURE.md) - System design
4. [PROJECT-SUMMARY.md](./PROJECT-SUMMARY.md) - Complete details

### 3. Explore the Codebase (1 hour)
```
Priority Files to Understand:
1. /src/app/Kayurveda.tsx (Master Component - 2000+ lines)
2. /src/app/App.tsx (Root wrapper)
3. /src/main.tsx (Entry point)
4. /public/manifest.json (PWA config)
5. /public/sw.js (Service Worker)
```

### 4. Test the App (30 minutes)
- [ ] Complete the Dosha Quiz
- [ ] Select some concerns
- [ ] Explore all 5 dashboard tabs
- [ ] Chat with KAYA
- [ ] Mark some routines complete
- [ ] Test offline mode (Network tab → Offline)
- [ ] Try installing as PWA

---

## 🏗️ Understanding the Architecture

### Single Component Design
Unlike most React apps, Kayurveda uses **ONE master component**:
- **Why?** Easier to maintain, faster to understand, no prop drilling
- **Where?** `/src/app/Kayurveda.tsx`
- **Lines:** 2000+ lines of well-organized code

### Component Structure
```typescript
Kayurveda.tsx contains:
├── Imports & Constants (Lines 1-500)
├── State Management (Lines 500-700)
├── Helper Functions (Lines 700-900)
├── Screen Renderers (Lines 900-2000)
│   ├── renderWelcome()
│   ├── renderDoshaQuiz()
│   ├── renderDoshaReveal()
│   ├── renderConcerns()
│   ├── renderUnlock()
│   └── renderDashboard()
│       ├── renderHomeTab()
│       ├── renderRoutineTab()
│       ├── renderKayaTab()
│       ├── renderProgressTab()
│       └── renderProfileTab()
└── Main Render (Lines 2000-2050)
```

### State Flow
```typescript
// Screen navigation
currentScreen: 'welcome' | 'dosha-quiz' | 'dosha-reveal' | 'concerns' | 'unlock' | 'dashboard'

// Dashboard tabs
dashboardTab: 'home' | 'routine' | 'kaya' | 'progress' | 'profile'

// User data
userDosha: 'vata' | 'pitta' | 'kapha'
doshaScores: { vata: number, pitta: number, kapha: number }
selectedConcerns: string[]

// Routine tracking
completedSteps: Set<string>

// Chat
messages: Message[]
```

---

## 🎨 Styling Guidelines

### Use Tailwind Utility Classes
```tsx
// ✅ Good
<div className="bg-black text-white p-6 rounded-2xl">

// ❌ Avoid inline styles
<div style={{ backgroundColor: 'black' }}>
```

### Color Palette (Always use these)
```typescript
bg-black         // #000000
text-white       // #FFFFFF
bg-gray-900      // #1a1a1a
bg-gray-800      // #262626
border-gray-800  // rgba(255,255,255,0.1)
```

### Common Patterns
```tsx
// Card
<div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

// Button (Primary)
<button className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-3">

// Button (Secondary)
<button className="bg-gray-900 text-white hover:bg-gray-800 rounded-xl px-4 py-2">

// Glow text
<div className="glow-text">KAYA</div>
/* CSS: text-shadow: 0 0 30px rgba(255,255,255,0.5); */
```

---

## 🔧 Common Development Tasks

### Adding a New Screen
1. Add screen name to `currentScreen` type
2. Create `renderNewScreen()` function
3. Add conditional render in main render
4. Add navigation logic

```typescript
// 1. Update type
type Screen = 'welcome' | 'dosha-quiz' | 'new-screen' | ...;

// 2. Create renderer
const renderNewScreen = () => (
  <div className="min-h-screen bg-black text-white p-6">
    {/* Your content */}
  </div>
);

// 3. Add to main render
{currentScreen === "new-screen" && renderNewScreen()}

// 4. Navigate to it
setCurrentScreen("new-screen");
```

### Adding a Dashboard Tab
Similar process but use `dashboardTab` state:

```typescript
// 1. Update type
type DashboardTab = 'home' | 'routine' | 'new-tab' | ...;

// 2. Create renderer
const renderNewTab = () => (
  <div className="p-6">
    {/* Your content */}
  </div>
);

// 3. Add to renderDashboard()
{dashboardTab === "new-tab" && renderNewTab()}

// 4. Add to bottom navigation
const tabs = [
  // ... existing tabs
  { id: "new-tab", label: "New", icon: YourIcon }
];
```

### Adding KAYA Responses
```typescript
// In kayaResponses object (Line ~300)
const kayaResponses = {
  // ... existing responses
  "your-keyword": "Your AI response here...",
};

// In getKayaResponse() function
if (lowerMessage.includes("your-keyword"))
  return kayaResponses["your-keyword"];
```

### Adding Routine Items
```typescript
// In routineData object (Line ~200)
const routineData = {
  morning: [
    // ... existing zones
    {
      zone: "New Zone",
      emoji: "🌟",
      steps: [
        {
          name: "New Step",
          duration: "5 min",
          ingredients: "Item 1, Item 2",
          done: false,
        }
      ]
    }
  ]
};
```

---

## 🧪 Testing Your Changes

### Manual Testing Checklist
```bash
# 1. Start dev server
npm run dev

# 2. Test functionality
- Navigate to your changes
- Test on mobile viewport (Chrome DevTools)
- Test dark theme
- Test animations
- Test error states

# 3. Test PWA features
npm run build && npm run preview

# In browser:
- Check Service Worker (DevTools → Application)
- Test offline mode (Network → Offline)
- Run Lighthouse audit (Target: PWA 100)

# 4. Test on real devices
- Android: Chrome browser
- iOS: Safari browser
```

### TypeScript Type Checking
```bash
# Check for type errors
npx tsc --noEmit

# Fix common issues:
- Add types to function parameters
- Define interface for objects
- Use proper React types (FC, ReactNode, etc.)
```

---

## 📝 Git Workflow

### Branch Naming
```
feature/dosha-quiz-improvements
fix/chat-scroll-issue
docs/update-readme
refactor/routine-component
```

### Commit Messages
```bash
# Format: <type>: <description>

✅ Good:
git commit -m "feat: add lunar sync feature"
git commit -m "fix: resolve offline chat bug"
git commit -m "docs: update API documentation"
git commit -m "style: improve mobile responsiveness"

❌ Bad:
git commit -m "updates"
git commit -m "fixed stuff"
git commit -m "WIP"
```

### Pull Request Template
```markdown
## What
Brief description of changes

## Why
Reason for the change

## Changes
- Added X feature
- Fixed Y bug
- Refactored Z component

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Safari
- [ ] Tested on mobile
- [ ] Lighthouse audit passed
- [ ] No console errors

## Screenshots
[If applicable]
```

---

## 🚨 Common Pitfalls

### 1. Don't Break the Single Component
```tsx
// ❌ DON'T create separate component files unnecessarily
// /src/app/components/DoshaQuiz.tsx

// ✅ DO keep logic in Kayurveda.tsx
const renderDoshaQuiz = () => { ... }
```

### 2. Don't Skip PWA Testing
```bash
# ❌ Only testing in dev mode
npm run dev

# ✅ Test production build for PWA
npm run build && npm run preview
```

### 3. Don't Forget Mobile
```tsx
// ❌ Only testing on desktop
// ✅ Always test responsive design
- Chrome DevTools → Mobile view
- Test on real device
```

### 4. Don't Hardcode Values
```tsx
// ❌ Bad
const userName = "User";

// ✅ Good
const [userName, setUserName] = useState(
  localStorage.getItem("userName") || "User"
);
```

### 5. Don't Ignore Performance
```tsx
// ❌ Bad - Re-renders unnecessarily
const data = getData(); // Runs on every render

// ✅ Good - Memoized
const data = useMemo(() => getData(), [dependency]);
```

---

## 🎓 Learning Resources

### Required Reading
1. [React Docs](https://react.dev) - Hooks, state, effects
2. [Tailwind Docs](https://tailwindcss.com) - Utility classes
3. [PWA Guide](https://web.dev/progressive-web-apps) - PWA concepts
4. [TypeScript Handbook](https://typescriptlang.org/docs) - Types

### Recommended
- [Motion Docs](https://motion.dev) - Animations
- [Vite Guide](https://vitejs.dev) - Build tool
- [Lucide Icons](https://lucide.dev) - Icon reference

---

## 🤝 Team Communication

### Daily Standup Format
```
Yesterday: What I worked on
Today: What I'm working on
Blockers: Any issues
```

### Code Review Guidelines
- Be constructive and kind
- Ask questions, don't demand
- Explain the "why" behind suggestions
- Approve if minor issues
- Request changes if major issues

### Asking for Help
```
Good question format:
1. What I'm trying to do
2. What I've tried
3. Error message (if any)
4. Code snippet
5. Expected vs actual behavior
```

---

## 🎯 First Tasks (Starter Issues)

### Easy (Good First Issues)
1. Add a new dosha quiz question
2. Add a new KAYA response
3. Update colors in theme.css
4. Fix a typo in documentation
5. Add a new concern to bodyZones

### Medium
1. Add new wellness routine zone
2. Implement share functionality
3. Add animation to a component
4. Improve mobile responsiveness
5. Add new progress stat

### Advanced
1. Optimize Service Worker caching
2. Add camera functionality
3. Implement background sync
4. Add push notifications
5. Create export data feature

---

## 📊 Success Metrics

As a developer, you're doing well when:
- ✅ No console errors
- ✅ PWA audit score 100
- ✅ Mobile-responsive design
- ✅ Fast build times (<30s)
- ✅ Clean, readable code
- ✅ Proper TypeScript types
- ✅ Tests pass (when added)

---

## 🆘 Who to Ask

- **Architecture Questions** → Lead Developer
- **Design Questions** → UI/UX Team
- **PWA Issues** → DevOps Team
- **Ayurveda Content** → Content Team
- **General Help** → Team Chat

---

## 🎉 You're Ready!

After completing this guide, you should:
- ✅ Have a working dev environment
- ✅ Understand the architecture
- ✅ Know how to make changes
- ✅ Can test your work
- ✅ Follow team workflows

**Next Steps:**
1. Pick a starter issue
2. Create a branch
3. Make your changes
4. Test thoroughly
5. Open a PR
6. Get it reviewed
7. Merge and celebrate! 🎊

---

## 📞 Quick Help

```bash
# Can't start dev server?
rm -rf node_modules package-lock.json
npm install
npm run dev

# Build failing?
npm run build -- --debug

# TypeScript errors?
npx tsc --noEmit

# Git conflicts?
git fetch origin
git rebase origin/main

# PWA not working?
# Clear all browser data and try again
# Check Service Worker registration in console
```

---

**Welcome to the team! Let's build something amazing together.** 🚀

*Questions? Ask anytime. We're here to help!*

Version 1.0.0 | Developer Onboarding
