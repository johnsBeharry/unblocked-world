import { useLayoutEffect } from 'react'
import Lenis from 'lenis'

// Smooth scrolling for the Submit form column. `contentKey` changes with each
// step (and Join / Sign in): the column is reset to the top in a layout effect,
// before the new content is painted, and `behavior: 'instant'` overrides the
// column's CSS `scroll-behavior: smooth`, so the user never sees it scroll up.
export function useSubmitLenis(wrapperRef, contentKey) {
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const content = wrapper?.firstElementChild
    if (!wrapper || !content) return undefined

    wrapper.scrollTo({ top: 0, behavior: 'instant' })
    const lenis = new Lenis({ wrapper, content, autoRaf: false, smoothWheel: true })
    let frameId
    const frame = time => {
      lenis.raf(time)
      frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(frameId)
      lenis.destroy()
    }
  }, [wrapperRef, contentKey])
}
