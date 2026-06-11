import { useState, useEffect } from 'react'
import { quotes } from '../data/quotes.js'
import { getDailyQuote, formatDate, getGreeting, calculateStreak } from '../utils/helpers.js'

export default function Today({ goals, todayCompleted, toggleGoal, levelInfo, history }) {
  const [notifAsked, setNotifAsked] = useState(() => localStorage.getItem('hf_notif_asked') === '1')
  const [notifGranted, setNotifGranted] = useState(() => Notification?.permission === 'granted')
  const [justChecked, setJustChecked] = useState(null)

  const quote = getDailyQuote(quotes)
  const streak = calculateStreak(history)
  const completed = todayCompleted.length
  const total = goals.length
  const allDone = completed === total && total > 0
  const pct = total > 0 ? completed / total : 0

  const handleToggle = (id) => {
    const wasDone = todayCompleted.includes(id)
    toggleGoal(id)
    if (!wasDone) {
      setJustChecked(id)
      setTimeout(() => setJustChecked(null), 800)
    }
  }

  const requestNotif = async () => {
    if (!('Notification' in window)) return
    const perm = await Notification.requestPermission()
    setNotifGranted(perm === 'granted')
    setNotifAsked(true)
    localStorage.setItem('hf_notif_asked', '1')
    if (perm === 'granted') {
      new Notification('HabitForge 🔥', {
        body: 'Erinnerungen aktiviert! Bleib dran.',
        icon: '/icon-192.png'
      })
    }
  }

  return (
    <div className="screen">
      {/* Header */}
      <div className="today-header">
        <div className="today-greeting">{getGreeting()} ⚡</div>
        <div className="today-date">{formatDate()}</div>
        <div className="today-pills">
          {streak > 0 && <span className="pill pill-fire">🔥 {streak} {streak === 1 ? 'Tag' : 'Tage'}</span>}
          <span className="pill pill-xp">⭐ Level {levelInfo.level}</span>
        </div>
      </div>

      {/* Notification nudge */}
      {!notifAsked && !notifGranted && 'Notification' in window && (
        <div className="notif-bar">
          <span className="notif-text">🔔 Tägliche Erinnerungen aktivieren?</span>
          <button className="notif-btn" onClick={requestNotif}>Aktivieren</button>
        </div>
      )}

      {/* Quote */}
      <div className="quote-wrap" style={{ marginTop: notifAsked ? 16 : 12 }}>
        <div className="quote-card">
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">— {quote.author}</p>
        </div>
      </div>

      {/* Goals */}
      <div className="goals-wrap">
        <div className="section-head" style={{ marginBottom: 12 }}>
          <span className="section-title">Heutige Ziele</span>
          <span className="pill pill-xp" style={{ fontSize: 11 }}>{completed} / {total}</span>
        </div>

        {goals.length === 0 ? (
          <div className="empty-hint">
            <span className="hint-emoji">🎯</span>
            Noch keine Ziele angelegt.<br />
            Geh zu <strong>Ziele</strong> und füge welche hinzu!
          </div>
        ) : (
          <div className="goal-list">
            {goals.map(goal => {
              const done = todayCompleted.includes(goal.id)
              const isAnimating = justChecked === goal.id
              return (
                <button
                  key={goal.id}
                  className={`goal-card ${done ? 'done' : ''}`}
                  onClick={() => handleToggle(goal.id)}
                  style={{ transform: isAnimating ? 'scale(0.98)' : 'scale(1)', transition: 'transform 0.2s' }}
                >
                  <span className="goal-emoji">{goal.icon}</span>
                  <div className="goal-info">
                    <span className="goal-name">{goal.name}</span>
                    <span className="goal-xp-badge">+{goal.xp} XP</span>
                  </div>
                  <div className="check-circle">
                    {done ? '✓' : ''}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="daily-progress-wrap">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct * 100}%` }} />
          </div>
          <div className="progress-label">
            <span>{Math.round(pct * 100)}% geschafft</span>
            <span style={{ color: 'var(--primary)' }}>
              +{todayCompleted.reduce((s, id) => {
                const g = goals.find(x => x.id === id)
                return s + (g ? g.xp : 0)
              }, 0)} XP heute
            </span>
          </div>
        </div>
      )}

      {/* All done celebration */}
      {allDone && (
        <div className="all-done-banner" style={{ marginTop: 20 }}>
          <div className="all-done-emoji">🎉</div>
          <div className="all-done-title">Alle Ziele erledigt!</div>
          <div className="all-done-sub">Streak läuft weiter. Du bist unaufhaltbar.</div>
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  )
}
