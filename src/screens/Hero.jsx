import { useState } from 'react'
import { ITEMS, RARITIES, SLOTS, AVATARS, getItem } from '../data/items.js'

export default function Hero({ character, setCharacter, levelInfo, profile }) {
  const [showAvatars, setShowAvatars] = useState(false)
  const [filter, setFilter] = useState('all')

  const nextDropLevel = (character.claimedDrops + 1) * 5
  const owned = character.items.map(getItem).filter(Boolean)
  const filtered = filter === 'all' ? owned : owned.filter(i => i.slot === filter)

  const equip = (item) => {
    const isEquipped = character.equipped[item.slot] === item.id
    setCharacter({
      ...character,
      equipped: { ...character.equipped, [item.slot]: isEquipped ? null : item.id },
    })
  }

  const setAvatar = (a) => {
    setCharacter({ ...character, avatar: a })
    setShowAvatars(false)
  }

  return (
    <div className="screen">
      <div className="goals-screen-header">
        <div className="screen-title">Dein Held</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Nächster Item-Drop bei Level {nextDropLevel} 🎁
        </p>
      </div>

      {/* Character card */}
      <div style={{ padding: '0 20px 20px' }}>
        <div className="hero-card">
          <button className="hero-avatar" onClick={() => setShowAvatars(v => !v)}>
            {character.avatar}
            <span className="hero-avatar-edit">✏️</span>
          </button>
          <div className="hero-name">{profile.name}</div>
          <div className="pill pill-xp" style={{ marginTop: 4 }}>⭐ Level {levelInfo.level}</div>

          {showAvatars && (
            <div className="avatar-grid">
              {AVATARS.map(a => (
                <button key={a}
                  className={`emoji-opt ${character.avatar === a ? 'selected' : ''}`}
                  style={{ fontSize: 24 }}
                  onClick={() => setAvatar(a)}>
                  {a}
                </button>
              ))}
            </div>
          )}

          {/* Equipment slots */}
          <div className="slot-grid">
            {Object.entries(SLOTS).map(([slotId, slot]) => {
              const equippedItem = character.equipped[slotId] ? getItem(character.equipped[slotId]) : null
              const rar = equippedItem ? RARITIES[equippedItem.rarity] : null
              return (
                <div key={slotId} className="slot-box"
                  style={rar ? { borderColor: rar.color, boxShadow: `0 0 12px ${rar.glow}` } : {}}>
                  <span className="slot-emoji">{equippedItem ? equippedItem.emoji : slot.icon}</span>
                  <span className="slot-label" style={rar ? { color: rar.color } : {}}>
                    {equippedItem ? equippedItem.name : slot.label}
                  </span>
                  {rar && <span className="rarity-badge" style={{ background: rar.color }}>{rar.label}</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Inventory */}
      <div className="section-head">
        <span className="section-title">Inventar ({owned.length})</span>
      </div>

      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <button className={`chip ${filter === 'all' ? 'selected' : ''}`} style={{ padding: '6px 12px', fontSize: 13 }}
          onClick={() => setFilter('all')}>Alle</button>
        {Object.entries(SLOTS).map(([id, s]) => (
          <button key={id} className={`chip ${filter === id ? 'selected' : ''}`} style={{ padding: '6px 12px', fontSize: 13 }}
            onClick={() => setFilter(id)}>{s.icon} {s.label}</button>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {owned.length === 0 && (
          <div className="empty-hint">
            <span className="hint-emoji">🎁</span>
            Noch keine Items! Sammle XP durch Quests —<br />
            alle 5 Level wartet ein Drop auf dich.
          </div>
        )}
        {filtered.map(item => {
          const rar = RARITIES[item.rarity]
          const isEquipped = character.equipped[item.slot] === item.id
          return (
            <button key={item.id} className="inv-item"
              style={{ borderColor: isEquipped ? rar.color : 'var(--border)' }}
              onClick={() => equip(item)}>
              <span className="inv-emoji" style={{ filter: `drop-shadow(0 0 6px ${rar.glow})` }}>{item.emoji}</span>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <span className="goal-manage-name">{item.name}</span>
                <span style={{ fontSize: 12, color: rar.color, display: 'block' }}>
                  {rar.name} · {SLOTS[item.slot].label}
                </span>
              </div>
              <span className="rarity-badge" style={{ background: rar.color }}>{rar.label}</span>
              {isEquipped && <span style={{ fontSize: 11, color: rar.color, fontFamily: 'Bangers, sans-serif', letterSpacing: '0.05em' }}>AKTIV</span>}
            </button>
          )
        })}
      </div>

      <div style={{ height: 24 }} />
    </div>
  )
}
