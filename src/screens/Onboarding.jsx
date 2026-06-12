import { useState } from 'react'
import { generateId } from '../utils/helpers.js'
import { AVATARS } from '../data/items.js'

const GOAL_AREAS = [
  { id: 'gym',      label: '🏋️ Gym / Kraft' },
  { id: 'cardio',   label: '🏃 Laufen / Cardio' },
  { id: 'water',    label: '💧 Mehr Wasser' },
  { id: 'nutrition',label: '🥗 Ernährung' },
  { id: 'sleep',    label: '😴 Besser schlafen' },
  { id: 'reading',  label: '📚 Lesen' },
  { id: 'mind',     label: '🧘 Meditation' },
  { id: 'steps',    label: '🚶 Schritte' },
]

const SUGGESTED = {
  gym:       { name: 'Gym Training',       icon: '🏋️', xp: 35 },
  cardio:    { name: '30 min Laufen',      icon: '🏃', xp: 25 },
  water:     { name: '2L Wasser',          icon: '💧', xp: 10 },
  nutrition: { name: 'Gesund essen',       icon: '🥗', xp: 20 },
  sleep:     { name: 'Vor 23:00 ins Bett', icon: '😴', xp: 15 },
  reading:   { name: '20 min Lesen',       icon: '📚', xp: 15 },
  mind:      { name: '10 min Meditation',  icon: '🧘', xp: 15 },
  steps:     { name: '8000 Schritte',      icon: '🚶', xp: 20 },
}

export default function Onboarding({ onComplete, onRestore }) {
  const [step, setStep] = useState(0)
  const [mode, setMode] = useState('new') // 'new' | 'restore'
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [weight, setWeight] = useState('')
  const [avatar, setAvatar] = useState('🥷')
  const [mission, setMission] = useState('')
  const [areas, setAreas] = useState([])
  const [restoreCode, setRestoreCode] = useState('')
  const [restoreErr, setRestoreErr] = useState(null)
  const [busy, setBusy] = useState(false)

  const toggleArea = (id) =>
    setAreas(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])

  const finish = () => {
    const profile = {
      name: name.trim(),
      age: age ? Number(age) : null,
      weight: weight ? Number(weight) : null,
      mission: mission.trim(),
      createdAt: new Date().toISOString(),
    }
    const goals = areas.map(a => ({ id: generateId(), ...SUGGESTED[a] }))
    onComplete(profile, goals, avatar)
  }

  const handleRestore = async () => {
    setBusy(true); setRestoreErr(null)
    try {
      const code = restoreCode.toUpperCase().trim()
      const res = await fetch(`/api/user?id=${encodeURIComponent(code)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Wiederherstellung fehlgeschlagen')
      onRestore(json.data, code)
    } catch (err) {
      setRestoreErr(err.message)
    }
    setBusy(false)
  }

  const canNext = step === 0 ? name.trim().length > 0 : step === 3 ? areas.length > 0 : true

  if (mode === 'restore') {
    return (
      <div className="onboard">
        <div className="onboard-logo">HABITFORGE</div>
        <div className="onboard-sub">Willkommen zurück! 🏴‍☠️</div>
        <div className="onboard-title" style={{ marginTop: 24 }}>Spielstand laden</div>
        <p className="onboard-desc">Gib deinen Sync-Code ein (findest du im Profil-Tab deiner alten Installation, Format: XXXX-XXXX).</p>
        <div className="onboard-fields">
          <input className="input" placeholder="z.B. K7KH-3PA9"
            value={restoreCode}
            onChange={e => setRestoreCode(e.target.value.toUpperCase())}
            maxLength={9}
            style={{ textAlign: 'center', fontSize: 20, letterSpacing: '0.15em', fontFamily: 'Space Grotesk, monospace' }}
            autoFocus />
          {restoreErr && <p style={{ color: 'var(--danger)', fontSize: 13 }}>{restoreErr}</p>}
        </div>
        <div className="onboard-footer" style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setMode('new')}>Zurück</button>
          <button className="btn btn-primary" style={{ flex: 2, opacity: restoreCode.length >= 6 && !busy ? 1 : 0.4 }}
            disabled={restoreCode.length < 6 || busy} onClick={handleRestore}>
            {busy ? 'Lade...' : 'Wiederherstellen 🔄'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="onboard">
      <div className="onboard-logo">HABITFORGE</div>
      <div className="onboard-sub">Deine Reise beginnt hier ⚔️</div>

      <div className="step-dots">
        {[0,1,2,3].map(i => (
          <div key={i} className={`step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`} />
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="onboard-title">Wer bist du, Kämpfer?</div>
          <p className="onboard-desc">Jede Legende braucht einen Namen. Alter und Gewicht sind optional.</p>
          <div className="onboard-fields">
            <div>
              <label className="form-label">Dein Name *</label>
              <input className="input" placeholder="z.B. Emre" value={name}
                onChange={e => setName(e.target.value)} maxLength={24} autoFocus />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Alter</label>
                <input className="input" type="number" inputMode="numeric" placeholder="z.B. 24"
                  value={age} onChange={e => setAge(e.target.value)} min="10" max="99" />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Gewicht (kg)</label>
                <input className="input" type="number" inputMode="decimal" placeholder="z.B. 80"
                  value={weight} onChange={e => setWeight(e.target.value)} min="30" max="300" />
              </div>
            </div>
            <button onClick={() => setMode('restore')}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 13, cursor: 'pointer', textDecoration: 'underline', padding: 8 }}>
              Schon einen Helden? Mit Sync-Code wiederherstellen
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <div className="onboard-title">Erschaffe deinen Helden</div>
          <p className="onboard-desc">Wähle deinen Charakter. Mit jedem Level-Up wirst du stärker — und alle 5 Level wartet ein Item-Drop (Waffen, Rüstungen, Accessoires von Rarity C bis SS)!</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <div className="hero-avatar" style={{ cursor: 'default' }}>{avatar}</div>
            <div className="avatar-grid" style={{ marginTop: 0 }}>
              {AVATARS.map(a => (
                <button key={a} className={`emoji-opt ${avatar === a ? 'selected' : ''}`}
                  style={{ fontSize: 24 }} onClick={() => setAvatar(a)}>{a}</button>
              ))}
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="onboard-title">Was ist deine Mission?</div>
          <p className="onboard-desc">Was willst du erreichen? Du siehst es jeden Tag beim Check-in.</p>
          <div className="onboard-fields">
            <textarea className="input" style={{ minHeight: 120, resize: 'none', lineHeight: 1.6 }}
              placeholder="z.B. Ich will fitter werden, 5kg Muskeln aufbauen und mich jeden Tag energiegeladener fühlen."
              value={mission} onChange={e => setMission(e.target.value)} maxLength={200} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>{mission.length}/200</span>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <div className="onboard-title">Wähle deine Quests</div>
          <p className="onboard-desc">Welche täglichen Ziele willst du angehen? Eigene Quests kannst du später erstellen.</p>
          <div className="chip-grid">
            {GOAL_AREAS.map(area => (
              <button key={area.id} className={`chip ${areas.includes(area.id) ? 'selected' : ''}`}
                onClick={() => toggleArea(area.id)}>{area.label}</button>
            ))}
          </div>
        </>
      )}

      <div className="onboard-footer" style={{ display: 'flex', gap: 10 }}>
        {step > 0 && (
          <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setStep(s => s - 1)}>Zurück</button>
        )}
        <button className="btn btn-primary"
          style={{ flex: 2, opacity: canNext ? 1 : 0.4 }}
          disabled={!canNext}
          onClick={() => step < 3 ? setStep(s => s + 1) : finish()}>
          {step < 3 ? 'Weiter →' : 'Abenteuer starten! 🔥'}
        </button>
      </div>
    </div>
  )
}
