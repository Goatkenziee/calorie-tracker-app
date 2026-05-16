'use client'

import { useRef, useState } from 'react'

interface FoodPhotoCaptureProps {
  onPhotoCapture: (photoUrl: string, estimatedCalories: number) => void
  isLoading: boolean
}

export default function FoodPhotoCapture({
  onPhotoCapture,
  isLoading,
}: FoodPhotoCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [estimatedCalories, setEstimatedCalories] = useState(300)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string
        setPreview(imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCapture = () => {
    if (preview) {
      onPhotoCapture(preview, estimatedCalories)
      // Reset
      setPreview(null)
      setEstimatedCalories(300)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        📸 Capture Food Photo
      </h3>

      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview or Upload Button */}
      {!preview ? (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Take Photo
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Upload Image
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img
              src={preview}
              alt="Food preview"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Calorie Estimate Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Estimated Calories: <span className="font-bold">{estimatedCalories} kcal</span>
            </label>
            <input
              type="range"
              min="50"
              max="2000"
              step="50"
              value={estimatedCalories}
              onChange={(e) => setEstimatedCalories(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span>50</span>
              <span>2000</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCapture}
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? 'Saving...' : 'Add to Log'}
            </button>
            <button
              onClick={() => {
                setPreview(null)
                setEstimatedCalories(300)
                if (fileInputRef.current) {
                  fileInputRef.current.value = ''
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* AI Recognition Note */}
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            💡 Tip: Adjust the calorie slider to match your portion size.
            For better accuracy, try to capture the full meal in good lighting.
          </p>
        </div>
      )}
    </div>
  )
}
