import { useEffect } from 'react'

// The Submit page is a full-screen shell that scrolls inside its form column;
// the window itself should never move. iOS Safari scrolls the window to make
// room for the keyboard and can leave it there after the keyboard closes, so
// the title slid under the fixed header and could not be scrolled back
// (iPhone report 2026-11-26). When a field loses focus and no other field
// takes it, the window goes back to the top.
const FIELD = 'input, textarea, select, [contenteditable="true"]'

export function useWindowAtTop() {
  useEffect(() => {
    let timer
    const reset = () => {
      clearTimeout(timer)
      // After the focus moves (a tap on the next field keeps the keyboard).
      timer = setTimeout(() => {
        if (!document.activeElement?.matches(FIELD) && window.scrollY !== 0) window.scrollTo({ top: 0, behavior: 'instant' })
      }, 100)
    }
    window.addEventListener('focusout', reset)
    window.visualViewport?.addEventListener('resize', reset)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('focusout', reset)
      window.visualViewport?.removeEventListener('resize', reset)
    }
  }, [])
}
