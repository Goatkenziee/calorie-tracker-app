'use client'

import { FoodEntry } from '@/types'
import { Trash2, Clock } from 'lucide-react'

interface FoodCardProps {
  entry: FoodEntry
  onDelete: (id: string) => void
}

export function FoodCard({ entry, onDelete }: FoodCardProps) {
  const date = new Date(entry.timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{entry.name}</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
            <Clock size={14} />
            {date}
          </div>
        </div>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-gray-400 hover:text-red-500 transition-colors p-2"
          title="Delete entry"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {entry.imageUrl && (
        <img
          src={entry.imageUrl}
          alt={entry.name}
          className="w-full h-32 object-cover rounded-md mb-3"
        />
      )}

      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-blue-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Calories</p>
          <p className="font-bold text-blue-600">{Math.round(entry.calories)}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Protein</p>
          <p className="font-bold text-red-600">{Math.round(entry.protein)}g</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Carbs</p>
          <p className="font-bold text-yellow-600">{Math.round(entry.carbs)}g</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-2">
          <p className="text-xs text-gray-600">Fat</p>
          <p className="font-bold text-purple-600">{Math.round(entry.fat)}g</p>
        </div>
      </div>

      {entry.notes && (
        <p className="text-sm text-gray-600 mt-3 italic">"{entry.notes}"</p>
      )}
    </div>
  )
}
