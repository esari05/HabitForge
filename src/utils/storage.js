const KEYS = { GOALS: 'hf_goals', HISTORY: 'hf_history' }

export const loadGoals = () => {
  try { const d = localStorage.getItem(KEYS.GOALS); return d ? JSON.parse(d) : null } catch { return null }
}
export const saveGoals = (goals) => {
  try { localStorage.setItem(KEYS.GOALS, JSON.stringify(goals)) } catch {}
}
export const loadHistory = () => {
  try { const d = localStorage.getItem(KEYS.HISTORY); return d ? JSON.parse(d) : {} } catch { return {} }
}
export const saveHistory = (history) => {
  try { localStorage.setItem(KEYS.HISTORY, JSON.stringify(history)) } catch {}
}
