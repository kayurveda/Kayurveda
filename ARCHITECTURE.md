# Kayurveda - Application Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         KAYURVEDA PWA                           │
│                   AI Ayurvedic Wellness App                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Entry Point                              │
│  /index.html → /src/main.tsx → /src/app/App.tsx               │
│     PWA Meta        Viewport         Root Wrapper               │
│     Service Worker  Init            Dark Theme                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Master Component                               │
│               /src/app/Kayurveda.tsx                           │
│                   (2000+ lines)                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │  State Management                                     │    │
│  │  • Screen Navigation    • Quiz Progress              │    │
│  │  • Dashboard Tabs       • User Dosha                 │    │
│  │  • Chat Messages        • Routine Tracking           │    │
│  └───────────────────────────────────────────────────────┘    │
│                           │                                     │
│  ┌────────────────────┬──────────────────┬──────────────────┐ │
│  │   Screen Renders   │  Helper Funcs    │   Data Sources   │ │
│  │  • Welcome         │  • handleAnswer  │  • doshaQuestions│ │
│  │  • Quiz            │  • toggleConcern │  • bodyZones     │ │
│  │  • Reveal          │  • sendMessage   │  • routineData   │ │
│  │  • Concerns        │  • getGreeting   │  • kayaResponses │ │
│  │  • Unlock          │  • toggleStep    │  • progressCards │ │
│  │  • Dashboard       │                  │                  │ │
│  └────────────────────┴──────────────────┴──────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  UI Components   │ │   PWA Utils      │ │   Styling        │
│                  │ │                  │ │                  │
│ • Button         │ │ • isPWA()        │ │ • fonts.css      │
│ • Input          │ │ • isOnline()     │ │ • theme.css      │
│ • Progress       │ │ • showNotif()    │ │ • tailwind.css   │
│ • InstallPrompt  │ │ • shareContent() │ │ • index.css      │
│ • 40+ Shadcn UI  │ │ • vibrate()      │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

## 📊 Data Flow

```
User Interaction
       │
       ▼
┌──────────────────┐
│  Event Handler   │
│  (onClick, etc)  │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  State Update    │
│  (useState hook) │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Re-render       │
│  (React)         │
└──────────────────┘
       │
       ▼
┌──────────────────┐      ┌──────────────────┐
│  LocalStorage    │◄────►│  Component State │
│  Persistence     │      │  (In Memory)     │
└──────────────────┘      └──────────────────┘
```

## 🎭 Screen Flow

```
                   START
                     │
                     ▼
         ┌────────────────────┐
         │  Welcome Screen    │
         │  • Logo animation  │
         │  • Feature preview │
         │  • CTA button      │
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │   Dosha Quiz       │
         │  • 8 questions     │
         │  • Progress bar    │
         │  • Back navigation │
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │  Dosha Reveal      │
         │  • Result emoji    │
         │  • Characteristics │
         │  • Balance chart   │
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │ Concern Selection  │
         │  • 4 body zones    │
         │  • Multi-select    │
         │  • Count display   │
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │ Dashboard Unlock   │
         │  • KAYA loader     │
         │  • 5 stage messages│
         │  • Progress bar    │
         └────────────────────┘
                     │
                     ▼
         ┌────────────────────┐
         │    Dashboard       │
         │  ┌──────────────┐  │
         │  │     Home     │  │
         │  ├──────────────┤  │
         │  │   Routine    │  │
         │  ├──────────────┤  │
         │  │     KAYA     │  │
         │  ├──────────────┤  │
         │  │   Progress   │  │
         │  ├──────────────┤  │
         │  │   Profile    │  │
         │  └──────────────┘  │
         │  Bottom Navigation │
         └────────────────────┘
```

## 🗂️ Component Hierarchy

```
App (Root)
└── Kayurveda (Master Component)
    ├── Welcome Screen
    │   ├── KayaLogo
    │   ├── Animated Particles
    │   └── CTA Button
    │
    ├── Dosha Quiz
    │   ├── KayaLogo
    │   ├── Progress Bar
    │   ├── Question Card
    │   │   └── Option Buttons
    │   └── Back Button
    │
    ├── Dosha Reveal
    │   ├── KayaLogo
    │   ├── Dosha Emoji
    │   ├── Info Card
    │   ├── Characteristics List
    │   ├── Balance Chart
    │   └── Continue Button
    │
    ├── Concern Selection
    │   ├── KayaLogo
    │   ├── Body Zone Cards (4)
    │   │   └── Concern Buttons
    │   └── Continue Button
    │
    ├── Dashboard Unlock
    │   ├── KAYA Logo (Animated)
    │   ├── Progress Bar
    │   ├── Stage Messages
    │   └── Loading Dots
    │
    └── Dashboard
        ├── Home Tab
        │   ├── Greeting Card
        │   ├── Today's Rituals
        │   ├── Quick Stats Grid
        │   ├── KAYA Nudge Card
        │   └── Quick Actions
        │
        ├── Routine Tab
        │   ├── Time Toggle (Morning/Night)
        │   ├── Progress Bar
        │   └── Zone Groups
        │       └── Step Cards (Checkboxes)
        │
        ├── KAYA Tab
        │   ├── Chat Header
        │   ├── Message List
        │   │   └── Message Bubbles
        │   ├── Typing Indicator
        │   ├── Suggested Questions
        │   └── Input Bar
        │
        ├── Progress Tab
        │   ├── Stats Cards
        │   ├── Weekly Chart
        │   ├── Photo Progress
        │   ├── Share Card
        │   └── KAYA Insight
        │
        ├── Profile Tab
        │   ├── Profile Header
        │   ├── Dosha Card
        │   ├── Menu Sections
        │   ├── Active Concerns
        │   ├── About Card
        │   └── Sign Out
        │
        ├── Bottom Navigation (5 tabs)
        └── InstallPrompt (PWA)
```

## 🔄 State Management

```
┌─────────────────────────────────────────────┐
│         Component State (React Hooks)       │
├─────────────────────────────────────────────┤
│                                             │
│  currentScreen      → Navigation state      │
│  dashboardTab       → Active tab            │
│  currentQuestion    → Quiz progress         │
│  doshaAnswers       → Quiz responses        │
│  userDosha          → Calculated result     │
│  doshaScores        → Balance percentages   │
│  selectedConcerns   → User concerns         │
│  completedSteps     → Routine checkboxes    │
│  messages           → Chat history          │
│  inputValue         → Chat input            │
│  isTyping           → Chat indicator        │
│                                             │
└─────────────────────────────────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────┐       ┌─────────────────┐
│  LocalStorage   │       │   In-Memory     │
│  (Persistent)   │       │   (Temporary)   │
├─────────────────┤       ├─────────────────┤
│ • userDosha     │       │ • currentScreen │
│ • doshaScores   │       │ • dashboardTab  │
│ • userConcerns  │       │ • messages      │
│ • currentScreen │       │ • isTyping      │
└─────────────────┘       └─────────────────┘
```

## 🎨 Styling Architecture

```
┌─────────────────────────────────────────────┐
│            Tailwind CSS v4.0                │
│         (Utility-First Framework)           │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌────────────────┐    ┌────────────────┐
│  theme.css     │    │  fonts.css     │
│  • CSS Vars    │    │  • SF Pro      │
│  • Dark Theme  │    │  • Helvetica   │
│  • Colors      │    │  • System Font ��
│  • Radii       │    │  • Smoothing   │
└────────────────┘    └────────────────┘
        │                       │
        └───────────┬───────────┘
                    ▼
        ┌────────────────────┐
        │   Inline Classes   │
        │   • bg-black       │
        │   • text-white     │
        │   • rounded-2xl    │
        │   • p-6 gap-4      │
        └────────────────────┘
```

## 🔌 PWA Integration

```
                  Browser
                     │
        ┌────────────┼────────────┐
        │                         │
        ▼                         ▼
┌───────────────┐         ┌───────────────┐
│  index.html   │         │  manifest.json│
│  • Meta tags  │         │  • Name       │
│  • Icons      │         │  • Icons      │
│  • Viewport   │         │  • Colors     │
│  • SW loader  │         │  • Display    │
└───────────────┘         └───────────────┘
        │                         │
        └────────────┬────────────┘
                     ▼
            ┌────────────────┐
            │  Service Worker│
            │  (sw.js)       │
            └────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Cache   │  │  Fetch   │  │  Sync    │
│  Assets  │  │  Events  │  │  Events  │
└──────────┘  └──────────┘  └──────────┘
```

## 📦 Build Pipeline

```
Source Code
    │
    ▼
┌─────────────────┐
│  Vite Dev       │
│  • Hot Reload   │
│  • Fast Refresh │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  TypeScript     │
│  • Type Check   │
│  • Transpile    │
└─────────────────┘
    │
    ▼
┌─────��───────────┐
│  React          │
│  • JSX Transform│
│  • Minify       │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Tailwind CSS   │
│  • Purge Unused │
│  • Minify       │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  Bundle         │
│  • Code Split   │
│  • Tree Shake   │
│  • Optimize     │
└─────────────────┘
    │
    ▼
┌─────────────────┐
│  /dist Output   │
│  • index.html   │
│  • assets/*.js  │
│  • assets/*.css │
└─────────────────┘
```

## 🌐 Network Architecture

```
           User Device
                │
    ┌───────────┼───────────┐
    │                       │
    ▼                       ▼
┌─────────┐           ┌─────────┐
│ Online  │           │ Offline │
└─────────┘           └─────────┘
    │                       │
    ▼                       ▼
┌─────────┐           ┌─────────┐
│ Network │           │ Cache   │
│ Request │           │ Storage │
└─────────┘           └─────────┘
    │                       │
    ▼                       ▼
┌─────────┐           ┌─────────┐
│ CDN/    │           │ Service │
│ Server  │           │ Worker  │
└─────────┘           └─────────┘
    │                       │
    └───────────┬───────────┘
                ▼
        ┌───────────────┐
        │  App Content  │
        │  Rendered     │
        └───────────────┘
```

## 🔐 Data Security

```
┌──────────────────────────────────────┐
│          User Data Layer             │
├──────────────────────────────────────┤
│  • No PII collected                  │
│  • LocalStorage only                 │
│  • No external APIs                  │
│  • Client-side processing            │
└──────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────┐
│       Data Types Stored              │
├──────────────────────────────────────┤
│  ✅ Dosha type (vata/pitta/kapha)   │
│  ✅ Quiz answers (scores)           │
│  ✅ Selected concerns (strings)     │
│  ✅ Routine completion (booleans)   │
│  ✅ App preferences (settings)      │
│  ❌ No personal info                │
│  ❌ No health records               │
│  ❌ No account data                 │
└──────────────────────────────────────┘
```

## 📊 Performance Optimization

```
┌─────────────────────────────────────┐
│       Optimization Strategy         │
├─────────────────────────────────────┤
│                                     │
│  1. Code Splitting                  │
│     • React vendor bundle           │
│     • Motion vendor bundle          │
│     • UI vendor bundle              │
���                                     │
│  2. Lazy Loading                    │
│     • Images with loading="lazy"    │
│     • Components on demand          │
│                                     │
│  3. Caching                         │
│     • Service Worker cache          │
│     • Browser cache headers         │
│     • LocalStorage persistence      │
│                                     │
│  4. Minification                    │
│     • JavaScript minified           │
│     • CSS purged & minified         │
│     • HTML minified                 │
│                                     │
│  5. Compression                     │
│     • Gzip/Brotli enabled           │
│     • Asset optimization            │
│                                     │
└─────────────────────────────────────┘
```

---

## 🎓 Technology Stack

```
┌─────────────────────────────────────────┐
│          Frontend Framework             │
│  React 18.3.1 + TypeScript              │
└─────────────────────────────────────────┘
                   │
    ┌──────────────┼──────────────┐
    │              │              │
    ▼              ▼              ▼
┌────────┐   ┌────────┐   ┌────────┐
│ Motion │   │Tailwind│   │ Lucide │
│ 12.23  │   │ CSS 4  │   │ React  │
└────────┘   └────────┘   └────────┘

┌─────────────────────────────────────────┐
│           Build Tool                    │
│  Vite 6.3.5 (Fast HMR)                 │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           PWA Stack                     │
│  Service Worker + Web App Manifest      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│         Component Library               │
│  Shadcn UI (40+ components)            ���
└─────────────────────────────────────────┘
```

---

**This architecture ensures:**
- ✅ Maintainable single-component structure
- ✅ Offline-first PWA capabilities
- ✅ Optimal performance & load times
- ✅ Native-like user experience
- ✅ Secure client-side data handling
- ✅ Scalable and extensible design

**Version 1.0.0** | Kayurveda PWA Architecture
