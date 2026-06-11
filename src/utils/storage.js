const KEYS = { GOALS: 'hf_goals', HISTORY: 'hf_history', PROFILE: 'hf_profile', CHECKIN: 'hf_last_checkin', SETTINGS: 'hf_settings' }

const load = (k, fb) => { try { const d = localStorage.getItem(k); return d ? JSON.parse(d) : fb } catch { return fb } }
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

export const loadGoals    = () => load(KEYS.GOALS, null)
export const saveGoals    = (g) => save(KEYS.GOALS, g)
export const loadHistory  = () => load(KEYS.HISTORY, {})
export const saveHistory  = (h) => save(KEYS.HISTORY, h)
export const loadProfile  = () => load(KEYS.PROFILE, null)
export const saveProfile  = (p) => save(KEYS.PROFILE, p)
export const loadCheckin  = () => load(KEYS.CHECKIN, null)
export const saveCheckin  = (d) => save(KEYS.CHECKIN, d)
export const loadSettings = () => load(KEYS.SETTINGS, { reminderTime: '08:00', notifications: false })
export const saveSettings = (s) => save(KEYS.SETTINGS, s)
