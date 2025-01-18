import React, { useState } from 'react'
import { useSearch } from '../contexts/SearchContext'

const SearchBar: React.FC = () => {
  const [city, setCity] = useState('')
  const [inputFocused, setInputFocused] = useState(false)

  const { loading, handleSearchSubmit } = useSearch()

  return (
    <div className='flex w-full items-center justify-between space-x-2'>
      {/* Search Input */}
      <div className='relative mr-1 w-full flex-1'>
        <input
          type='text'
          id='city-input'
          value={city}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && handleSearchSubmit(city)}
          placeholder=' '
          className={`w-full rounded-2xl border border-transparent bg-white bg-opacity-20 px-4 py-3 text-black outline-none backdrop-blur-lg transition-all duration-300 ease-in-out focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:bg-opacity-40 dark:text-gray-300 dark:ring-gray-500 ${
            inputFocused ? 'ring-2 ring-gray-500' : ''
          }`}
        />
        <label
          htmlFor='city-input'
          className={`absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-700 transition-all duration-300 ease-in-out dark:text-gray-400 ${
            inputFocused || city ? 'left-4 top-2 text-sm text-gray-500' : ''
          }`}
          style={{ fontSize: inputFocused || city ? '10px' : 'initial' }}
        >
          Country
        </label>
      </div>

      {/* Search Button with Icon */}
      <button
        className='flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 transition duration-300 hover:border-purple-500 hover:bg-purple-700 focus:outline-none active:scale-75 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50 dark:bg-violet-700 dark:hover:border-violet-600 dark:hover:bg-violet-800 disabled:dark:bg-gray-600'
        disabled={loading}
        onClick={() => handleSearchSubmit(city)}
      >
        {loading ? (
          <svg
            aria-hidden='true'
            className='h-6 w-6 animate-spin fill-gray-200 text-gray-400'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
        ) : (
          <span className='icon-[mdi--search] flex-shrink-0 text-2xl text-white' />
        )}
      </button>
    </div>
  )
}

export default SearchBar
