import { useEffect } from 'react'
import Lenis from 'lenis'

export function useSubmitLenis(wrapperRef, contentKey) {
  useEffect(() => {
    const wrapper = wrapperRef.current
    const content = wrapper?.firstElementChild
    if (!wrapper || !content) return undefined

    wrapper.scrollTop = 0
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
