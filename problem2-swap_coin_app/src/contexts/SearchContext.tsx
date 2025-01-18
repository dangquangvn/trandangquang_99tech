import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { WeatherData } from '../@types'
import { fetchWeatherByCity } from '../api/weather.api'
import { debounce } from '../utils/debounce'
import localStorageUtil from '../utils/localStorage'

interface SearchContextProps {
  weatherData: WeatherData | null
  history: WeatherData[]
  loading: boolean
  handleSearchSubmit: (city: string) => void
  deleteHistoryItem: (id: string) => void
}

const defaultWeatherData: WeatherData = {
  id: '123',
  temperature: 0,
  humidity: 0,
  location: '--',
  weatherType: '--',
  date: '--',
  temperature_max: 0,
  temperature_min: 0
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined)

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>(defaultWeatherData)
  const [history, setHistory] = useState<WeatherData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleSearchSubmit = async (city: string) => {
    if (!city) return

    setLoading(true)
    try {
      const data = await fetchWeatherByCity(city)
      if (data) {
        setWeatherData(data)
        setHistory([data, ...history])
        localStorageUtil.set('weather-history', [data, ...history])
        localStorageUtil.set('weather-data', data)
      } else {
        toast('City not found. Please try again.', { position: 'top-right' })
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching weather data', error)
      setLoading(false)
      toast('City not found. Please try again.', { position: 'top-right' })
    }
  }

  const debouncedSearchSubmit = useCallback(debounce(handleSearchSubmit, 200), [history])

  const deleteHistoryItem = (id: string) => {
    if (!location) return

    setHistory(history.filter((item) => item.id !== id))
    localStorageUtil.set(
      'weather-history',
      history.filter((item) => item.id !== id)
    )
  }

  useEffect(() => {
    const storedWeatherData = localStorageUtil.get('weather-data')
    const storedHistory = localStorageUtil.get('weather-history')

    if (storedHistory) {
      setHistory(storedHistory)
    }
    if (storedWeatherData) {
      setWeatherData(storedWeatherData)
    } else {
      handleSearchSubmit('Ha Noi')
    }
  }, [])

  const value = useMemo(
    () => ({ weatherData, history, handleSearchSubmit: debouncedSearchSubmit, loading, deleteHistoryItem }),
    [weatherData, history, loading]
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}
