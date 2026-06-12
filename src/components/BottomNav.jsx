const TABS = [
  { id: 'today',    icon: '⚔️', label: 'Heute'  },
  { id: 'progress', icon: '⚡', label: 'Level'  },
  { id: 'goals',    icon: '🎯', label: 'Quests' },
  { id: 'hero',     icon: '🦸', label: 'Held'   },
  { id: 'profile',  icon: '👤', label: 'Profil' },
]

export default function BottomNav({ current, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(tab => (
        <button key={tab.id}
          className={`nav-btn ${current === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          aria-label={tab.label}
          style={{ minWidth: 52, padding: '8px 6px' }}>
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
