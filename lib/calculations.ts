import { FoodEntry, UserSettings } from '@/types'

export const calculateMacroPercentages = (calories: number, protein: number, carbs: number, fat: number) => {
  const proteinCals = protein * 4
  const carbsCals = carbs * 4
  const fatCals = fat * 9

  return {
    protein: calories > 0 ? Math.round((proteinCals / calories) * 100) : 0,
    carbs: calories > 0 ? Math.round((carbsCals / calories) * 100) : 0,
    fat: calories > 0 ? Math.round((fatCals / calories) * 100) : 0,
  }
}

export const calculateCalorieGoalRemaining = (dailyGoal: number, consumed: number) => {
  return dailyGoal - consumed
}

export const calculateDailyDeficit = (dailyGoal: number, consumed: number) => {
  return dailyGoal - consumed
}

export const calculateBMR = (weight: number, height: number, age: number, gender: string) => {
  // Mifflin-St Jeor equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else if (gender === 'female') {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
  return 10 * weight + 6.25 * height - 5 * age - 78
}

export const calculateTDEE = (bmr: number, activityLevel: string) => {
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9,
  }

  return bmr * (activityMultipliers[activityLevel] || 1.55)
}

export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

export const getTodayDate = (): string => {
  return formatDate(new Date())
}

export const getWeekDateRange = (): { start: string; end: string } => {
  const today = new Date()
  const start = new Date(today)
  start.setDate(today.getDate() - 6)
  
  return {
    start: formatDate(start),
    end: formatDate(today),
  }
}

export const getMonthDateRange = (): { start: string; end: string } => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  
  return {
    start: formatDate(start),
    end: formatDate(today),
  }
}

export const formatCalories = (calories: number): string => {
  return `${Math.round(calories)} kcal`
}

export const formatMacro = (grams: number): string => {
  return `${Math.round(grams)}g`
}

export const getPercentageOfGoal = (current: number, goal: number): number => {
  return goal > 0 ? Math.min(Math.round((current / goal) * 100), 100) : 0
}
