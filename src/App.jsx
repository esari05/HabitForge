import { useState, useEffect, useCallback } from 'react'
import { loadGoals, saveGoals, loadHistory, saveHistory } from './utils/storage.js'
import { getDefaultGoals } from './data/defaults.js'
import { getTodayKey, calculateTotalXP, getLevelInfo, generateId } from './utils/helpers.js'
import Today from './screens/Today.jsx'
import Progress from './screens/Progress.jsx'
import Goals from './screens/Goals.jsx'
import BottomNav from './components/BottomNav.jsx'

export default function App() {
  const [screen, setScreen] = useState('today')
  const [goals, setGoals] = useState(() => loadGoals() || getDefaultGoals())
  const [history, setHistory] = useState(() => loadHistory())

  useEffect(() => saveGoals(goals), [goals])
  useEffect(() => saveHistory(history), [history])

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

  const addGoal = useCallback((goal) => setGoals(prev => [...prev, goal]), [])

  const updateGoal = useCallback((id, updates) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g)), [])

  const deleteGoal = useCallback((id) =>
    setGoals(prev => prev.filter(g => g.id !== id)), [])

  const common = { goals, history, todayCompleted, totalXP, levelInfo, toggleGoal, addGoal, updateGoal, deleteGoal }

  return (
    <div className="app">
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {screen === 'today'    && <Today    {...common} />}
        {screen === 'progress' && <Progress {...common} />}
        {screen === 'goals'    && <Goals    {...common} />}
      </div>
      <BottomNav current={screen} onChange={setScreen} />
    </div>
  )
}
