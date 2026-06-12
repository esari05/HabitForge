import { useState, useEffect, useCallback } from 'react'
import {
  loadGoals, saveGoals, loadHistory, saveHistory,
  loadProfile, saveProfile, loadCheckin, saveCheckin,
  loadSettings, saveSettings,
} from './utils/storage.js'
import { getTodayKey, calculateTotalXP, getLevelInfo } from './utils/helpers.js'
import Onboarding from './screens/Onboarding.jsx'
import CheckIn from './screens/CheckIn.jsx'
import Today from './screens/Today.jsx'
import Progress from './screens/Progress.jsx'
import Goals from './screens/Goals.jsx'
import Profile from './screens/Profile.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  const [screen, setScreen] = useState('today')
  const [profile, setProfile] = useState(() => loadProfile())
  const [goals, setGoals] = useState(() => loadGoals() || [])
  const [history, setHistory] = useState(() => loadHistory())
  const [settings, setSettings] = useState(() => loadSettings())
  const [checkedIn, setCheckedIn] = useState(() => loadCheckin() === getTodayKey())

  useEffect(() => { if (profile) saveProfile(profile) }, [profile])
  useEffect(() => saveGoals(goals), [goals])
  useEffect(() => saveHistory(history), [history])
  useEffect(() => saveSettings(settings), [settings])

  const today = getTodayKey()
  const todayCompleted = history[today] || []
  const totalXP = calculateTotalXP(history, goals)
  const levelInfo = getLevelInfo(totalXP)

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

  const handleOnboardingComplete = (newProfile, newGoals) => {
    setProfile(newProfile)
    setGoals(newGoals)
    saveCheckin(getTodayKey())
    setCheckedIn(true)
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
    return <div className="app"><Onboarding onComplete={handleOnboardingComplete} /></div>
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
        {screen === 'profile'  && (
          <Profile
            profile={profile}
            updateProfile={setProfile}
            settings={settings}
            updateSettings={setSettings}
            levelInfo={levelInfo}
            resetAll={resetAll}
          />
        )}
      </div>
      <BottomNav current={screen} onChange={setScreen} />
    </div>
  )
}
