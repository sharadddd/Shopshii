import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Automatically scrolls window to top on route navigation in React Router.
 * Resolves the issue where new pages open in the middle or end of the screen
 * due to preserved scroll offset from previous pages.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If an anchor hash exists (e.g. #products, #about), scroll to that element
    if (hash) {
      const targetId = hash.replace('#', '')
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    // Always reset the viewport to top (0,0) on page transition
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname, hash])

  return null
}
