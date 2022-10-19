import { useEffect, useState } from 'react'

const getWindowHeight = () => {
  return window.innerHeight
}

export const useHeight = (elName: string): number => {
  const [windowHeight, setWindowHeight] = useState<number>(getWindowHeight())
  const [elementHeight, setElementHeight] = useState<number>(0)

  useEffect(() => {
    setElementHeight(windowHeight - document.querySelector<HTMLElement>(elName)!.offsetHeight)
    const handleHeight = () => {
      setWindowHeight(getWindowHeight())
    }

    window.addEventListener('resize', handleHeight)
    return () => window.removeEventListener('resize', handleHeight)
  }, [windowHeight])

  return elementHeight
}
