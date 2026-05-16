'use client'

import { useEffect, useState } from 'react'
import useCalorieStore from '@/lib/store'

export default function GoalSettings() {
  const [mounted, setMounted] = useState(false)
  const [goalInput, setGoalInput] = useState('2000')
  const dailyGoal = useCalorieStore((state) => state.dailyGoal)
  const setDailyGoal = useCalorieStore((state) => state.setDailyGoal)
  const darkMode = useCalorieStore((state) => state.darkMode)
  const toggleDarkMode = useCalorieStore((state) => state.toggleDarkMode)

  useEffect(() => {
    setMounted(true)
    setGoalInput(dailyGoal.toString())
  }, [dailyGoal])

  if (!mounted) return null

  const handleGoalChange = () => {
    const newGoal = parseInt(goalInput) || 2000
    if (newGoal > 0 && newGoal !== dailyGoal) {
      setDailyGoal(newGoal)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoalChange()
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            ⚙️ Settings
          </h3>

          {/* Daily Goal Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Daily Calorie Goal
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="500"
                max="5000"
                step="100"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                onBlur={handleGoalChange}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGoalChange}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Update
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Recommended: 1200-2500 kcal based on activity level
            </p>
          </div>

          {/* Preset Goals */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quick Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[1200, 1500, 2000, 2500].map((goal) => (
                <button
                  key={goal}
                  onClick={() => {
                    setDailyGoal(goal)
                    setGoalInput(goal.toString())
                  }}
                  className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                    dailyGoal === goal
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {goal} kcal
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.39 0l.707.707a1 1 0 01-1.39 1.39L15.22 4.17a1 1 0 010-1.39zm2.83 2.83a1 1 0 011.39 0l.707.707a1 1 0 01-1.39 1.39l-.707-.707a1 1 0 010-1.39zM17 11a1 1 0 110 2h-1a1 1 0 110-2h1zm1.08-9.22a1 1 0 01-1.39 0l-.707-.707a1 1 0 011.39-1.39l.707.707a1 1 0 010 1.39zM4.22 4.22a1 1 0 011.39 0l.707.707a1 1 0 01-1.39 1.39L4.22 5.61a1 1 0 010-1.39zm2.83 2.83a1 1 0 011.39 0l.707.707a1 1 0 01-1.39 1.39l-.707-.707a1 1 0 010-1.39zM3 11a1 1 0 110 2H2a1 1 0 110-2h1zm15 4.268a8 8 0 11-11.537-7.31 1 1 0 11.146 1.986 6 6 0 106.982 5.324 1 1 0 11.41-1 8 8 0 010 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center w-12">
            {darkMode ? 'Dark' : 'Light'}
          </span>
        </div>
      </div>
    </div>
  )
}
