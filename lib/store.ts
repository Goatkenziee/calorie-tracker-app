'use client'

import { create } from 'zustand'
import { generateMealId, isFromToday } from './utils'

export interface Meal {
  id: string
  name: string
  calories: number
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  timestamp: number
  photoUrl?: string
}

interface CalorieStore {
  // State
  meals: Meal[]
  dailyGoal: number
  darkMode: boolean

  // Actions
  addMeal: (meal: Omit<Meal, 'id' | 'timestamp'>) => void
  removeMeal: (id: string) => void
  setDailyGoal: (goal: number) => void
  toggleDarkMode: () => void
  getTodayMeals: () => Meal[]
  getTodayCalories: () => number
  loadFromStorage: () => void
  saveToStorage: () => void
}

const STORAGE_KEY = 'calorieStore'

const useCalorieStore = create<CalorieStore>((set, get) => ({
  // Initial state
  meals: [],
  dailyGoal: 2000,
  darkMode: false,

  // Add a meal
  addMeal: (meal) => {
    const newMeal: Meal = {
      ...meal,
      id: generateMealId(),
      timestamp: Date.now(),
    }

    set((state) => ({
      meals: [...state.meals, newMeal],
    }))

    // Auto-save to localStorage
    setTimeout(() => get().saveToStorage(), 100)
  },

  // Remove a meal by ID
  removeMeal: (id) => {
    set((state) => ({
      meals: state.meals.filter((meal) => meal.id !== id),
    }))

    // Auto-save to localStorage
    setTimeout(() => get().saveToStorage(), 100)
  },

  // Set daily goal
  setDailyGoal: (goal) => {
    if (goal > 0) {
      set({ dailyGoal: goal })
      setTimeout(() => get().saveToStorage(), 100)
    }
  },

  // Toggle dark mode
  toggleDarkMode: () => {
    set((state) => ({
      darkMode: !state.darkMode,
    }))

    setTimeout(() => get().saveToStorage(), 100)
  },

  // Get meals from today only
  getTodayMeals: () => {
    const state = get()
    return state.meals.filter((meal) => isFromToday(meal.timestamp))
  },

  // Get total calories consumed today
  getTodayCalories: () => {
    const todayMeals = get().getTodayMeals()
    return todayMeals.reduce((total, meal) => total + meal.calories, 0)
  },

  // Load state from localStorage
  loadFromStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)

        set({
          meals: parsed.meals || [],
          dailyGoal: parsed.dailyGoal || 2000,
          darkMode: parsed.darkMode || false,
        })
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
  },

  // Save state to localStorage
  saveToStorage: () => {
    if (typeof window === 'undefined') return

    try {
      const state = get()
      const toStore = {
        meals: state.meals,
        dailyGoal: state.dailyGoal,
        darkMode: state.darkMode,
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  },
}))

export default useCalorieStore
