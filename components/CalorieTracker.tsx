'use client'

import { useEffect, useState } from 'react'
import useCalorieStore from '@/lib/store'
import {
  formatCalories,
  getCaloriePercentage,
  getCalorieProgressColor,
  getRemainingCalories,
} from '@/lib/utils'

export default function CalorieTracker() {
  const [mounted, setMounted] = useState(false)
  const totalCalories = useCalorieStore((state) => state.getTodayCalories())
  const dailyGoal = useCalorieStore((state) => state.dailyGoal)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const percentage = getCaloriePercentage(totalCalories, dailyGoal)
  const remaining = getRemainingCalories(totalCalories, dailyGoal)
  const progressColor = getCalorieProgressColor(totalCalories, dailyGoal)

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Today's Intake
      </h2>

      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-48 h-48 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shadow-inner">
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="96"
              cy="96"
              r="92"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="96"
              cy="96"
              r="92"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 2 * Math.PI * 92} ${2 * Math.PI * 92}`}
              className={progressColor}
              style={{ transition: 'stroke-dasharray 0.3s ease' }}
            />
          </svg>

          <div className="text-center relative z-10">
            <p className="text-5xl font-bold text-gray-900 dark:text-white">
              {Math.min(percentage, 100)}%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              of {formatCalories(dailyGoal)}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Consumed */}
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Consumed</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(totalCalories)}
          </p>
        </div>

        {/* Remaining */}
        <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Remaining</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {Math.round(Math.max(0, remaining))}
          </p>
        </div>

        {/* Goal */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Goal</p>
          <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
            {Math.round(dailyGoal)}
          </p>
        </div>
      </div>

      {/* Status Message */}
      <div className="mt-6 text-center">
        {percentage < 100 ? (
          <p className="text-green-600 dark:text-green-400 font-medium">
            Great! {Math.round(remaining)} calories left to reach your goal.
          </p>
        ) : (
          <p className="text-orange-600 dark:text-orange-400 font-medium">
            You've exceeded your goal by {Math.round(totalCalories - dailyGoal)} calories.
          </p>
        )}
      </div>
    </div>
  )
}
