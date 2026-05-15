'use client'

import { useEffect, useState } from 'react'
import { storage } from '@/lib/storage'
import { getTodayDate, calculateMacroPercentages, getPercentageOfGoal } from '@/lib/calculations'
import { ProgressBar } from '@/components/ProgressBar'
import { NutritionChart } from '@/components/NutritionChart'
import { DailyLog, UserSettings } from '@/types'
import { TrendingUp, Flame, Zap } from 'lucide-react'

export default function Dashboard() {
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null)
  const [settings, setSettings] = useState<UserSettings | null>(null)

  useEffect(() => {
    const todayDate = getTodayDate()
    const log = storage.getDailyLog(todayDate)
    const userSettings = storage.getUserSettings()
    setDailyLog(log)
    setSettings(userSettings)
  }, [])

  if (!dailyLog || !settings) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  const caloriesRemaining = settings.dailyCalorieGoal - dailyLog.totalCalories
  const percentageGoal = getPercentageOfGoal(dailyLog.totalCalories, settings.dailyCalorieGoal)
  const macroPercentages = calculateMacroPercentages(
    dailyLog.totalCalories,
    dailyLog.totalProtein,
    dailyLog.totalCarbs,
    dailyLog.totalFat
  )

  const date = new Date(dailyLog.date)
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Today's Summary</h1>
        <p className="text-gray-600 text-lg">{dateStr}</p>
      </div>

      {/* Main Calorie Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 mb-6 shadow-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-green-100 text-sm font-semibold mb-2">Total Calories</p>
            <h2 className="text-5xl font-bold">{Math.round(dailyLog.totalCalories)}</h2>
          </div>
          <Flame size={40} className="opacity-80" />
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
          <p className="text-green-50 text-sm mb-1">Daily Goal: {settings.dailyCalorieGoal} kcal</p>
          <p className={`text-lg font-semibold ${caloriesRemaining >= 0 ? 'text-green-200' : 'text-red-200'}`}>
            {caloriesRemaining >= 0 ? `${Math.round(caloriesRemaining)} calories remaining` : `${Math.abs(Math.round(caloriesRemaining))} calories over`}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <ProgressBar
          current={dailyLog.totalCalories}
          goal={settings.dailyCalorieGoal}
          label="Daily Progress"
          color="bg-green-500"
        />
        <div className="mt-4 text-center">
          <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
            {percentageGoal}% of daily goal
          </div>
        </div>
      </div>

      {/* Macros Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 uppercase font-semibold">Protein</p>
            <p className="text-2xl font-bold text-blue-600">{Math.round(dailyLog.totalProtein)}g</p>
            <p className="text-xs text-gray-500 mt-1">Goal: {settings.dailyProteinGoal}g</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 uppercase font-semibold">Carbs</p>
            <p className="text-2xl font-bold text-yellow-600">{Math.round(dailyLog.totalCarbs)}g</p>
            <p className="text-xs text-gray-500 mt-1">Goal: {Math.round(settings.dailyCalorieGoal * 0.45 / 4)}g</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-600 uppercase font-semibold">Fat</p>
            <p className="text-2xl font-bold text-purple-600">{Math.round(dailyLog.totalFat)}g</p>
            <p className="text-xs text-gray-500 mt-1">Goal: {Math.round(settings.dailyCalorieGoal * 0.30 / 9)}g</p>
          </div>
        </div>

        {/* Nutrition Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Macro Breakdown</h3>
          <NutritionChart
            protein={dailyLog.totalProtein}
            carbs={dailyLog.totalCarbs}
            fat={dailyLog.totalFat}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <p className="text-gray-600 text-sm">Entries Today</p>
          <p className="text-3xl font-bold text-gray-900">{dailyLog.entries.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm">
          <p className="text-gray-600 text-sm">Avg. Calories/Entry</p>
          <p className="text-3xl font-bold text-gray-900">
            {dailyLog.entries.length > 0 ? Math.round(dailyLog.totalCalories / dailyLog.entries.length) : 0}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 text-center shadow-sm col-span-2 md:col-span-1">
          <p className="text-gray-600 text-sm">Protein %</p>
          <p className="text-3xl font-bold text-red-600">{macroPercentages.protein}%</p>
        </div>
      </div>
    </div>
  )
}
