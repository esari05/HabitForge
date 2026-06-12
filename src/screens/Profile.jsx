import { useState } from 'react'
import { pushSupported, subscribeToPush, updatePushTime, unsubscribeFromPush } from '../utils/push.js'

export default function Profile({ profile, updateProfile, settings, updateSettings, levelInfo, resetAll }) {
  const [confirmReset, setConfirmReset] = useState(false)
  const [busy, setBusy] = useState(false)
  const [pushMsg, setPushMsg] = useState(null)

  const isStandalone = window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone

  const handleNotifToggle = async () => {
    if (busy) return
    setBusy(true)
    setPushMsg(null)
    try {
      if (settings.notifications) {
        await unsubscribeFromPush()
        updateSettings({ ...settings, notifications: false })
        setPushMsg({ ok: true, text: 'Erinnerungen deaktiviert.' })
      } else {
        await subscribeToPush(settings.reminderTime)
        updateSettings({ ...settings, notifications: true })
        setPushMsg({ ok: true, text: `Aktiviert! Tägliche Erinnerung um ca. ${settings.reminderTime} Uhr. 🔥` })
      }
    } catch (err) {
      setPushMsg({ ok: false, text: err.message })
    }
    setBusy(false)
  }

  const handleTimeChange = async (e) => {
    const time = e.target.value
    updateSettings({ ...settings, reminderTime: time })
    if (settings.notifications) {
      try { await updatePushTime(time) } catch {}
    }
  }

  const editNum = (field) => {
    const current = profile[field] || ''
    const label = field === 'age' ? 'Alter' : 'Gewicht (kg)'
    const val = prompt(`${label}:`, current)
    if (val !== null && val !== '') updateProfile({ ...profile, [field]: Number(val) })
  }

  const editText = (field, label, maxLen) => {
    const val = prompt(`${label}:`, profile[field] || '')
    if (val !== null) updateProfile({ ...profile, [field]: val.slice(0, maxLen) })
  }

  return (
    <div className="screen">
      <div className="goals-screen-header">
        <div className="screen-title">Dein Profil</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          Level {levelInfo.level} Kämpfer ⚔️
        </p>
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div className="section-head" style={{ padding: 0, marginBottom: 2 }}>
          <span className="section-title">Über dich</span>
        </div>

        <div className="profile-row" onClick={() => editText('name', 'Dein Name', 24)} style={{ cursor: 'pointer' }}>
          <span className="profile-row-label">Name</span>
          <span className="profile-row-value">{profile.name} ✏️</span>
        </div>

        <div className="profile-row" onClick={() => editNum('age')} style={{ cursor: 'pointer' }}>
          <span className="profile-row-label">Alter</span>
          <span className="profile-row-value">{profile.age ? `${profile.age} Jahre` : '— '} ✏️</span>
        </div>

        <div className="profile-row" onClick={() => editNum('weight')} style={{ cursor: 'pointer' }}>
          <span className="profile-row-label">Gewicht</span>
          <span className="profile-row-value">{profile.weight ? `${profile.weight} kg` : '— '} ✏️</span>
        </div>

        <div className="profile-row" onClick={() => editText('mission', 'Deine Mission', 200)}
          style={{ cursor: 'pointer', flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <span className="profile-row-label">Deine Mission ✏️</span>
          <span style={{ fontSize: 14, lineHeight: 1.5 }}>
            {profile.mission || 'Noch keine Mission gesetzt — tippe zum Hinzufügen'}
          </span>
        </div>

        <div className="section-head" style={{ padding: 0, margin: '18px 0 2px' }}>
          <span className="section-title">Erinnerungen</span>
        </div>

        <div className="profile-row">
          <div>
            <span className="profile-row-label" style={{ display: 'block' }}>Tägliche Push-Erinnerung</span>
            {!pushSupported() && (
              <span style={{ fontSize: 11, color: 'var(--danger)' }}>
                Auf diesem Gerät nicht verfügbar
              </span>
            )}
          </div>
          <button
            className={`toggle ${settings.notifications ? 'on' : ''}`}
            onClick={handleNotifToggle}
            aria-label="Benachrichtigungen umschalten"
            disabled={!pushSupported() || busy}
            style={{ opacity: busy ? 0.5 : 1 }}
          />
        </div>

        <div className="profile-row">
          <span className="profile-row-label">Erinnerungszeit</span>
          <input
            type="time"
            className="profile-input"
            style={{ width: 110 }}
            value={settings.reminderTime}
            onChange={handleTimeChange}
          />
        </div>

        {pushMsg && (
          <p style={{
            fontSize: 13, lineHeight: 1.5, padding: '10px 14px', borderRadius: 10,
            background: pushMsg.ok ? 'var(--success-dim)' : 'rgba(255,92,122,0.12)',
            color: pushMsg.ok ? 'var(--success)' : 'var(--danger)',
          }}>
            {pushMsg.text}
          </p>
        )}

        {!isStandalone && (
          <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, padding: '4px 4px 0' }}>
            💡 Auf dem iPhone funktionieren Push-Erinnerungen nur, wenn die App über
            „Zum Home-Bildschirm" installiert wurde und du sie von dort öffnest (iOS 16.4+).
          </p>
        )}

        <div className="section-head" style={{ padding: 0, margin: '18px 0 2px' }}>
          <span className="section-title">Danger Zone</span>
        </div>

        {confirmReset ? (
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setConfirmReset(false)}>Abbrechen</button>
            <button className="btn btn-danger" style={{ flex: 1 }} onClick={resetAll}>Wirklich löschen!</button>
          </div>
        ) : (
          <button className="btn btn-danger" onClick={() => setConfirmReset(true)}>
            Alle Daten zurücksetzen
          </button>
        )}
      </div>

      <div style={{ height: 24 }} />
    </div>
  )
}
