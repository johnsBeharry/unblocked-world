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
    // `data-scrolled` while the column is off its top: the mobile header fade
    // only shows then, so nothing is dimmed at scroll 0 (user report
    // 2026-11-25: the title sat under the fade on an Android phone).
    const markScrolled = () => {
      const scrolled = wrapper.scrollTop > 0
      if (scrolled !== (wrapper.dataset.scrolled === 'true')) wrapper.dataset.scrolled = String(scrolled)
    }
    markScrolled()
    wrapper.addEventListener('scroll', markScrolled, { passive: true })
    const lenis = new Lenis({ wrapper, content, autoRaf: false, smoothWheel: true })
    let frameId
    const frame = time => {
      lenis.raf(time)
      frameId = requestAnimationFrame(frame)
    }

    frameId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(frameId)
      wrapper.removeEventListener('scroll', markScrolled)
      lenis.destroy()
    }
  }, [wrapperRef, contentKey])
}
