import { FoodEntry, DailyLog, UserSettings } from '@/types'

const STORAGE_KEYS = {
  DAILY_LOGS: 'calorie_tracker_daily_logs',
  USER_SETTINGS: 'calorie_tracker_user_settings',
}

// Default user settings
const defaultSettings: UserSettings = {
  dailyCalorieGoal: 2000,
  dailyProteinGoal: 150,
  dietaryRestrictions: [],
  weight: 70,
  height: 175,
  age: 30,
  gender: 'male',
  activityLevel: 'moderate',
}

export const storage = {
  // Daily Logs
  getDailyLog: (date: string): DailyLog => {
    if (typeof window === 'undefined') return { date, entries: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || '{}')
    return logs[date] || { date, entries: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
  },

  saveDailyLog: (log: DailyLog) => {
    if (typeof window === 'undefined') return
    
    const logs = JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || '{}')
    logs[log.date] = log
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs))
  },

  addFoodEntry: (date: string, entry: FoodEntry) => {
    if (typeof window === 'undefined') return
    
    const log = storage.getDailyLog(date)
    log.entries.push(entry)
    log.totalCalories += entry.calories
    log.totalProtein += entry.protein
    log.totalCarbs += entry.carbs
    log.totalFat += entry.fat
    storage.saveDailyLog(log)
  },

  deleteFoodEntry: (date: string, entryId: string) => {
    if (typeof window === 'undefined') return
    
    const log = storage.getDailyLog(date)
    const entry = log.entries.find(e => e.id === entryId)
    
    if (entry) {
      log.totalCalories -= entry.calories
      log.totalProtein -= entry.protein
      log.totalCarbs -= entry.carbs
      log.totalFat -= entry.fat
      log.entries = log.entries.filter(e => e.id !== entryId)
      storage.saveDailyLog(log)
    }
  },

  getAllLogs: (): Record<string, DailyLog> => {
    if (typeof window === 'undefined') return {}
    
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || '{}')
  },

  // User Settings
  getUserSettings: (): UserSettings => {
    if (typeof window === 'undefined') return defaultSettings
    
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_SETTINGS) || JSON.stringify(defaultSettings))
  },

  saveUserSettings: (settings: UserSettings) => {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings))
  },
}
