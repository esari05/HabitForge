import { getLast7Days, getLongestStreak, totalCompletionsEver, totalActiveDays, getTodayKey } from '../utils/helpers.js'

function XPRing({ level, currentXP, nextLevelXP, progress }) {
  const R = 76, stroke = 10
  const r = R - stroke / 2
  const circ = 2 * Math.PI * r
  const offset = circ - progress * circ
  const size = R * 2

  return (
    <div className="xp-ring-wrap">
      <div className="xp-ring-svg" style={{ width: size, height: size, position: 'relative' }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id="xpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C6CF8" />
              <stop offset="100%" stopColor="#B06AF5" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle cx={R} cy={R} r={r} fill="none"
            stroke="rgba(124,108,248,0.12)" strokeWidth={stroke} />
          {/* Progress */}
          <circle cx={R} cy={R} r={r} fill="none"
            stroke="url(#xpGrad)" strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circ} ${circ}`}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${R} ${R})`}
            style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34,1.2,0.64,1)' }}
          />
        </svg>
        <div className="xp-ring-inner">
          <span className="level-label">LEVEL</span>
          <span className="level-num">{level}</span>
          <span className="xp-label">{currentXP}<span style={{ opacity: 0.5 }}> / {nextLevelXP}</span></span>
        </div>
      </div>
      <p className="xp-progress-text">
        Noch <strong>{nextLevelXP - currentXP} XP</strong> bis Level {level + 1}
      </p>
    </div>
  )
}

function WeekDot({ day }) {
  const isToday = day.key === getTodayKey()
  let cls = 'future', content = ''

  if (day.isFuture) { cls = 'future' }
  else if (day.ratio === null) { cls = 'empty' }
  else if (day.ratio === 1) { cls = 'full'; content = '✓' }
  else if (day.ratio > 0) { cls = 'partial'; content = `${day.completed}` }
  else { cls = 'empty' }

  return (
    <div className="week-day">
      <div className={`week-dot ${cls}`}
        style={isToday ? { boxShadow: '0 0 0 2px var(--primary)' } : {}}>
        {content}
      </div>
      <span className="week-dot-label">{day.dayName}</span>
    </div>
  )
}

export default function Progress({ goals, history, levelInfo, totalXP }) {
  const days = getLast7Days(history, goals)
  const streak = (() => {
    let s = 0, d = new Date()
    const todayKey = getTodayKey()
    const todayDone = (history[todayKey] || []).length > 0
    if (!todayDone) {
      const yday = new Date(); yday.setDate(yday.getDate()-1)
      const ydayKey = `${yday.getFullYear()}-${String(yday.getMonth()+1).padStart(2,'0')}-${String(yday.getDate()).padStart(2,'0')}`
      if (!(history[ydayKey] || []).length) return 0
      d = yday
    }
    for (let i=0;i<999;i++){
      const x=new Date(d); x.setDate(x.getDate()-i)
      const k=`${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`
      if(!(history[k]||[]).length) break
      s++
    }
    return s
  })()

  const longest = getLongestStreak(history)
  const total = totalCompletionsEver(history)
  const days_ = totalActiveDays(history)

  return (
    <div className="screen">
      <div style={{ padding: '56px 20px 8px' }}>
        <div className="screen-title">Dein Fortschritt</div>
      </div>

      {/* XP Ring */}
      <XPRing {...levelInfo} />

      {/* Stats grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span className="stat-num">{streak}</span>
          <span className="stat-label">Tage Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <span className="stat-num">{longest}</span>
          <span className="stat-label">Längster Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <span className="stat-num">{total}</span>
          <span className="stat-label">Ziele erledigt</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📅</span>
          <span className="stat-num">{days_}</span>
          <span className="stat-label">Aktive Tage</span>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="week-wrap">
        <div className="section-head" style={{ marginBottom: 0 }}>
          <span className="section-title">Diese Woche</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            {days.filter(d => !d.isFuture && d.ratio !== null && d.ratio === 1).length} / {days.filter(d => !d.isFuture).length} Tage
          </span>
        </div>
        <div className="week-grid">
          {days.map(day => <WeekDot key={day.key} day={day} />)}
        </div>
      </div>

      {/* Total XP */}
      <div style={{ padding: '0 20px 24px' }}>
        <div className="section-head" style={{ marginBottom: 10 }}>
          <span className="section-title">Gesamt-XP</span>
        </div>
        <div className="stat-card" style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <span className="stat-icon">⚡</span>
          <div>
            <span className="stat-num" style={{ fontSize: 36 }}>{totalXP}</span>
            <span className="stat-label" style={{ display: 'block' }}>XP gesammelt</span>
          </div>
        </div>
      </div>

      <div style={{ height: 8 }} />
    </div>
  )
}
