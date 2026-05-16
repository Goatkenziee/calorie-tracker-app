'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useCalorieStore from '@/lib/store'

type MealCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export default function LogMealPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [calories, setCalories] = useState('')
  const [category, setCategory] = useState<MealCategory>('snack')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addMeal = useCalorieStore((state) => state.addMeal)
  const darkMode = useCalorieStore((state) => state.darkMode)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !calories) {
      alert('Please fill in all fields')
      return
    }

    const calorieValue = parseInt(calories)
    if (isNaN(calorieValue) || calorieValue <= 0) {
      alert('Please enter a valid calorie amount')
      return
    }

    setIsSubmitting(true)

    // Add meal
    addMeal({
      name: name.trim(),
      calories: calorieValue,
      category,
    })

    // Reset and redirect
    setName('')
    setCalories('')
    setCategory('snack')
    setIsSubmitting(false)

    router.push('/')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Log New Meal
              </h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Meal Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Meal Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Grilled Chicken Salad"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Be specific (e.g., "2 slices pizza" instead of just "pizza")
                </p>
              </div>

              {/* Calorie Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Calories *
                </label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  placeholder="e.g., 450"
                  min="1"
                  max="5000"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use common food databases if unsure (USDA, MyFitnessPal, Google)
                </p>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Meal Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-3 px-4 rounded-lg font-medium transition-colors capitalize ${
                        category === cat
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {cat === 'breakfast' && '🌅'}
                      {cat === 'lunch' && '🥗'}
                      {cat === 'dinner' && '🍽️'}
                      {cat === 'snack' && '🍿'}
                      <span className="ml-1">{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Food Suggestions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">
                  📚 Quick Calorie Reference
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs text-blue-800 dark:text-blue-200">
                  <div>• Apple: ~95 kcal</div>
                  <div>• Banana: ~105 kcal</div>
                  <div>• Chicken breast (100g): ~165 kcal</div>
                  <div>• Rice bowl: ~200-300 kcal</div>
                  <div>• Bread slice: ~80 kcal</div>
                  <div>• Egg: ~70 kcal</div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold transition-colors"
                >
                  {isSubmitting ? 'Saving...' : 'Add to Log'}
                </button>
              </div>
            </form>
          </div>

          {/* Helpful Tips */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              💡 How to Estimate Calories Accurately
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex gap-3">
                <span className="text-lg">🔍</span>
                <span>Use the <strong>USDA FoodData Central</strong> database (fdc.nal.usda.gov) for exact nutrition data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">⚖️</span>
                <span>Weigh portions if possible. A "medium" apple can vary greatly in size</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">🍽️</span>
                <span>For mixed dishes, estimate ingredients separately and add them up</span>
              </li>
              <li className="flex gap-3">
                <span className="text-lg">📱</span>
                <span>Apps like <strong>MyFitnessPal</strong> have large food databases with photos for reference</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  )
}
