import { useState, useEffect, useCallback, useRef } from 'react'
import {
  loadGoals, saveGoals, loadHistory, saveHistory,
  loadProfile, saveProfile, loadCheckin, saveCheckin,
  loadSettings, saveSettings, loadCharacter, saveCharacter,
  getUid, setUid,
} from './utils/storage.js'
import { getTodayKey, calculateTotalXP, getLevelInfo } from './utils/helpers.js'
import { defaultCharacter, rollItem } from './data/items.js'
import Onboarding from './screens/Onboarding.jsx'
import CheckIn from './screens/CheckIn.jsx'
import Today from './screens/Today.jsx'
import Progress from './screens/Progress.jsx'
import Goals from './screens/Goals.jsx'
import Hero from './screens/Hero.jsx'
import Profile from './screens/Profile.jsx'
import BottomNav from './components/BottomNav.jsx'
import RewardModal from './components/RewardModal.jsx'

export default function App() {
  const [screen, setScreen] = useState('today')
  const [profile, setProfile] = useState(() => loadProfile())
  const [goals, setGoals] = useState(() => loadGoals() || [])
  const [history, setHistory] = useState(() => loadHistory())
  const [settings, setSettings] = useState(() => loadSettings())
  const [character, setCharacter] = useState(() => loadCharacter())
  const [checkedIn, setCheckedIn] = useState(() => loadCheckin() === getTodayKey())
  const [showReward, setShowReward] = useState(false)
  const uidRef = useRef(profile ? getUid() : null)

  // Migration: bestehende User ohne Charakter bekommen einen Standard-Helden
  useEffect(() => {
    if (profile && !character) setCharacter(defaultCharacter())
  }, [profile, character])

  useEffect(() => { if (profile) saveProfile(profile) }, [profile])
  useEffect(() => saveGoals(goals), [goals])
  useEffect(() => saveHistory(history), [history])
  useEffect(() => saveSettings(settings), [settings])
  useEffect(() => { if (character) saveCharacter(character) }, [character])

  const today = getTodayKey()
  const todayCompleted = history[today] || []
  const totalXP = calculateTotalXP(history, goals)
  const levelInfo = getLevelInfo(totalXP)

  // ── Item-Drops: alle 5 Level ──
  const pendingDrops = character ? Math.floor(levelInfo.level / 5) - character.claimedDrops : 0
  useEffect(() => {
    if (pendingDrops > 0 && checkedIn) setShowReward(true)
  }, [pendingDrops, checkedIn])

  const claimDrop = () => {
    const item = rollItem(character.items)
    setCharacter(c => ({ ...c, items: [...c.items, item.id], claimedDrops: c.claimedDrops + 1 }))
    return item
  }

  // ── Cloud-Sync: bei jeder Änderung (debounced) in die DB schreiben ──
  useEffect(() => {
    if (!profile || !uidRef.current) return
    const t = setTimeout(() => {
      fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: uidRef.current,
          data: { v: 4, profile, goals, history, settings, character },
        }),
      }).catch(() => {})
    }, 1500)
    return () => clearTimeout(t)
  }, [profile, goals, history, settings, character])

  const toggleGoal = useCallback((goalId) => {
    setHistory(prev => {
      const list = prev[today] || []
      const isIn = list.includes(goalId)
      return { ...prev, [today]: isIn ? list.filter(id => id !== goalId) : [...list, goalId] }
    })
  }, [today])

  const addGoal    = useCallback((g) => setGoals(prev => [...prev, g]), [])
  const updateGoal = useCallback((id, u) => setGoals(prev => prev.map(g => g.id === id ? { ...g, ...u } : g)), [])
  const deleteGoal = useCallback((id) => setGoals(prev => prev.filter(g => g.id !== id)), [])

  const handleOnboardingComplete = (newProfile, newGoals, avatar) => {
    uidRef.current = getUid()
    setProfile(newProfile)
    setGoals(newGoals)
    setCharacter(defaultCharacter(avatar))
    saveCheckin(getTodayKey())
    setCheckedIn(true)
  }

  const handleRestore = (data, code) => {
    setUid(code)
    uidRef.current = code
    setProfile(data.profile || null)
    setGoals(data.goals || [])
    setHistory(data.history || {})
    setSettings(data.settings || { reminderTime: '08:00', notifications: false })
    setCharacter(data.character || defaultCharacter())
    setCheckedIn(false)
  }

  const handleCheckIn = () => {
    saveCheckin(getTodayKey())
    setCheckedIn(true)
  }

  const resetAll = () => {
    localStorage.clear()
    window.location.reload()
  }

  // ── Gates ──
  if (!profile) {
    return <div className="app"><Onboarding onComplete={handleOnboardingComplete} onRestore={handleRestore} /></div>
  }

  if (!checkedIn) {
    return <div className="app"><CheckIn profile={profile} history={history} onCheckIn={handleCheckIn} /></div>
  }

  const common = { goals, history, todayCompleted, totalXP, levelInfo, toggleGoal, addGoal, updateGoal, deleteGoal, profile }

  return (
    <div className="app">
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {screen === 'today'    && <Today    {...common} />}
        {screen === 'progress' && <Progress {...common} />}
        {screen === 'goals'    && <Goals    {...common} />}
        {screen === 'hero'     && character && (
          <Hero character={character} setCharacter={setCharacter} levelInfo={levelInfo} profile={profile} />
        )}
        {screen === 'profile'  && (
          <Profile
            profile={profile} updateProfile={setProfile}
            settings={settings} updateSettings={setSettings}
            levelInfo={levelInfo} resetAll={resetAll}
            syncCode={uidRef.current}
          />
        )}
      </div>
      <BottomNav current={screen} onChange={setScreen} />
      {showReward && character && (
        <RewardModal
          pendingDrops={pendingDrops}
          level={levelInfo.level}
          onClaim={claimDrop}
          onClose={() => setShowReward(false)}
        />
      )}
    </div>
  )
}
