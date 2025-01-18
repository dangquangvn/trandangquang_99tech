import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SearchProvider } from './contexts/SearchContext.tsx'
import 'react-toastify/dist/ReactToastify.css'
import 'aos/dist/aos.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </StrictMode>
)
