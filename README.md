# 🍎 CalAI — AI-Powered Calorie & Nutrition Tracker

> Snap a photo of any meal and instantly get calories, macros, and health insights powered by Claude AI.

![CalAI Banner](https://img.shields.io/badge/CalAI-Nutrition%20Tracker-a8e063?style=for-the-badge&logo=leaf&logoColor=black)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)](https://vitejs.dev)
[![Claude AI](https://img.shields.io/badge/Claude-AI-ff6b35?style=flat)](https://anthropic.com)

---

## ✨ Features

- **📷 AI Photo Scan** — Upload any food photo, Claude AI identifies it and estimates full nutrition
- **✏️ Text Analysis** — Type any food description for instant macro breakdown
- **⚡ Detailed Results** — Calories, protein, carbs, fat, fiber, sugar, health score /10
- **📒 Food Diary** — All meals logged, grouped by date with expandable details
- **🏠 Today Dashboard** — Animated calorie ring, macro rings, remaining calories
- **📊 Weekly Chart** — 7-day calorie bar chart visualization
- **💾 Persistent Storage** — All data saved locally via localStorage
- **📱 Mobile-First** — Designed for mobile, works on all screen sizes

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Khushnoorkm1/Calorie-Tracker.git
cd Calorie-Tracker

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

> 🔑 You'll be prompted to enter your Anthropic API key on first launch.
> Get a free key at [console.anthropic.com](https://console.anthropic.com)

---

## 🔑 API Key Setup

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up for a free account
3. Navigate to **API Keys** and create a new key
4. Paste it into the app on first launch

Your key is stored **locally on your device only** — never sent anywhere else.

---

## 📱 Screenshots

| Today Dashboard | Scan Screen | AI Results |
|---|---|---|
| Calorie ring + macros | Photo upload + text | Full nutrition breakdown |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI Framework |
| **React Router 6** | Client-side routing |
| **Vite 5** | Build tool & dev server |
| **Claude claude-sonnet-4-20250514** | AI food analysis (vision + text) |
| **Google Fonts** | Syne + DM Sans typography |
| **localStorage** | Data persistence |

---

## 📁 Project Structure

```
src/
├── utils/
│   └── analyzeFood.js      # Claude API integration
├── pages/
│   ├── HomeScreen.jsx       # Today's calorie dashboard
│   ├── ScanScreen.jsx       # Photo upload + manual input
│   ├── ResultScreen.jsx     # AI analysis results
│   ├── DiaryScreen.jsx      # Full food log history
│   └── ProfileScreen.jsx   # Stats + weekly chart
├── components/
│   ├── BottomNav.jsx        # Mobile navigation bar
│   ├── MacroRing.jsx        # Animated SVG macro rings
│   └── ApiKeySetup.jsx      # First-launch key setup
├── App.jsx                  # Router + global context
├── main.jsx                 # Entry point
└── index.css               # Design system + animations
```

---

## 🏆 Build for Production

```bash
npm run build
# Deploys the /dist folder — upload to Netlify, Vercel, etc.
```

---

## 📲 Android / Play Store

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full Capacitor + Google Play Store deployment guide.

---

## 📄 License

MIT License — feel free to use, modify, and distribute.

---

*Built with ❤️ using Claude AI + React + Vite*
