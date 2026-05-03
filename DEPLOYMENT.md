# 🚀 Deployment Guide

This guide covers deploying CalAI to **Netlify** (web) and **Google Play Store** (Android).

---

## 🌐 Web Deployment (Netlify) — FREE

### 1. Build the project
```bash
npm run build
```

### 2. Deploy to Netlify
**Option A — Drag & Drop (easiest):**
1. Go to [netlify.com](https://netlify.com) and sign up
2. Click **"Add new site" → "Deploy manually"**
3. Drag the `dist/` folder onto the page
4. Your app is live in 30 seconds! ⚡

**Option B — GitHub integration (auto-deploy):**
1. Connect your GitHub repo to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Every push to `main` auto-deploys!

---

## 📱 Android Deployment (Google Play Store)

### Prerequisites
- [Node.js 18+](https://nodejs.org)
- [Android Studio](https://developer.android.com/studio)
- [Google Play Developer account](https://play.google.com/console) ($25 one-time fee)

### Step 1: Install Capacitor
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "CalAI" "com.yourname.calai"
```

### Step 2: Build and sync
```bash
npm run build
npx cap add android
npx cap sync android
```

### Step 3: Open in Android Studio
```bash
npx cap open android
```

### Step 4: Generate Signed APK/AAB
```
Build → Generate Signed Bundle/APK
→ Android App Bundle
→ Create new keystore (SAVE THIS FILE!)
→ Release build
```

### Step 5: Submit to Play Store
1. Go to [play.google.com/console](https://play.google.com/console)
2. Create new app
3. Fill store listing (title, description, screenshots)
4. Upload your `.aab` file
5. Submit for review (3-7 days)

---

## 🍎 iOS Deployment (App Store)

> **Requires:** Mac computer + Apple Developer account ($99/year)

```bash
npm install @capacitor/ios
npx cap add ios
npx cap sync ios
npx cap open ios  # Opens Xcode
```

In Xcode: Product → Archive → Distribute to App Store Connect

---

## ⚙️ Environment Variables

No server-side env vars needed! The Anthropic API key is entered by the user on first launch and stored in `localStorage`.

---

## 💡 Tips

- For production, consider adding a backend proxy to hide the API key
- Use [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) for server-side API calls
- Test on real mobile devices before submitting to stores
