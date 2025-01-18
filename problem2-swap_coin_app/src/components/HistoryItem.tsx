import { motion } from 'framer-motion'
import React from 'react'
import { WeatherData } from '../@types'
import { useSearch } from '../contexts/SearchContext'

interface HistoryItemProps {
  item: WeatherData
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item }) => {
  const { handleSearchSubmit, deleteHistoryItem } = useSearch()
  return (
    <motion.li
      key={item.id}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 25, scale: 1.025 }}
      layout
      className='flex items-center justify-between rounded-xl bg-white bg-opacity-30 p-4 shadow-md dark:bg-gray-800 dark:bg-opacity-70 dark:text-gray-300'
    >
      {/* Left side: Location and Date */}
      <div className='flex flex-col'>
        <span className='md:text-md text-sm font-medium text-gray-800 dark:text-gray-300'>{item.location}</span>
        <span className='text-xs text-gray-500 md:text-sm dark:text-gray-400'>{item.date}</span>
      </div>

      {/* Right side: Temperature and Actions */}
      <div className='flex items-center space-x-4'>
        <span className='text-md font-semibold text-gray-700 md:text-lg dark:text-gray-100'>
          {item.temperature}&deg;C
        </span>

        <div className='flex space-x-2 text-gray-600'>
          <button
            className='flex h-6 w-6 items-center justify-center rounded-full bg-white transition duration-200 ease-in-out hover:border-gray-200 hover:bg-gray-200 focus:outline-none active:scale-75 md:h-8 md:w-8 dark:border-gray-400 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-600'
            onClick={() => handleSearchSubmit(item.location)}
          >
            <span className='icon-[mdi--search] flex-shrink-0' />
          </button>

          <button
            className='flex h-6 w-6 items-center justify-center rounded-full bg-white transition-colors duration-200 ease-in-out hover:border-red-200 hover:bg-red-300 active:scale-75 md:h-8 md:w-8 dark:border-gray-400 dark:bg-transparent dark:text-gray-400 dark:hover:bg-red-700'
            onClick={() => deleteHistoryItem(item.id)}
          >
            <span className='icon-[mdi--trash] flex-shrink-0' />
          </button>
        </div>
      </div>
    </motion.li>
  )
}

export default HistoryItem
