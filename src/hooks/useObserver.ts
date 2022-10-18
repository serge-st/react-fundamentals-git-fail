import { useEffect, useRef } from 'react'

export const useObserver = (
  ref: React.MutableRefObject<HTMLDivElement>,
  canLoad: boolean,
  isLoading: boolean,
  callback: () => void
) => {
  const observer = useRef()

  useEffect(() => {
    if (isLoading) return
    // @ts-expect-error
    if (observer.current) observer.current.disconnect()
    // @ts-expect-error
    const cb = (entries, observer) => {
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }
    // @ts-expect-error
    observer.current = new IntersectionObserver(cb)
    // @ts-expect-error
    observer.current.observe(ref.current)
  }, [isLoading])
}
