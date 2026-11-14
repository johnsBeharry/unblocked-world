import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let activeLenis = null

// Lets overlays (e.g. the intro loader) pause and resume smooth scrolling.
export const getLenis = () => activeLenis

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: false })
    activeLenis = lenis

    // One clock for scroll and animation: Lenis advances on the GSAP ticker
    // and every Lenis scroll updates ScrollTrigger in the same frame, so
    // scrubbed animations never lag behind the smoothed scroll position.
    const tick = (time) => lenis.raf(time * 1000)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      if (activeLenis === lenis) activeLenis = null
    }
  }, [])

  return null
}
