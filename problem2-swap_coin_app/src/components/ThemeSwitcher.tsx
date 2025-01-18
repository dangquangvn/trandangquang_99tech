import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      setTheme(storedTheme as 'light' | 'dark')
      document.documentElement.classList.toggle('dark', storedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')

    // Save the selected theme to localStorage
    localStorage.setItem('theme', newTheme)
  }

  return (
    <>
      <ToastContainer theme={theme} />
      <button
        onClick={toggleTheme}
        className='fixed bottom-4 right-4 ml-auto h-12 w-12 rounded-full bg-gray-300 shadow-lg transition-colors duration-300 ease-in-out hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600'
      >
        {theme === 'light' ? '🌞' : '🌜'}
      </button>
    </>
  )
}

export default ThemeSwitcher
