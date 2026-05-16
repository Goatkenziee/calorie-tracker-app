'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useCalorieStore from '@/lib/store'
import CalorieTracker from '@/components/CalorieTracker'
import MealList from '@/components/MealList'
import FoodPhotoCapture from '@/components/FoodPhotoCapture'
import GoalSettings from '@/components/GoalSettings'

export default function Home() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [photoLoading, setPhotoLoading] = useState(false)
  const loadFromStorage = useCalorieStore((state) => state.loadFromStorage)
  const addMeal = useCalorieStore((state) => state.addMeal)
  const darkMode = useCalorieStore((state) => state.darkMode)

  // Load from localStorage on mount
  useEffect(() => {
    loadFromStorage()
    setMounted(true)
  }, [loadFromStorage])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading your calorie tracker...</p>
      </div>
    )
  }

  const handlePhotoCapture = (photoUrl: string, calories: number) => {
    setPhotoLoading(true)

    // Simulate processing delay
    setTimeout(() => {
      addMeal({
        name: 'Food from photo',
        calories,
        category: 'snack',
        photoUrl,
      })
      setPhotoLoading(false)
    }, 300)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  🔥 Calorie Tracker
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <button
                onClick={() => router.push('/log-meal')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                + Log Meal
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Calorie Tracker */}
          <CalorieTracker />

          {/* Settings & Photo Capture */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GoalSettings />
            <FoodPhotoCapture
              onPhotoCapture={handlePhotoCapture}
              isLoading={photoLoading}
            />
          </div>

          {/* Today's Meals */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              📋 Today's Meals
            </h2>
            <MealList />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🍎 Track your calories, build healthy habits. All data stored locally on your device.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
