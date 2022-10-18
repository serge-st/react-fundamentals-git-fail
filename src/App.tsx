import { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import Navbar from './components/UI/Navbar/Navbar'
import { AuthCountext, LOCAL_STORAGE_AUTH_KEY } from './context'
import './styles/App.css'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)) {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthCountext.Provider value={{
      isAuthenticated,
      setIsAuthenticated,
      isLoading
    }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthCountext.Provider>
  )
}

export default App
