import { useEffect } from 'react'

export function useScrollToTop(param: unknown, smooth = true) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
  }, [param])
}
