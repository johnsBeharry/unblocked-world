import React, { useEffect, useRef } from 'react'
import styles from './Header.module.scss'

export const HEADER_COLORS = {
  home: '#d9d9d9',
  poster: '#f4a9c0',
  guidelines: '#fff0f0',
}

const DARK_TEXT = '#101010'

// sRGB relative luminance and WCAG contrast ratio.
const channel = (value) => {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}
const luminance = ([r, g, b]) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const parseRgb = (value) => {
  const [r = 0, g = 0, b = 0, a = 1] = (value.match(/[\d.]+/g) ?? []).map(Number)
  return { rgb: [r, g, b], alpha: value.startsWith('rgba') ? a : 1 }
}
const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))

// First opaque background behind a point (paint order, top first). Sampled at
// the left edge so centred decoration (e.g. hero artwork) is not picked up.
function backgroundAt(x, y) {
  for (const element of document.elementsFromPoint(x, y)) {
    const value = getComputedStyle(element).backgroundColor
    const { alpha } = parseRgb(value)
    if (alpha > 0.5) return value
  }
  return getComputedStyle(document.body).backgroundColor
}

const HIDE_AFTER = 60 // always shown near the top of the page
const SCROLL_DELTA = 6 // ignore tiny scroll movements (no flicker)

// Header bar takes the colour of the section underneath; its text switches to
// dark when that gives better contrast than the route's light colour. It also
// slides away while scrolling down and returns on scroll up.
function useAdaptiveHeader(headerRef, barRef, lightText, { onLightClass, hiddenClass }) {
  useEffect(() => {
    const header = headerRef.current
    const bar = barRef.current
    if (!header || !bar) return undefined
    const light = hexToRgb(lightText)
    const dark = hexToRgb(DARK_TEXT)
    let frame = 0
    let last = ''
    let lastY = window.scrollY

    const updateVisibility = () => {
      const y = window.scrollY
      if (y <= HIDE_AFTER) header.classList.remove(hiddenClass)
      else if (Math.abs(y - lastY) < SCROLL_DELTA) return
      else header.classList.toggle(hiddenClass, y > lastY)
      lastY = y
    }

    const update = () => {
      frame = 0
      updateVisibility()
      const background = backgroundAt(2, bar.offsetHeight / 2)
      if (background === last) return
      last = background
      const { rgb } = parseRgb(background)
      bar.style.backgroundColor = background
      header.classList.toggle(onLightClass, contrast(rgb, dark) > contrast(rgb, light))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    // Keyboard users tabbing into the header always see it.
    const reveal = () => header.classList.remove(hiddenClass)

    update()
    header.addEventListener('focusin', reveal)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('load', schedule)
    return () => {
      cancelAnimationFrame(frame)
      header.removeEventListener('focusin', reveal)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('load', schedule)
    }
  }, [headerRef, barRef, lightText, onLightClass, hiddenClass])
}

// Each label sits in a `data-header-intro` span so a page intro (home hero)
// can slide it inside its link; elsewhere the spans are static.
export function Header({ color = HEADER_COLORS.home }) {
  const headerRef = useRef(null)
  const barRef = useRef(null)
  useAdaptiveHeader(headerRef, barRef, color, {
    onLightClass: styles.onLight,
    hiddenClass: styles.scrolledAway,
  })

  const colorClass = color === HEADER_COLORS.poster
    ? styles.posterColor
    : color === HEADER_COLORS.guidelines
      ? styles.guidelinesColor
      : styles.homeColor

  return (
    <header ref={headerRef} className={styles.header} aria-label="Primary navigation">
      <span ref={barRef} className={styles.bar} aria-hidden="true" />
      <nav className={`${styles.nav} ${colorClass}`}>
        <a className={styles.navItem} href="/posters"><span data-header-intro>Poster</span></a>
        <a className={styles.navItem} href="/guidelines"><span data-header-intro>Guidelines</span></a>
        <a className={styles.navItem} href="/submit"><span data-header-intro>Submit (→)</span></a>
      </nav>
      <a className={`${styles.home} ${colorClass}`} href="/"><span data-header-intro>Home</span></a>
      <button className={`${styles.menu} ${colorClass}`} type="button"><span data-header-intro>Menu</span></button>
    </header>
  )
}
