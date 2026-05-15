'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { storage } from '@/lib/storage'
import { getTodayDate } from '@/lib/calculations'
import { searchFoods } from '@/lib/foodDatabase'
import { Camera } from '@/components/Camera'
import { FoodEntry, FoodItem } from '@/types'
import { Search, Plus } from 'lucide-react'

const foodEntrySchema = z.object({
  foodId: z.string().min(1, 'Please select a food'),
  quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
  notes: z.string().optional(),
})

type FoodEntryFormData = z.infer<typeof foodEntrySchema>

export default function AddFoodPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<FoodItem[]>([])
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FoodEntryFormData>({
    resolver: zodResolver(foodEntrySchema),
    defaultValues: {
      quantity: 1,
    }
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 0) {
      const results = searchFoods(query)
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food)
    setSearchQuery('')
    setSearchResults([])
  }

  const onSubmit = async (data: FoodEntryFormData) => {
    if (!selectedFood) return

    setIsLoading(true)
    try {
      const entry: FoodEntry = {
        id: Math.random().toString(36),
        name: selectedFood.name,
        calories: selectedFood.calories * data.quantity,
        protein: selectedFood.protein * data.quantity,
        carbs: selectedFood.carbs * data.quantity,
        fat: selectedFood.fat * data.quantity,
        quantity: data.quantity,
        unit: selectedFood.servingSize,
        timestamp: Date.now(),
        imageUrl: capturedImage || undefined,
        notes: data.notes,
      }

      const todayDate = getTodayDate()
      storage.addFoodEntry(todayDate, entry)

      setSuccess(true)
      setSelectedFood(null)
      setCapturedImage(null)
      reset()

      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error adding food:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Food</h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <Plus size={20} />
          Food added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Food Search */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Food</h2>
          
          <div className="relative mb-4">
            <div className="relative flex items-center">
              <Search size={20} className="absolute left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search for food..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-2 max-h-64 overflow-y-auto z-10 shadow-lg">
                {searchResults.map((food) => (
                  <button
                    key={food.id}
                    type="button"
                    onClick={() => handleSelectFood(food)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{food.name}</p>
                        <p className="text-sm text-gray-600">{food.servingSize}</p>
                      </div>
                      <span className="text-sm font-semibold text-green-600">{food.calories} kcal</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedFood && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedFood.name}</h3>
                  <p className="text-sm text-gray-600">{selectedFood.servingSize}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFood(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-700">
                {selectedFood.calories} kcal | P: {selectedFood.protein}g | C: {selectedFood.carbs}g | F: {selectedFood.fat}g
              </p>
            </div>
          )}

          {selectedFood && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Quantity
              </label>
              <input
                type="number"
                step="0.5"
                placeholder="1"
                {...register('quantity', { valueAsNumber: true })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.quantity && (
                <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Camera */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Add Photo (Optional)</h2>
          
          {!capturedImage ? (
            <Camera onCapture={setCapturedImage} />
          ) : (
            <div className="space-y-4">
              <img
                src={capturedImage}
                alt="Captured food"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setCapturedImage(null)}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Remove Photo
              </button>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            placeholder="Add notes about this meal..."
            {...register('notes')}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedFood || isLoading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors"
        >
          {isLoading ? 'Adding Food...' : 'Add Food Entry'}
        </button>
      </form>
    </div>
  )
}
