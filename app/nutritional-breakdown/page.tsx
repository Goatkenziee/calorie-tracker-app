'use client'

import { useEffect, useState } from 'react'
import { storage } from '@/lib/storage'
import { getTodayDate, getWeekDateRange, getMonthDateRange, calculateMacroPercentages, getPercentageOfGoal } from '@/lib/calculations'
import { NutritionChart } from '@/components/NutritionChart'
import { ProgressBar } from '@/components/ProgressBar'
import { DailyLog, UserSettings } from '@/types'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { TrendingUp } from 'lucide-react'

type TimeRange = 'today' | 'week' | 'month'

export default function NutritionalBreakdownPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('today')
  const [allLogs, setAllLogs] = useState<Record<string, DailyLog>>({})
  const [settings, setSettings] = useState<UserSettings | null>(null)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    const logs = storage.getAllLogs()
    const userSettings = storage.getUserSettings()
    setAllLogs(logs)
    setSettings(userSettings)

    // Generate chart data based on time range
    generateChartData(logs, timeRange)
  }, [timeRange])

  const generateChartData = (logs: Record<string, DailyLog>, range: TimeRange) => {
    let dateRange: { start: string; end: string }

    if (range === 'today') {
      const today = getTodayDate()
      dateRange = { start: today, end: today }
    } else if (range === 'week') {
      dateRange = getWeekDateRange()
    } else {
      dateRange = getMonthDateRange()
    }

    const data: any[] = []
    const start = new Date(dateRange.start)
    const end = new Date(dateRange.end)

    while (start <= end) {
      const dateStr = start.toISOString().split('T')[0]
      const log = logs[dateStr] || {
        date: dateStr,
        entries: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
      }

      data.push({
        date: new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        calories: log.totalCalories,
        protein: log.totalProtein,
        carbs: log.totalCarbs,
        fat: log.totalFat,
      })

      start.setDate(start.getDate() + 1)
    }

    setChartData(data)
  }

  if (!settings) return <div>Loading...</div>

  // Calculate totals for selected range
  const total = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  }

  chartData.forEach(item => {
    total.calories += item.calories
    total.protein += item.protein
    total.carbs += item.carbs
    total.fat += item.fat
  })

  const macroPercentages = calculateMacroPercentages(
    total.calories,
    total.protein,
    total.carbs,
    total.fat
  )

  const today = getTodayDate()
  const todayLog = allLogs[today] || {
    date: today,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Nutritional Analytics</h1>

      {/* Time Range Selector */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex gap-2">
        {(['today', 'week', 'month'] as TimeRange[]).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors capitalize ${
              timeRange === range
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Total Calories</p>
          <p className="text-4xl font-bold text-blue-600">{Math.round(total.calories)}</p>
          <p className="text-xs text-gray-600 mt-2">
            Avg: {Math.round(total.calories / chartData.length)} per day
          </p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Protein</p>
          <p className="text-4xl font-bold text-red-600">{Math.round(total.protein)}g</p>
          <p className="text-xs text-gray-600 mt-2">
            {macroPercentages.protein}% of calories
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Carbs</p>
          <p className="text-4xl font-bold text-yellow-600">{Math.round(total.carbs)}g</p>
          <p className="text-xs text-gray-600 mt-2">
            {macroPercentages.carbs}% of calories
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
          <p className="text-sm text-gray-600 mb-2">Fat</p>
          <p className="text-4xl font-bold text-purple-600">{Math.round(total.fat)}g</p>
          <p className="text-xs text-gray-600 mt-2">
            {macroPercentages.fat}% of calories
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Calorie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daily Calories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Macro Distribution - Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Macro Distribution</h2>
          <NutritionChart
            protein={total.protein}
            carbs={total.carbs}
            fat={total.fat}
          />
        </div>
      </div>

      {/* Macro Trend */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Macro Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="protein" stroke="#EF4444" name="Protein (g)" />
            <Line type="monotone" dataKey="carbs" stroke="#FBBF24" name="Carbs (g)" />
            <Line type="monotone" dataKey="fat" stroke="#8B5CF6" name="Fat (g)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Today's Goals */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Progress</h2>
        <div className="space-y-4">
          <ProgressBar
            current={todayLog.totalCalories}
            goal={settings.dailyCalorieGoal}
            label="Calories"
            color="bg-blue-500"
          />
          <ProgressBar
            current={todayLog.totalProtein}
            goal={settings.dailyProteinGoal}
            label="Protein (g)"
            color="bg-red-500"
          />
          <ProgressBar
            current={todayLog.totalCarbs}
            goal={Math.round(settings.dailyCalorieGoal * 0.45 / 4)}
            label="Carbs (g)"
            color="bg-yellow-500"
          />
          <ProgressBar
            current={todayLog.totalFat}
            goal={Math.round(settings.dailyCalorieGoal * 0.30 / 9)}
            label="Fat (g)"
            color="bg-purple-500"
          />
        </div>
      </div>
    </div>
  )
}
