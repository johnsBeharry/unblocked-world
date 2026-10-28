import React from 'react'
import { gsap } from 'gsap'
import styles from './Footer.module.scss'
import SubmitWorkSection from './submit-work/SubmitWorkSection.jsx'

export const FOOTER_COLORS = { home: '#d9d9d9', poster: '#d9d9d9' }

const BRAND_MASK_COUNT = 10
const BRAND_MASK_START = 1
const BRAND_MASK_REVEAL_DISTANCE = 0.1

function FooterBrand() {
  const brandRef = React.useRef(null)

  React.useLayoutEffect(() => {
    if (!brandRef.current) return undefined

    const brand = brandRef.current
    const masks = Array.from(brand.querySelectorAll('[data-footer-brand-mask]'))
    let frame = 0

    const updateReveal = () => {
      frame = 0
      gsap.set(masks, { y: 0, scaleY: 1, opacity: 1 })
      const atDocumentBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 1
      if (atDocumentBottom) {
        gsap.set(masks, { scaleY: 0 })
        return
      }

      const startLine = window.innerHeight * BRAND_MASK_START
      const revealDistance = Math.max(1, window.innerHeight * BRAND_MASK_REVEAL_DISTANCE)

      masks.forEach((mask, index) => {
        const rect = mask.getBoundingClientRect()
        const progress = Math.min(1, Math.max(0, (startLine - rect.top) / revealDistance))
        gsap.set(mask, { scaleY: 1 - progress })
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateReveal)
    }
    const onResize = () => updateReveal()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    updateReveal()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={brandRef} className={styles.brandReveal}>
      <p className={styles.brand} data-page-static>UNBLOCKED</p>
      <div className={styles.brandMasks} aria-hidden="true">
        {Array.from({ length: BRAND_MASK_COUNT }, (_, index) => (
          <div
            key={index}
            className={styles.brandMask}
            data-footer-brand-mask
            style={{ '--brand-mask-index': index }}
          />
        ))}
      </div>
    </div>
  )
}

export function Footer({ color = FOOTER_COLORS.home, ctaVariant = 'default' }) {
  const colorClass = color === FOOTER_COLORS.poster ? styles.posterColor : styles.homeColor
  const ctaProps = ctaVariant === 'poster'
    ? {
        variant: 'poster',
        titleLines: ['Read the', 'Guidelines (→)'],
        topLabel: 'Before You Submit. Make sure your work is original, prepared in the correct format, and connected to the current theme.',
        bottomLabel: '',
      }
    : ctaVariant === 'guidelines'
      ? {
          titleLines: ['Submit', 'Entry (→)'],
          showTopLabel: false,
          showBottomLabel: false,
        }
    : {}

  return (
    <footer className={`${styles.footer} ${colorClass}`}>
      <div className={styles.cta}>
        <SubmitWorkSection {...ctaProps} />
      </div>
      <div className={styles.main}>
        <FooterBrand />
        <p className={`${styles.text} ${styles.question}`}>Question Everything</p>
        <p className={`${styles.text} ${styles.explore}`}>Explore</p>
        <a className={styles.email} href="mailto:hello@unblocked.net">
          <p className={styles.emailText}><span>(h</span><span>ello@unblocked.net)</span></p>
        </a>
        <a className={`${styles.text} ${styles.ownership}`} href="/posters">Ownership</a>
        <a className={`${styles.text} ${styles.guidelines}`} href="/guidelines">Guidelines</a>
        <a className={`${styles.text} ${styles.submit}`} href="/submit">(→) Submit</a>
        <a className={`${styles.text} ${styles.instagram}`} href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
        <a className={`${styles.text} ${styles.twitter}`} href="https://twitter.com" target="_blank" rel="noreferrer">Twitter (X)</a>
        <p className={`${styles.text} ${styles.copyright}`}>© Copyright&nbsp;2026</p>
        <a className={`${styles.text} ${styles.backToTop}`} href="#top">Back to Top (↑)</a>
        <p className={`${styles.text} ${styles.description}`}>Exploring ownership, permanence, energy and peers through art, design and culture. Built through participation, dialogue and creative expression.</p>
        <p className={`${styles.text} ${styles.socials}`}>Socials</p>
      </div>
    </footer>
  )
}
