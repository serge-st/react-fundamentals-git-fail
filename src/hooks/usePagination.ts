import { useMemo } from 'react'

export const usePagination = (totalPages: number): number[] => {
  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }, [totalPages])
  return pages
}
