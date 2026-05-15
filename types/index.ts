export interface FoodEntry {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  quantity: number
  unit: string
  timestamp: number
  imageUrl?: string
  notes?: string
}

export interface DailyLog {
  date: string
  entries: FoodEntry[]
  totalCalories: number
  totalProtein: number
  totalCarbs: number
  totalFat: number
}

export interface UserSettings {
  dailyCalorieGoal: number
  dailyProteinGoal: number
  dietaryRestrictions: string[]
  weight: number
  height: number
  age: number
  gender: 'male' | 'female' | 'other'
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
}

export interface FoodItem {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  servingSize: string
  category: string
}

export interface NutrientDaily {
  date: string
  calories: number
  protein: number
  carbs: number
  fat: number
}
