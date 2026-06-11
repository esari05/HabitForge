import { useState } from 'react'

export default function Profile({ profile, updateProfile, settings, updateSettings, levelInfo, resetAll }) {
  const [confirmReset, setConfirmReset] = useState(false)
  const notifSupported = 'Notification' in window

  const handleNotifToggle = async () => {
    if (settings.notifications) {
      updateSettings({ ...settings, notifications: false })
      return
    }
    if (!notifSupported) return
    const perm = await Notification.requestPermission()
    if (perm === 'granted') {
      updateSettings({ ...settings, notifications: true })
      new Notification('HabitForge ⚔️', {
        body: `Erinnerungen aktiv, ${profile.name}! Wir sehen uns um ${settings.reminderTime}.`,
        icon: '/icon-192.png',
      })
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
            <span className="profile-row-label" style={{ display: 'block' }}>Tägliche Erinnerung</span>
            {!notifSupported && (
              <span style={{ fontSize: 11, color: 'var(--danger)' }}>
                Browser unterstützt keine Benachrichtigungen
              </span>
            )}
          </div>
          <button
            className={`toggle ${settings.notifications ? 'on' : ''}`}
            onClick={handleNotifToggle}
            aria-label="Benachrichtigungen umschalten"
            disabled={!notifSupported}
          />
        </div>

        <div className="profile-row">
          <span className="profile-row-label">Erinnerungszeit</span>
          <input
            type="time"
            className="profile-input"
            style={{ width: 110 }}
            value={settings.reminderTime}
            onChange={e => updateSettings({ ...settings, reminderTime: e.target.value })}
          />
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, padding: '4px 4px 0' }}>
          💡 Tipp: Auf dem iPhone müssen Benachrichtigungen über die installierte
          Home-Bildschirm-App aktiviert werden (iOS 16.4+), nicht über Safari direkt.
        </p>

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
