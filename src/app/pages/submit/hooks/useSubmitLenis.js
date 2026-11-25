import { useLayoutEffect } from 'react'
import Lenis from 'lenis'

// Smooth scrolling for the Submit form column (mouse / trackpad only: touch
// screens keep native scrolling, Lenis adds nothing there and the iOS
// keyboard handling is simpler without it, user request 2026-11-26). `contentKey` changes with each
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
    const touch = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const lenis = touch ? null : new Lenis({ wrapper, content, autoRaf: false, smoothWheel: true })
    let frameId
    const frame = time => {
      lenis.raf(time)
      frameId = requestAnimationFrame(frame)
    }

    if (lenis) frameId = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(frameId)
      wrapper.removeEventListener('scroll', markScrolled)
      lenis?.destroy()
    }
  }, [wrapperRef, contentKey])
}
