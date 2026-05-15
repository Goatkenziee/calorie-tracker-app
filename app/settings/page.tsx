'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { storage } from '@/lib/storage'
import { calculateBMR, calculateTDEE } from '@/lib/calculations'
import { UserSettings } from '@/types'
import { Save } from 'lucide-react'

const settingsSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  age: z.number().min(18).max(120),
  weight: z.number().min(30).max(500),
  height: z.number().min(100).max(250),
  gender: z.enum(['male', 'female', 'other']),
  activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active']),
  dailyCalorieGoal: z.number().min(1200).max(5000),
  dailyProteinGoal: z.number().min(30).max(300),
})

type SettingsFormData = z.infer<typeof settingsSchema>

export default function SettingsPage() {
  const [savedSettings, setSavedSettings] = useState<UserSettings | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  })

  useEffect(() => {
    const settings = storage.getUserSettings()
    setSavedSettings(settings)
    reset(settings)
  }, [reset])

  const weight = watch('weight')
  const height = watch('height')
  const age = watch('age')
  const gender = watch('gender')
  const activityLevel = watch('activityLevel')

  // Calculate estimated calorie needs
  let estimatedBMR = 0
  let estimatedTDEE = 0
  if (weight && height && age) {
    estimatedBMR = calculateBMR(weight, height, age, gender)
    estimatedTDEE = calculateTDEE(estimatedBMR, activityLevel)
  }

  const onSubmit = (data: SettingsFormData) => {
    try {
      storage.saveUserSettings(data)
      setSavedSettings(data)
      setMessage({ type: 'success', text: 'Settings saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' })
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success'
            ? 'bg-green-100 border border-green-400 text-green-700'
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                <input
                  type="number"
                  {...register('age', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                <select
                  {...register('gender')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register('weight', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.weight && <p className="text-red-600 text-sm mt-1">{errors.weight.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  {...register('height', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.height && <p className="text-red-600 text-sm mt-1">{errors.height.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Level</label>
              <select
                {...register('activityLevel')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="light">Light (exercise 1-3 days/week)</option>
                <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                <option value="active">Active (exercise 6-7 days/week)</option>
                <option value="very_active">Very Active (intense exercise daily)</option>
              </select>
              {errors.activityLevel && <p className="text-red-600 text-sm mt-1">{errors.activityLevel.message}</p>}
            </div>
          </div>
        </div>

        {/* Calorie Estimates */}
        {estimatedBMR > 0 && (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Calorie Estimates</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">BMR (Basal Metabolic Rate)</p>
                <p className="text-3xl font-bold text-blue-600">{Math.round(estimatedBMR)}</p>
                <p className="text-xs text-gray-600 mt-1">kcal/day at rest</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">TDEE (Daily Energy Expenditure)</p>
                <p className="text-3xl font-bold text-blue-600">{Math.round(estimatedTDEE)}</p>
                <p className="text-xs text-gray-600 mt-1">kcal/day with activity</p>
              </div>
            </div>
          </div>
        )}

        {/* Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Goals</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Daily Calorie Goal</label>
              <input
                type="number"
                step="50"
                {...register('dailyCalorieGoal', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.dailyCalorieGoal && <p className="text-red-600 text-sm mt-1">{errors.dailyCalorieGoal.message}</p>}
              <p className="text-xs text-gray-600 mt-2">
                Estimated TDEE: {Math.round(estimatedTDEE)} kcal
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Daily Protein Goal (g)</label>
              <input
                type="number"
                step="5"
                {...register('dailyProteinGoal', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.dailyProteinGoal && <p className="text-red-600 text-sm mt-1">{errors.dailyProteinGoal.message}</p>}
              <p className="text-xs text-gray-600 mt-2">
                Recommended: {Math.round(weight * 1.6)} - {Math.round(weight * 2.2)}g (1.6-2.2g per kg)
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Save size={20} />
          Save Settings
        </button>
      </form>
    </div>
  )
}
