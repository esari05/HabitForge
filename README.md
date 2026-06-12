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

---

## 🔔 Push-Server Setup (einmalig, ~10 Minuten)

Damit du **echte tägliche Push-Erinnerungen** bekommst (auch wenn die App geschlossen ist):

### Schritt 1: VAPID Keys generieren

Im Projektordner auf deinem PC:

```bash
npx web-push generate-vapid-keys
```

Du bekommst einen **Public Key** und einen **Private Key** — kopier dir beide.

### Schritt 2: Environment Variables in Vercel setzen

Vercel Dashboard → dein Projekt → **Settings** → **Environment Variables**:

| Name | Wert |
|---|---|
| `VAPID_PUBLIC_KEY` | dein Public Key |
| `VAPID_PRIVATE_KEY` | dein Private Key |
| `VAPID_SUBJECT` | `mailto:deine@email.com` (irgendeine deiner E-Mails) |

### Schritt 3: Upstash Redis verbinden (kostenloser Speicher)

1. Vercel Dashboard → dein Projekt → Tab **Storage**
2. **Upstash Redis** auswählen → **Create** (Free Plan)
3. Mit deinem Projekt verbinden — die Env-Variablen werden automatisch gesetzt

### Schritt 4: Neuen Code deployen

Aktualisierte Dateien ins GitHub-Repo hochladen → Vercel deployt automatisch.

### Schritt 5: Auf dem iPhone aktivieren

1. App vom **Home-Bildschirm** öffnen (nicht Safari!)
2. **Profil** → Toggle "Tägliche Push-Erinnerung" → erlauben
3. Fertig! 🎉

### Testen

Öffne `https://deine-app.vercel.app/api/send-reminder?force=1` im Browser —
du solltest sofort eine Test-Push aufs iPhone bekommen.

### ⏰ Wichtig: Erinnerungszeit

Vercel's kostenloser Cron läuft **1x täglich** zur Zeit in `vercel.json`
(aktuell `0 6 * * *` = 6:00 UTC = **8:00 Wien** im Sommer). Wenn du eine andere
Uhrzeit willst, passe BEIDES an: die Zeit in der App UND den Cron in `vercel.json`
(UTC! Wien = UTC+2 im Sommer, UTC+1 im Winter).

**Alternative für minutengenaue Erinnerungen:** Registriere dich kostenlos auf
[cron-job.org](https://cron-job.org) und lass `https://deine-app.vercel.app/api/send-reminder`
alle 30 Minuten aufrufen — dann gilt automatisch die Zeit aus der App, und es wird
trotzdem nur 1x pro Tag gesendet.
