/* eslint-disable @typescript-eslint/no-explicit-any */
const localStorageUtil = {
  // Get item from localStorage, with optional JSON parsing
  get: (key: string): any => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage`, error)
      return null
    }
  },

  // Set item to localStorage, automatically stringifying JSON
  set: (key: string, value: any): void => {
    try {
      const jsonValue = JSON.stringify(value)
      localStorage.setItem(key, jsonValue)
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage`, error)
    }
  },

  // Remove item from localStorage
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage`, error)
    }
  },

  // Clear all items in localStorage
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage', error)
    }
  }
}

export default localStorageUtil
