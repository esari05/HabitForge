import { useState } from 'react'
import { EMOJI_OPTIONS, XP_OPTIONS } from '../data/defaults.js'
import { generateId } from '../utils/helpers.js'

const EMPTY_FORM = { name: '', icon: '🎯', xp: 20 }

export default function Goals({ goals, addGoal, updateGoal, deleteGoal }) {
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const openAdd = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true) }
  const openEdit = (g) => { setForm({ name: g.name, icon: g.icon, xp: g.xp }); setEditId(g.id); setShowForm(true) }
  const closeForm = () => { setShowForm(false); setEditId(null) }

  const handleSave = () => {
    if (!form.name.trim()) return
    if (editId) {
      updateGoal(editId, { name: form.name.trim(), icon: form.icon, xp: form.xp })
    } else {
      addGoal({ id: generateId(), name: form.name.trim(), icon: form.icon, xp: form.xp })
    }
    closeForm()
  }

  return (
    <div className="screen">
      <div className="goals-screen-header">
        <div className="screen-title">Meine Ziele</div>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
          {goals.length} {goals.length === 1 ? 'Ziel' : 'Ziele'} aktiv
        </p>
      </div>

      {/* Goal list */}
      <div className="goals-manage-list">
        {goals.length === 0 && !showForm && (
          <div className="empty-hint">
            <span className="hint-emoji">✨</span>
            Noch keine Ziele. Füge dein erstes hinzu!
          </div>
        )}
        {goals.map(g => (
          <div key={g.id} className="goal-manage-card">
            <span style={{ fontSize: 26 }}>{g.icon}</span>
            <div className="goal-manage-info">
              <span className="goal-manage-name">{g.name}</span>
              <span className="goal-manage-xp">+{g.xp} XP pro Tag</span>
            </div>
            <div className="goal-manage-actions">
              <button className="icon-btn" onClick={() => openEdit(g)} aria-label="Bearbeiten">✏️</button>
              <button className="icon-btn del" onClick={() => deleteGoal(g.id)} aria-label="Löschen">🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit form */}
      <div className="add-goal-wrap">
        {showForm ? (
          <div className="add-goal-form">
            <div>
              <label className="form-label">Ziel-Name</label>
              <input
                className="input"
                placeholder="z.B. 30 min Laufen"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                maxLength={40}
                autoFocus
              />
            </div>

            <div>
              <label className="form-label">Icon</label>
              <div className="emoji-grid">
                {EMOJI_OPTIONS.map(e => (
                  <button
                    key={e}
                    className={`emoji-opt ${form.icon === e ? 'selected' : ''}`}
                    onClick={() => setForm(f => ({ ...f, icon: e }))}
                  >{e}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Schwierigkeit / XP</label>
              <div className="xp-opts">
                {XP_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    className={`xp-opt ${form.xp === opt.value ? 'selected' : ''}`}
                    onClick={() => setForm(f => ({ ...f, xp: opt.value }))}
                  >
                    <span className="xp-opt-label">{opt.label}</span>
                    <span className="xp-opt-val">{opt.value}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1 }} onClick={closeForm}>Abbrechen</button>
              <button
                className="btn btn-primary"
                style={{ flex: 2, opacity: form.name.trim() ? 1 : 0.4 }}
                onClick={handleSave}
                disabled={!form.name.trim()}
              >
                {editId ? 'Speichern' : 'Hinzufügen'}
              </button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={openAdd} style={{ marginBottom: 12 }}>
            + Neues Ziel hinzufügen
          </button>
        )}
      </div>

      <div style={{ height: 16 }} />
    </div>
  )
}
