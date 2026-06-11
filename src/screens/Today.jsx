import { useState } from 'react'
import { quotes } from '../data/quotes.js'
import { getDailyQuote, formatDate, calculateStreak } from '../utils/helpers.js'

export default function Today({ goals, todayCompleted, toggleGoal, levelInfo, history, profile }) {
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

  return (
    <div className="screen">
      <div className="today-header">
        <div className="today-greeting">Yosh, {profile.name}!</div>
        <div className="today-date">{formatDate()}</div>
        <div className="today-pills">
          {streak > 0 && <span className="pill pill-fire">🔥 {streak} {streak === 1 ? 'Tag' : 'Tage'}</span>}
          <span className="pill pill-xp">⭐ Level {levelInfo.level}</span>
        </div>
      </div>

      <div className="quote-wrap">
        <div className="quote-card">
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">— {quote.author}</p>
        </div>
      </div>

      <div className="goals-wrap">
        <div className="section-head" style={{ marginBottom: 12, padding: 0 }}>
          <span className="section-title">Heutige Quests</span>
          <span className="pill pill-xp" style={{ fontSize: 12 }}>{completed} / {total}</span>
        </div>

        {goals.length === 0 ? (
          <div className="empty-hint">
            <span className="hint-emoji">🎯</span>
            Noch keine Quests angelegt.<br />
            Geh zu <strong>Quests</strong> und füge welche hinzu!
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
                  style={{ transform: isAnimating ? 'scale(0.98)' : 'scale(1)' }}
                >
                  <span className="goal-emoji">{goal.icon}</span>
                  <div className="goal-info">
                    <span className="goal-name">{goal.name}</span>
                    <span className="goal-xp-badge">+{goal.xp} XP</span>
                  </div>
                  <div className="check-circle">{done ? '✓' : ''}</div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {total > 0 && (
        <div className="daily-progress-wrap">
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${pct * 100}%` }} />
          </div>
          <div className="progress-label">
            <span>{Math.round(pct * 100)}% geschafft</span>
            <span style={{ color: 'var(--gold)' }}>
              +{todayCompleted.reduce((s, id) => {
                const g = goals.find(x => x.id === id)
                return s + (g ? g.xp : 0)
              }, 0)} XP heute
            </span>
          </div>
        </div>
      )}

      {allDone && (
        <div className="all-done-banner" style={{ marginTop: 20 }}>
          <div className="all-done-emoji">🏴‍☠️</div>
          <div className="all-done-title">Alle Quests erledigt!</div>
          <div className="all-done-sub">Plus Ultra, {profile.name}! Der Streak lebt weiter.</div>
        </div>
      )}

      <div style={{ height: 24 }} />
    </div>
  )
}
