import axios from 'axios'
import { v4 as uuid } from 'uuid'
import { CONFIG } from '../config'
import { WeatherData } from '../@types'
import { formatDate } from '../utils/date'

export const fetchWeatherByCity = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(CONFIG.WEAHTER_API_URL, {
      params: {
        q: city,
        appid: CONFIG.WEATHER_API_KEY,
        units: 'metric'
      }
    })

    const data = response.data

    if (data) {
      return {
        id: uuid(),
        temperature: Math.round(data.main.temp),
        temperature_max: Math.round(data.main.temp_max),
        temperature_min: Math.round(data.main.temp_min),
        humidity: data.main.humidity,
        location: `${data.name}, ${data.sys.country}`,
        weatherType: data.weather[0].main,
        date: formatDate()
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching weather data', error)
    throw new Error('Failed to fetch weather data')
  }
}
