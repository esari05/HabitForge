# HabitForge 🔥

Personal daily habit tracker with XP, streaks, and motivational quotes. Built as a PWA — works like a native app on your iPhone.

## Features

- ✅ Daily goal checklist
- ⚡ XP & leveling system
- 🔥 Streak tracking
- 💬 Motivational quote of the day
- 📊 Progress dashboard with weekly overview
- 🎯 Add/edit/delete custom goals
- 📱 Installable on iPhone home screen (PWA)
- 🔔 Push notification support (iOS 16.4+)
- 💾 All data stored locally on your device

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start local dev server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Install on iPhone

1. Deploy to Vercel (see below) or access via local Wi-Fi
2. Open the URL in **Safari** on iPhone
3. Tap the **Share button** → "Zum Home-Bildschirm"
4. Done — it's now on your home screen like a native app!

> **Push notifications**: Tap "Aktivieren" inside the app. Requires iOS 16.4+ and the app must be installed on home screen.

---

## Deploy to Vercel (free, recommended)

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → "New Project" → import your repo
3. Click Deploy — done!

Your app gets a free HTTPS URL like `https://habitforge-xyz.vercel.app`

---

## Local network access (no hosting needed)

```bash
npm run dev -- --host
```

Note the IP address (e.g. `http://192.168.1.5:5173`) and open it on your iPhone while connected to the same Wi-Fi.

> Push notifications don't work without HTTPS, but everything else does.

---

## Build for production

```bash
npm run build
npm run preview  # test the production build locally
```

---

## Customizing goals

Go to the **Ziele** tab → tap **+ Neues Ziel hinzufügen**. Pick an emoji, set the difficulty/XP reward, and name it.

Default goals (edit or delete as you like):
- 🏋️ Gym Training — 35 XP
- 🏃 3km Laufen — 25 XP
- 💧 2L Wasser — 10 XP
