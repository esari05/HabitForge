import { quotes } from '../data/quotes.js'
import { getDailyQuote, calculateStreak } from '../utils/helpers.js'

export default function CheckIn({ profile, history, onCheckIn }) {
  const quote = getDailyQuote(quotes)
  const streak = calculateStreak(history)

  return (
    <div className="checkin">
      <div className="checkin-streak">{streak > 0 ? '🔥' : '⚔️'}</div>
      <div className="checkin-title">
        {streak > 0 ? `${streak} Tage Streak!` : `Bereit, ${profile.name}?`}
      </div>
      <div className="checkin-sub">
        {streak > 0
          ? `Stark, ${profile.name}! Lass die Flamme nicht ausgehen.`
          : 'Ein neuer Tag, eine neue Chance auf XP.'}
      </div>

      <div className="checkin-quote">
        <p className="quote-text">{quote.text}</p>
        <p className="quote-author">— {quote.author}</p>
      </div>

      {profile.mission && (
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 28, maxWidth: 320, lineHeight: 1.6 }}>
          <span style={{ color: 'var(--gold)', fontFamily: 'Bangers, sans-serif', letterSpacing: '0.08em' }}>DEINE MISSION: </span>
          {profile.mission}
        </p>
      )}

      <button className="btn btn-primary" style={{ maxWidth: 300 }} onClick={onCheckIn}>
        Los geht's! ⚡
      </button>
    </div>
  )
}
