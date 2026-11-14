import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { getLenis } from '../smooth-scroll/SmoothScroll.jsx'
import { getCurtainColor } from './curtainColors.js'
import styles from './PageCurtain.module.scss'

// Page-leave curtain (same strip concept as the footer brand masks): on
// internal navigation, horizontal strips close bottom → top in the
// destination page's hero colour, then the browser navigates. There is no
// curtain on load (per user) so content reveals stay visible; the boot cover
// in index.html (same colour) bridges the page load and is removed on mount.
const STRIPS = 20
const EASE = 'power2.inOut'
// Total close ≈ 0.5s + 19 × 0.02s ≈ 0.9s, same pace as with fewer strips.
const CLOSE = { duration: 0.5, stagger: 0.02 }

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches


function getInternalHref(event) {
  if (event.defaultPrevented || event.button !== 0) return null
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
  const link = event.target.closest?.('a[href]')
  if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return null
  const url = new URL(link.href, window.location.href)
  if (url.origin !== window.location.origin) return null
  if (url.pathname === window.location.pathname) return null // same page / hash links
  return url
}

export function PageCurtain() {
  const rootRef = useRef(null)
  const [enabled] = useState(() => !prefersReducedMotion())
  const [visible, setVisible] = useState(false)

  // Content phase from the first paint: page reveals start right away.
  useLayoutEffect(() => {
    document.body.dataset.pagePhase = 'content'
    return () => { delete document.body.dataset.pagePhase }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!enabled || !root) return undefined

    const strips = Array.from(root.children)
    let closing = null

    // Internal links: close bottom → top in the destination colour, then go.
    const onClick = (event) => {
      const url = getInternalHref(event)
      if (!url || closing) return
      event.preventDefault()
      getLenis()?.stop()
      root.style.setProperty('--curtain-color', getCurtainColor(url.pathname))
      setVisible(true)
      closing = gsap.fromTo([...strips].reverse(), { scaleY: 0 }, {
        scaleY: 1, transformOrigin: '50% 100%', ease: EASE, ...CLOSE,
        onComplete: () => { window.location.href = url.href },
      })
    }

    // Back/forward cache restores the page with the curtain closed: clear it.
    const onPageShow = (event) => {
      if (!event.persisted) return
      closing?.kill()
      closing = null
      gsap.set(strips, { scaleY: 0 })
      setVisible(false)
      getLenis()?.start()
    }

    document.addEventListener('click', onClick)
    window.addEventListener('pageshow', onPageShow)
    return () => {
      closing?.kill()
      document.removeEventListener('click', onClick)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={rootRef}
      className={`${styles.curtain} ${visible ? '' : styles.hidden}`}
      style={{ '--strips': STRIPS }}
      aria-hidden="true"
    >
      {Array.from({ length: STRIPS }, (_, index) => (
        <span key={index} className={styles.strip} style={{ '--strip-index': index }} />
      ))}
    </div>
  )
}
