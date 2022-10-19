import axios from 'axios'
import { useState } from 'react'

type FetchingReturn = [() => Promise<void>, boolean, string]

export const useFetching = (callback: () => void): FetchingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const fetching = async () => {
    try {
      setIsLoading(true)
      await callback()
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(JSON.stringify(err, null, 2))
      }
    } finally {
      setIsLoading(false)
    }
  }
  return [fetching, isLoading, error]
}
