import { useState } from 'react'
import { RARITIES, SLOTS } from '../data/items.js'

export default function RewardModal({ pendingDrops, level, onClaim, onClose }) {
  const [revealed, setRevealed] = useState(null)

  const handleOpen = () => {
    const item = onClaim()
    setRevealed(item)
  }

  const handleNext = () => {
    setRevealed(null)
    if (pendingDrops <= 0) onClose()
  }

  const rar = revealed ? RARITIES[revealed.rarity] : null

  return (
    <div className="modal-overlay">
      <div className="reward-card" style={rar ? { borderColor: rar.color, boxShadow: `0 0 40px ${rar.glow}` } : {}}>
        {!revealed ? (
          <>
            <div style={{ fontSize: 56 }}>🎁</div>
            <div className="reward-title">ITEM DROP!</div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              Level {level} erreicht — du hast {pendingDrops} {pendingDrops === 1 ? 'Belohnung' : 'Belohnungen'} verdient!
            </p>
            <button className="btn btn-primary" onClick={handleOpen}>Öffnen! ✨</button>
          </>
        ) : (
          <>
            <div className="reward-item-emoji" style={{ filter: `drop-shadow(0 0 20px ${rar.glow})` }}>
              {revealed.emoji}
            </div>
            <span className="rarity-badge" style={{ background: rar.color, fontSize: 14, padding: '4px 14px' }}>
              {rar.label} · {rar.name}
            </span>
            <div className="reward-title" style={{ color: rar.color, fontSize: 26, margin: '10px 0 2px' }}>
              {revealed.name}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
              {SLOTS[revealed.slot].label} — jetzt im Inventar!
            </p>
            <button className="btn btn-primary" onClick={handleNext}>
              {pendingDrops > 0 ? `Nächster Drop (${pendingDrops}) 🎁` : 'Nice! ⚔️'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
