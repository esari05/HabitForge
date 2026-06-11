*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }

:root {
  --bg:          #0B0E1A;
  --bg-card:     #131A2E;
  --bg-elevated: #1C2542;
  --primary:     #FF8A2B;
  --primary-dim: rgba(255,138,43,0.16);
  --gold:        #FFC247;
  --gold-dim:    rgba(255,194,71,0.14);
  --fire:        #FF5C39;
  --fire-dim:    rgba(255,92,57,0.16);
  --red:         #FF3D5A;
  --success:     #2EE6A8;
  --success-dim: rgba(46,230,168,0.14);
  --danger:      #FF5C7A;
  --text:        #F2EDE4;
  --text-muted:  #6C7595;
  --border:      rgba(255,194,71,0.10);
  --nav-h:       68px;
  --r:           14px;
  --r-sm:        10px;
}

html, body { height: 100%; background: var(--bg); color: var(--text); }

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  overscroll-behavior: none;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3 { font-family: 'Bangers', 'Space Grotesk', sans-serif; letter-spacing: 0.04em; font-weight: 400; }
.display { font-family: 'Bangers', sans-serif; letter-spacing: 0.05em; font-weight: 400; }
.num { font-family: 'Space Grotesk', sans-serif; font-weight: 700; }

#root { height: 100%; }

.app {
  display: flex; flex-direction: column;
  height: 100%; max-width: 430px; margin: 0 auto;
  position: relative; overflow: hidden;
}

/* manga speed-line texture, very subtle */
.app::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(115deg, transparent 0 26px, rgba(255,194,71,0.018) 26px 28px);
  pointer-events: none;
  z-index: 0;
}
.app > * { position: relative; z-index: 1; }

/* ── Screen ───────────────────────────────────────── */
.screen {
  flex: 1; overflow-y: auto; overflow-x: hidden;
  padding: 0 0 calc(var(--nav-h) + 8px + env(safe-area-inset-bottom));
  -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.screen::-webkit-scrollbar { display: none; }

/* ── Bottom Nav ───────────────────────────────────── */
.bottom-nav {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 430px;
  height: calc(var(--nav-h) + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(19,26,46,0.94);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-top: 2px solid var(--border);
  display: flex; align-items: center; justify-content: space-around;
  z-index: 100;
}
.nav-btn {
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 8px 12px; background: none; border: none; cursor: pointer;
  color: var(--text-muted); transition: color 0.2s, transform 0.15s; min-width: 60px;
}
.nav-btn.active { color: var(--gold); transform: translateY(-2px); }
.nav-btn:active { opacity: 0.7; }
.nav-icon { font-size: 22px; line-height: 1; }
.nav-label { font-family: 'Bangers', sans-serif; font-size: 11px; letter-spacing: 0.08em; }

/* ── Section label ────────────────────────────────── */
.section-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px; margin-bottom: 10px;
}
.section-title {
  font-family: 'Bangers', sans-serif;
  font-size: 14px; letter-spacing: 0.12em;
  color: var(--gold);
  text-transform: uppercase;
}

.card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r); }

/* ── Buttons ──────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  border: none; cursor: pointer;
  font-family: 'Bangers', sans-serif; letter-spacing: 0.06em;
  transition: opacity 0.15s, transform 0.1s;
  border-radius: var(--r-sm);
}
.btn:active { transform: scale(0.96); opacity: 0.85; }
.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--red));
  color: #fff; padding: 15px 24px; font-size: 18px; width: 100%;
  box-shadow: 0 4px 20px rgba(255,92,57,0.3);
}
.btn-ghost {
  background: var(--bg-elevated); color: var(--text);
  padding: 11px 16px; font-size: 16px; border: 1px solid var(--border);
}
.btn-danger { background: rgba(255,92,122,0.12); color: var(--danger); padding: 10px 16px; font-size: 15px; }

/* ── Input ────────────────────────────────────────── */
.input {
  width: 100%; background: var(--bg-elevated);
  border: 1.5px solid var(--border); border-radius: var(--r-sm);
  color: var(--text); font-family: 'Inter', sans-serif; font-size: 16px;
  padding: 13px 16px; outline: none; transition: border-color 0.2s;
}
.input:focus { border-color: var(--gold); }
.input::placeholder { color: var(--text-muted); }

/* ── Pill ─────────────────────────────────────────── */
.pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 11px; border-radius: 99px;
  font-family: 'Bangers', sans-serif; font-size: 13px; letter-spacing: 0.05em;
}
.pill-fire  { background: var(--fire-dim); color: var(--fire); }
.pill-xp    { background: var(--gold-dim); color: var(--gold); }
.pill-green { background: var(--success-dim); color: var(--success); }

/* ── Today ────────────────────────────────────────── */
.today-header { padding: 56px 20px 20px; }
.today-greeting {
  font-family: 'Bangers', sans-serif;
  font-size: 34px; line-height: 1.05; letter-spacing: 0.04em;
  margin-bottom: 4px;
  background: linear-gradient(120deg, var(--gold), var(--fire));
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}
.today-date { font-size: 14px; color: var(--text-muted); margin-bottom: 14px; text-transform: capitalize; }
.today-pills { display: flex; gap: 8px; flex-wrap: wrap; }

.quote-wrap { padding: 0 20px 22px; }
.quote-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--gold);
  border-radius: var(--r);
  padding: 16px 18px;
  position: relative; overflow: hidden;
}
.quote-card::after {
  content: '';
  position: absolute; top: 0; right: 0; width: 90px; height: 100%;
  background: repeating-linear-gradient(105deg, transparent 0 7px, rgba(255,194,71,0.05) 7px 9px);
  pointer-events: none;
}
.quote-text { font-size: 14.5px; line-height: 1.6; font-style: italic; }
.quote-author { font-size: 12px; color: var(--gold); margin-top: 8px; font-style: normal; font-family: 'Bangers', sans-serif; letter-spacing: 0.06em; }

.goals-wrap { padding: 0 20px; }
.goal-list { display: flex; flex-direction: column; gap: 10px; }

.goal-card {
  display: flex; align-items: center; gap: 14px;
  padding: 16px;
  background: var(--bg-card);
  border: 1.5px solid var(--border);
  border-radius: var(--r);
  cursor: pointer; width: 100%; text-align: left;
  transition: background 0.2s, border-color 0.2s, transform 0.15s;
  position: relative; overflow: hidden;
}
.goal-card:active { background: var(--bg-elevated); }
.goal-card.done { background: rgba(46,230,168,0.06); border-color: rgba(46,230,168,0.3); }
.goal-card.done .goal-name { color: var(--text-muted); text-decoration: line-through; }

.goal-emoji { font-size: 28px; line-height: 1; flex-shrink: 0; }
.goal-info { flex: 1; min-width: 0; }
.goal-name { display: block; font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 15px; }
.goal-xp-badge { display: inline-block; font-size: 12px; color: var(--gold); font-weight: 600; margin-top: 2px; font-family: 'Space Grotesk', sans-serif; }

.check-circle {
  width: 30px; height: 30px; border-radius: 50%;
  border: 2.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: background 0.2s, border-color 0.2s, transform 0.2s;
  font-size: 15px; color: transparent;
}
.goal-card.done .check-circle { background: var(--success); border-color: var(--success); color: #06281C; transform: scale(1.08); }

.daily-progress-wrap { padding: 20px 20px 0; }
.progress-bar-bg { height: 8px; border-radius: 99px; background: var(--bg-elevated); overflow: hidden; margin-bottom: 8px; }
.progress-bar-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, var(--gold), var(--fire));
  transition: width 0.6s cubic-bezier(0.34,1.56,0.64,1);
}
.progress-label { font-size: 13px; color: var(--text-muted); display: flex; justify-content: space-between; }
.progress-label span { font-weight: 600; color: var(--text); }

.empty-hint { padding: 32px 20px; text-align: center; color: var(--text-muted); font-size: 14px; line-height: 1.7; }
.empty-hint .hint-emoji { font-size: 36px; margin-bottom: 12px; display: block; }

/* ── Progress screen ──────────────────────────────── */
.screen-title { font-family: 'Bangers', sans-serif; font-size: 26px; letter-spacing: 0.05em; }

.xp-ring-wrap { display: flex; flex-direction: column; align-items: center; padding: 8px 20px 28px; gap: 4px; }
.xp-ring-svg { position: relative; }
.xp-ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.level-label { font-size: 13px; letter-spacing: 0.18em; color: var(--gold); font-family: 'Bangers', sans-serif; }
.level-num { font-family: 'Bangers', sans-serif; font-size: 58px; line-height: 1; }
.xp-label { font-size: 12px; color: var(--text-muted); margin-top: 2px; font-family: 'Space Grotesk', sans-serif; }
.xp-progress-text { font-size: 14px; color: var(--text-muted); }
.xp-progress-text strong { color: var(--gold); font-family: 'Space Grotesk', sans-serif; }

.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 0 20px 24px; }
.stat-card {
  background: var(--bg-card); border: 1px solid var(--border);
  border-radius: var(--r); padding: 16px;
  display: flex; flex-direction: column; gap: 4px;
}
.stat-icon { font-size: 22px; margin-bottom: 6px; }
.stat-num { font-family: 'Bangers', sans-serif; font-size: 32px; line-height: 1; }
.stat-label { font-size: 12px; color: var(--text-muted); }

.week-wrap { padding: 0 20px 24px; }
.week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 8px; margin-top: 12px; }
.week-day { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.week-dot {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; font-size: 14px;
  font-family: 'Space Grotesk', sans-serif; font-weight: 700;
}
.week-dot.full    { background: linear-gradient(135deg, var(--gold), var(--fire)); color: #2A1200; }
.week-dot.partial { background: var(--fire-dim); border: 2px solid var(--fire); color: var(--fire); }
.week-dot.empty   { background: var(--bg-elevated); border: 2px solid var(--border); }
.week-dot.future  { background: transparent; border: 2px dashed var(--border); }
.week-dot-label { font-size: 11px; color: var(--text-muted); font-family: 'Bangers', sans-serif; letter-spacing: 0.05em; }

/* ── Goals manage ─────────────────────────────────── */
.goals-screen-header { padding: 56px 20px 20px; }
.goals-manage-list { padding: 0 20px; display: flex; flex-direction: column; gap: 10px; }
.goal-manage-card {
  display: flex; align-items: center; gap: 14px; padding: 14px 16px;
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r);
}
.goal-manage-info { flex: 1; min-width: 0; }
.goal-manage-name { font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 15px; display: block; }
.goal-manage-xp { font-size: 12px; color: var(--gold); margin-top: 2px; display: block; }
.goal-manage-actions { display: flex; gap: 6px; }

.icon-btn {
  width: 36px; height: 36px; border-radius: 8px; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; transition: opacity 0.15s; background: var(--bg-elevated);
}
.icon-btn:active { opacity: 0.7; }
.icon-btn.del { background: rgba(255,92,122,0.1); }

.add-goal-wrap { padding: 20px 20px 0; }
.add-goal-form {
  background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--r);
  padding: 18px; display: flex; flex-direction: column; gap: 14px; margin-bottom: 16px;
}
.form-label {
  font-size: 13px; color: var(--gold);
  font-family: 'Bangers', sans-serif; letter-spacing: 0.1em;
  margin-bottom: 6px; display: block;
}

.emoji-grid { display: grid; grid-template-columns: repeat(9, 1fr); gap: 4px; }
.emoji-opt {
  aspect-ratio: 1; border-radius: 8px; background: var(--bg-elevated);
  border: 2px solid transparent; font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: border-color 0.15s, background 0.15s;
}
.emoji-opt.selected { border-color: var(--gold); background: var(--gold-dim); }
.emoji-opt:active { opacity: 0.7; }

.xp-opts { display: flex; gap: 8px; }
.xp-opt {
  flex: 1; padding: 10px 8px; background: var(--bg-elevated);
  border: 2px solid transparent; border-radius: 8px; cursor: pointer;
  text-align: center; transition: border-color 0.15s, background 0.15s;
}
.xp-opt.selected { border-color: var(--gold); background: var(--gold-dim); }
.xp-opt-label { font-size: 12px; color: var(--text-muted); display: block; font-family: 'Bangers', sans-serif; letter-spacing: 0.05em; }
.xp-opt-val { font-size: 17px; font-weight: 700; font-family: 'Space Grotesk', sans-serif; }
.xp-opt.selected .xp-opt-val { color: var(--gold); }

/* ── Notif bar ────────────────────────────────────── */
.notif-bar {
  margin: 16px 20px 0; padding: 14px 16px;
  background: var(--gold-dim); border: 1px solid rgba(255,194,71,0.35);
  border-radius: var(--r-sm);
  display: flex; align-items: center; gap: 12px;
}
.notif-text { flex: 1; font-size: 13px; line-height: 1.4; }
.notif-btn {
  background: linear-gradient(135deg, var(--primary), var(--red));
  color: #fff; border: none; border-radius: 8px;
  padding: 8px 14px; font-size: 14px;
  font-family: 'Bangers', sans-serif; letter-spacing: 0.05em;
  cursor: pointer; white-space: nowrap; flex-shrink: 0;
}

.all-done-banner {
  margin: 16px 20px 0; padding: 18px;
  background: var(--success-dim); border: 1.5px solid rgba(46,230,168,0.35);
  border-radius: var(--r); text-align: center;
}
.all-done-emoji { font-size: 34px; }
.all-done-title { font-family: 'Bangers', sans-serif; font-size: 22px; letter-spacing: 0.05em; color: var(--success); margin: 4px 0; }
.all-done-sub { font-size: 13px; color: var(--text-muted); }

/* ── Onboarding & Check-in ────────────────────────── */
.onboard {
  flex: 1; display: flex; flex-direction: column;
  padding: 64px 24px 32px; overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.onboard-logo {
  font-family: 'Bangers', sans-serif; font-size: 44px; letter-spacing: 0.05em;
  line-height: 1; text-align: center; margin-bottom: 4px;
  background: linear-gradient(120deg, var(--gold), var(--fire), var(--red));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.onboard-sub { text-align: center; color: var(--text-muted); font-size: 14px; margin-bottom: 32px; }
.onboard-title { font-family: 'Bangers', sans-serif; font-size: 28px; letter-spacing: 0.04em; margin-bottom: 6px; }
.onboard-desc { color: var(--text-muted); font-size: 14px; margin-bottom: 24px; line-height: 1.6; }
.onboard-fields { display: flex; flex-direction: column; gap: 16px; flex: 1; }
.onboard-footer { margin-top: 28px; }

.step-dots { display: flex; gap: 8px; justify-content: center; margin-bottom: 36px; }
.step-dot { width: 8px; height: 8px; border-radius: 99px; background: var(--bg-elevated); transition: all 0.3s; }
.step-dot.active { width: 28px; background: linear-gradient(90deg, var(--gold), var(--fire)); }
.step-dot.done { background: var(--gold); }

.chip-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  padding: 10px 16px; border-radius: 99px;
  background: var(--bg-elevated); border: 2px solid transparent;
  color: var(--text); font-size: 14px; cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
  font-family: 'Inter', sans-serif;
}
.chip.selected { border-color: var(--gold); background: var(--gold-dim); color: var(--gold); }

.checkin {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 32px 28px; text-align: center;
}
.checkin-streak { font-size: 64px; line-height: 1; margin-bottom: 8px; }
.checkin-title { font-family: 'Bangers', sans-serif; font-size: 36px; letter-spacing: 0.05em; line-height: 1.1; margin-bottom: 8px;
  background: linear-gradient(120deg, var(--gold), var(--fire));
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.checkin-sub { color: var(--text-muted); font-size: 14px; margin-bottom: 28px; }
.checkin-quote {
  background: var(--bg-card); border: 1px solid var(--border);
  border-left: 4px solid var(--gold); border-radius: var(--r);
  padding: 16px 18px; margin-bottom: 36px; text-align: left; max-width: 340px;
}

/* ── Profile ──────────────────────────────────────── */
.profile-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px; background: var(--bg-card);
  border: 1px solid var(--border); border-radius: var(--r);
  gap: 12px;
}
.profile-row-label { font-size: 14px; color: var(--text-muted); }
.profile-row-value { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 15px; }
.profile-input {
  width: 90px; background: var(--bg-elevated);
  border: 1.5px solid var(--border); border-radius: 8px;
  color: var(--text); font-size: 15px; padding: 8px 12px;
  outline: none; text-align: right; font-family: 'Space Grotesk', sans-serif;
}
.profile-input:focus { border-color: var(--gold); }

.toggle {
  width: 52px; height: 30px; border-radius: 99px;
  background: var(--bg-elevated); border: none; cursor: pointer;
  position: relative; transition: background 0.2s; flex-shrink: 0;
}
.toggle.on { background: linear-gradient(90deg, var(--gold), var(--fire)); }
.toggle::after {
  content: ''; position: absolute; top: 3px; left: 3px;
  width: 24px; height: 24px; border-radius: 50%;
  background: #fff; transition: transform 0.2s;
}
.toggle.on::after { transform: translateX(22px); }
