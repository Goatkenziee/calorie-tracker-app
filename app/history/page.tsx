'use client'

import { useEffect, useState } from 'react'
import { storage } from '@/lib/storage'
import { FoodCard } from '@/components/FoodCard'
import { DailyLog } from '@/types'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

export default function HistoryPage() {
  const [allLogs, setAllLogs] = useState<Record<string, DailyLog>>({})
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])

  useEffect(() => {
    const logs = storage.getAllLogs()
    setAllLogs(logs)
  }, [])

  const handleDeleteEntry = (entryId: string) => {
    storage.deleteFoodEntry(selectedDate, entryId)
    const updatedLog = storage.getDailyLog(selectedDate)
    setAllLogs(prev => ({
      ...prev,
      [selectedDate]: updatedLog
    }))
  }

  const currentLog = allLogs[selectedDate] || {
    date: selectedDate,
    entries: [],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  }

  const dates = Object.keys(allLogs).sort().reverse()

  const handlePrevDay = () => {
    const current = new Date(selectedDate)
    current.setDate(current.getDate() - 1)
    setSelectedDate(current.toISOString().split('T')[0])
  }

  const handleNextDay = () => {
    const current = new Date(selectedDate)
    current.setDate(current.getDate() + 1)
    setSelectedDate(current.toISOString().split('T')[0])
  }

  const dateObj = new Date(selectedDate + 'T00:00:00')
  const dateStr = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Food History</h1>

      {/* Date Selector */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevDay}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-2 text-center flex-1">
            <Calendar size={20} className="text-green-500" />
            <h2 className="text-xl font-semibold text-gray-900">{dateStr}</h2>
          </div>

          <button
            onClick={handleNextDay}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Quick Date Navigation */}
        {dates.length > 0 && (
          <div className="overflow-x-auto">
            <div className="flex gap-2 min-w-min">
              {dates.slice(0, 7).map(date => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-3 py-2 rounded-lg whitespace-nowrap font-semibold transition-colors ${
                    selectedDate === date
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                  })}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Daily Summary */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Calories</p>
          <p className="text-3xl font-bold text-blue-600">{Math.round(currentLog.totalCalories)}</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Protein</p>
          <p className="text-3xl font-bold text-red-600">{Math.round(currentLog.totalProtein)}g</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Carbs</p>
          <p className="text-3xl font-bold text-yellow-600">{Math.round(currentLog.totalCarbs)}g</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Fat</p>
          <p className="text-3xl font-bold text-purple-600">{Math.round(currentLog.totalFat)}g</p>
        </div>
      </div>

      {/* Food Entries */}
      {currentLog.entries.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Entries ({currentLog.entries.length})</h2>
          {currentLog.entries.map(entry => (
            <FoodCard
              key={entry.id}
              entry={entry}
              onDelete={() => handleDeleteEntry(entry.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center shadow-sm">
          <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">No food entries for this date</p>
          <p className="text-gray-500 text-sm mt-2">Add some food to get started!</p>
        </div>
      )}
    </div>
  )
}
