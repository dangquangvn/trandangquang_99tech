import React from 'react'
import sunImage from '../assets/sun.png'
import { useSearch } from '../contexts/SearchContext'

const WeatherDisplay: React.FC = () => {
  const { weatherData } = useSearch()

  if (!weatherData) {
    //TODO: Add error handling
    return <h1>Error</h1>
  }

  return (
    <div className='weather__info relative' data-aos='fade-up'>
      {/* Left Section with Temperature and Info */}
      <div className='weather__text flex flex-col'>
        <p className='mb-2 font-semibold text-gray-700 dark:text-gray-300'>Today's Weather</p>

        <p className='text-6xl font-bold leading-none text-purple-800 md:text-8xl dark:text-gray-300'>
          {weatherData.temperature}&deg;
        </p>

        <p className='text-md mb-0 text-gray-700 md:mb-2 dark:text-gray-300'>
          <span>H: {weatherData.temperature_max}&deg;</span> <span>L: {weatherData.temperature_min}&deg;</span>
        </p>

        <div className='weather_description flex w-full items-end justify-between text-lg text-gray-600 md:items-center dark:text-gray-300'>
          <div className='md:text-md w-[50%] text-sm font-semibold text-gray-600 md:w-[25%] dark:text-gray-300'>
            {weatherData.location}
          </div>
          <div className='md:text-md -mt-[10%] flex w-[50%] flex-col-reverse items-end justify-between text-sm md:mt-0 md:w-[75%] md:flex-row md:items-center'>
            <span>{weatherData.date}</span>
            <span>Humidity: {weatherData.humidity}%</span>
            <span>{weatherData.weatherType}</span>
          </div>
        </div>
      </div>

      {/* Right Section with Sun/Cloud Image */}
      <div
        className='weather__img absolute -right-[5%] -top-[55%] h-40 w-40 md:-top-[65%] md:h-72 md:w-72'
        data-aos='slide-left'
      >
        <img src={sunImage} alt='Sun and Clouds' className='h-full w-full object-contain' />
      </div>
    </div>
  )
}

export default WeatherDisplay
