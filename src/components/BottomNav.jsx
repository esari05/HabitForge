const TABS = [
  { id: 'today',    icon: '⚔️', label: 'Heute'   },
  { id: 'progress', icon: '⚡', label: 'Level'   },
  { id: 'goals',    icon: '🎯', label: 'Quests'  },
  { id: 'profile',  icon: '👤', label: 'Profil'  },
]

export default function BottomNav({ current, onChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn ${current === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          aria-label={tab.label}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span className="nav-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
