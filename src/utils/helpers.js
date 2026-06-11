// ─── Date helpers ──────────────────────────────────────────────────────────────

export const dateToKey = (d) =>
  `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`

export const getTodayKey = () => dateToKey(new Date())

export const getDateKey = (offsetDays = 0) => {
  const d = new Date(); d.setDate(d.getDate() + offsetDays); return dateToKey(d)
}

export const formatDate = () =>
  new Date().toLocaleDateString('de-AT', { weekday:'long', day:'numeric', month:'long' })

export const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Guten Morgen'
  if (h < 18) return 'Guten Tag'
  return 'Guten Abend'
}

// ─── XP & Levels ───────────────────────────────────────────────────────────────
// Level N requires N × 120 XP to advance. Keeps it meaningful but achievable.

export const getLevelInfo = (totalXP) => {
  let level = 1, spent = 0
  while (true) {
    const need = level * 120
    if (spent + need > totalXP) {
      return { level, currentXP: totalXP - spent, nextLevelXP: need, progress: (totalXP - spent) / need }
    }
    spent += need; level++
  }
}

export const calculateTotalXP = (history, goals) => {
  const map = Object.fromEntries(goals.map(g => [g.id, g.xp]))
  return Object.values(history).flat().reduce((sum, id) => sum + (map[id] || 0), 0)
}

// ─── Streaks ───────────────────────────────────────────────────────────────────

export const calculateStreak = (history) => {
  const today = getTodayKey()
  const yesterday = getDateKey(-1)
  const todayDone = (history[today] || []).length > 0
  const ydayDone  = (history[yesterday] || []).length > 0

  if (!todayDone && !ydayDone) return 0

  let streak = 0
  const start = new Date()
  if (!todayDone) start.setDate(start.getDate() - 1)

  for (let i = 0; i < 999; i++) {
    const d = new Date(start); d.setDate(d.getDate() - i)
    if ((history[dateToKey(d)] || []).length === 0) break
    streak++
  }
  return streak
}

export const getLongestStreak = (history) => {
  if (!Object.keys(history).length) return 0
  const sorted = Object.keys(history).filter(k => (history[k]||[]).length > 0).sort()
  let longest = 0, current = 0, prev = null

  for (const key of sorted) {
    if (prev) {
      const diff = (new Date(key) - new Date(prev)) / 86400000
      current = diff === 1 ? current + 1 : 1
    } else { current = 1 }
    longest = Math.max(longest, current)
    prev = key
  }
  return longest
}

// ─── Weekly chart data ─────────────────────────────────────────────────────────

export const getLast7Days = (history, goals) =>
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i))
    const key = dateToKey(d)
    const completed = (history[key] || []).length
    const total = goals.length
    const isFuture = key > getTodayKey()
    return {
      key, date: d, isFuture,
      dayName: d.toLocaleDateString('de-AT', { weekday: 'short' }).slice(0,2),
      completed, total,
      ratio: total > 0 && !isFuture ? completed / total : null
    }
  })

// ─── Daily quote ───────────────────────────────────────────────────────────────

export const getDailyQuote = (quotes) => {
  const day = Math.floor(Date.now() / 86400000)
  return quotes[day % quotes.length]
}

// ─── ID generator ──────────────────────────────────────────────────────────────

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

// ─── Total completions ever ────────────────────────────────────────────────────

export const totalCompletionsEver = (history) =>
  Object.values(history).reduce((sum, arr) => sum + arr.length, 0)

export const totalActiveDays = (history) =>
  Object.values(history).filter(arr => arr.length > 0).length
