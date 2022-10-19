import { createContext, Dispatch, SetStateAction } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  isLoading: boolean
}

export const AuthCountext = createContext<AuthContextType | null>(null)

export const LOCAL_STORAGE_AUTH_KEY = 'auth'
