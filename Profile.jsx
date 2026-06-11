export const EMOJI_OPTIONS = [
  '🏋️','🏃','🚴','🧘','💪','🤸','🏊','⚽','🎯',
  '📚','💧','🥗','😴','🧠','✍️','🎸','🌱','🚶',
  '🍎','🧹','💊','🥤','🎨','🎵','🌅','🧗','🏄',
  '🎾','🏸','⚡','🔥','🌟','💡','🦷','🫀','🛌',
]

export const XP_OPTIONS = [
  { label: 'Easy', value: 10 },
  { label: 'Medium', value: 20 },
  { label: 'Hard', value: 35 },
  { label: 'Epic', value: 50 },
]

export const getDefaultGoals = () => [
  { id: 'default-1', name: 'Gym Training', icon: '🏋️', xp: 35 },
  { id: 'default-2', name: '3km Laufen', icon: '🏃', xp: 25 },
  { id: 'default-3', name: '2L Wasser', icon: '💧', xp: 10 },
]
