# 🍎 Cal AI Clone — AI Calorie & Nutrition Tracker

A mobile-first React + Vite app that uses Claude AI to analyze food photos and estimate calories & macros.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173 — enter your Anthropic API key to begin.

> Get a free API key at https://console.anthropic.com

## ✨ Features

- **📷 Photo Scan** — Upload any food photo, AI identifies it and estimates nutrition
- **✏️ Text Input** — Type food descriptions for instant macro breakdown
- **⚡ Instant Results** — Calories, protein, carbs, fat, fiber, sugar, health score
- **📒 Food Diary** — All meals logged, grouped by date with expand/collapse
- **🏠 Today Dashboard** — Calorie ring, macro rings, remaining calories
- **📊 Weekly Chart** — 7-day calorie bar chart
- **💾 Persistent** — Everything saved to localStorage

## 🏗️ Tech Stack

- React 18 + React Router 6
- Vite 5
- Claude claude-sonnet-4-20250514 (Vision + Text)
- Google Fonts: Syne + DM Sans
- localStorage for persistence

## 📁 Structure

```
src/
  utils/analyzeFood.js   # Claude API integration
  pages/
    HomeScreen.jsx       # Today's dashboard
    ScanScreen.jsx       # Photo upload + manual input
    ResultScreen.jsx     # AI analysis results
    DiaryScreen.jsx      # Full food log history
    ProfileScreen.jsx    # Stats + weekly chart
  components/
    BottomNav.jsx
    MacroRing.jsx
    ApiKeySetup.jsx
```

## 🏆 Build for Production

```bash
npm run build
# Deploy the /dist folder to Netlify, Vercel, etc.
```
