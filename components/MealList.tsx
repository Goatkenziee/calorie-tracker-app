'use client'

import { useEffect, useState } from 'react'
import useCalorieStore, { Meal } from '@/lib/store'
import { formatCalories, getTimeString } from '@/lib/utils'

export default function MealList() {
  const [mounted, setMounted] = useState(false)
  const meals = useCalorieStore((state) => state.getTodayMeals())
  const removeMeal = useCalorieStore((state) => state.removeMeal)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Sort meals by timestamp (newest first)
  const sortedMeals = [...meals].sort((a, b) => b.timestamp - a.timestamp)

  // Group by category
  const grouped: Record<string, Meal[]> = {
    breakfast: [],
    lunch: [],
    dinner: [],
    snack: [],
  }

  sortedMeals.forEach((meal) => {
    grouped[meal.category].push(meal)
  })

  const categoryLabels: Record<string, string> = {
    breakfast: '🌅 Breakfast',
    lunch: '🥗 Lunch',
    dinner: '🍽️ Dinner',
    snack: '🍿 Snack',
  }

  const categoryColors: Record<string, string> = {
    breakfast: 'border-orange-500',
    lunch: 'border-green-500',
    dinner: 'border-purple-500',
    snack: 'border-yellow-500',
  }

  return (
    <div className="w-full space-y-6">
      {Object.entries(grouped).map(([category, categoryMeals]) => (
        <div key={category}>
          {categoryMeals.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <div className="space-y-2">
                {categoryMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between border-l-4 ${categoryColors[category]}`}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {meal.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {getTimeString(meal.timestamp)}
                      </p>
                      {meal.photoUrl && (
                        <div className="mt-2">
                          <img
                            src={meal.photoUrl}
                            alt={meal.name}
                            className="w-12 h-12 rounded object-cover"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <p className="text-lg font-bold text-gray-900 dark:text-white min-w-fit">
                        {formatCalories(meal.calories)}
                      </p>
                      <button
                        onClick={() => removeMeal(meal.id)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Delete meal"
                      >
                        <svg
                          className="w-5 h-5 text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {meals.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            No meals logged yet today
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            Start by logging a meal to track your calories
          </p>
        </div>
      )}
    </div>
  )
}
