import { useState, useEffect } from 'react'

type StoredValue<T> = T | null

/**
 * A custom React hook for interacting with localStorage.
 * @param key The key under which to store the value in localStorage.
 * @param initialValue The initial value to use if the key is not found in localStorage.
 * @returns A tuple containing the stored value and a function to update the stored value.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [StoredValue<T>, (value: T) => void] {
  // Get the initial value from localStorage if it exists, otherwise use the provided initial value
  const [storedValue, setStoredValue] = useState<StoredValue<T>>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.error('Error fetching from localStorage:', error)
      return initialValue
    }
  })

  // Update the localStorage value whenever the state changes
  const setValue = (value: T): void => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  // Listen for changes to the key in localStorage and update the state accordingly
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent): void => {
      if (event.key === key) {
        try {
          setStoredValue(
            event.newValue ? (JSON.parse(event.newValue) as T) : null
          )
        } catch (error) {
          console.error('Error parsing localStorage value:', error)
        }
      }
    }

    // Subscribe to storage events
    window.addEventListener('storage', handleStorageChange)

    return () => {
      // Unsubscribe from storage events
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key])

  return [storedValue, setValue]
}

export default useLocalStorage
