/**
 * Utility functions for calorie tracking calculations
 */

/**
 * Format calories for display (round to nearest integer)
 */
export function formatCalories(calories: number): string {
  return Math.round(calories).toLocaleString()
}

/**
 * Calculate percentage of daily goal consumed
 */
export function getCaloriePercentage(consumed: number, goal: number): number {
  if (goal <= 0) return 0
  return Math.min((consumed / goal) * 100, 100)
}

/**
 * Calculate remaining calories for the day
 */
export function getRemainingCalories(consumed: number, goal: number): number {
  return Math.max(0, goal - consumed)
}

/**
 * Get Tailwind color class based on calorie intake vs goal
 */
export function getCalorieProgressColor(consumed: number, goal: number): string {
  if (consumed === 0) return 'text-gray-400'
  const percentage = (consumed / goal) * 100
  
  if (percentage < 50) return 'text-blue-500'
  if (percentage < 80) return 'text-green-500'
  if (percentage < 100) return 'text-yellow-500'
  if (percentage < 120) return 'text-orange-500'
  return 'text-red-500'
}

/**
 * Format timestamp to readable time string (HH:MM AM/PM)
 */
export function getTimeString(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDateKey(): string {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

/**
 * Check if a timestamp is from today
 */
export function isFromToday(timestamp: number): boolean {
  const mealDate = new Date(timestamp).toISOString().split('T')[0]
  const today = getTodayDateKey()
  return mealDate === today
}

/**
 * Generate a unique ID for a meal (timestamp + random suffix)
 */
export function generateMealId(): string {
  return `meal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Validate calorie input
 */
export function isValidCalories(value: unknown): value is number {
  const num = Number(value)
  return !isNaN(num) && num > 0 && num <= 5000
}

/**
 * Common food calorie reference database
 * Used for quick estimation if user hasn't captured a photo
 */
export const COMMON_FOODS = {
  breakfast: [
    { name: 'Oatmeal (1 cup cooked)', calories: 150 },
    { name: 'Scrambled eggs (2)', calories: 200 },
    { name: 'Toast with butter (1 slice)', calories: 150 },
    { name: 'Banana', calories: 105 },
    { name: 'Greek yogurt (1 cup)', calories: 130 },
    { name: 'Granola (1 cup)', calories: 600 },
  ],
  lunch: [
    { name: 'Chicken breast (100g)', calories: 165 },
    { name: 'Rice bowl (1 cup cooked)', calories: 206 },
    { name: 'Sandwich (2 slices bread + fillings)', calories: 350 },
    { name: 'Salad with dressing', calories: 200 },
    { name: 'Pasta (1 cup cooked)', calories: 220 },
    { name: 'Beef burger', calories: 540 },
  ],
  dinner: [
    { name: 'Grilled salmon (100g)', calories: 206 },
    { name: 'Broccoli (1 cup)', calories: 55 },
    { name: 'Sweet potato (1 medium)', calories: 103 },
    { name: 'Chicken thigh (100g)', calories: 210 },
    { name: 'Pizza slice', calories: 280 },
    { name: 'Steak (100g)', calories: 271 },
  ],
  snack: [
    { name: 'Apple', calories: 95 },
    { name: 'Almonds (1 oz)', calories: 164 },
    { name: 'Protein bar', calories: 200 },
    { name: 'Cheese (1 oz)', calories: 113 },
    { name: 'Peanut butter (2 tbsp)', calories: 188 },
    { name: 'Chocolate bar', calories: 235 },
  ],
} as const

/**
 * Get calorie estimate from common foods database
 */
export function getCalorieEstimate(foodName: string): number | null {
  const lowerName = foodName.toLowerCase()
  
  for (const category of Object.values(COMMON_FOODS)) {
    for (const food of category) {
      if (food.name.toLowerCase().includes(lowerName)) {
        return food.calories
      }
    }
  }
  
  return null
}
