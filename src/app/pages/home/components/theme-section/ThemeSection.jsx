import React from 'react'
import styles from './ThemeSection.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

export function ThemeSection({
  variant,
  title,
  index,
  question,
  description,
  sideLabel,
  versus = '(vs)',
  barCount,
  reveal = true,
}) {
  const sectionRef = React.useRef(null)

  React.useEffect(() => {
    const section = sectionRef.current
    const meta = section?.querySelector('[class*="pin-meta"]')
    const art = section?.querySelector('[class*="theme-section__art"]')
    const title = section?.querySelector('[class*="theme-section__title"]')
    const detail = section?.querySelector('[class*="theme-section__copy"]')
    if (!section || !meta || !art || !title || !detail) return undefined

    const sectionStart = section.getBoundingClientRect().top + window.scrollY
    const metaStart = meta.getBoundingClientRect().top + window.scrollY
    const threshold = parseFloat(getComputedStyle(meta).top) || 0
    const pinDistance = Math.max(0, metaStart - sectionStart - threshold)
    let frame = 0

    const updatePin = () => {
      frame = 0
      const distance = Math.max(0, window.scrollY - sectionStart)
      const slowDistance = Math.max(0, distance - pinDistance)
      const offset = -Math.min(slowDistance * 0.18, section.offsetHeight * 0.18)
      const detailDistance = Math.max(0, distance - pinDistance)
      const earlyDetailAdjust = -(detailDistance * 0.82)

      detail.style.setProperty('--theme-detail-y', '0px')
      const detailTop = detail.getBoundingClientRect().top
      const artworkTop = art.getBoundingClientRect().top
      const question = detail.querySelector('[class*="theme-section__question"]')
      const questionTop = question?.getBoundingClientRect().top ?? detailTop
      const movingQuestionTop = questionTop + earlyDetailAdjust
      const detailAdjust = movingQuestionTop > artworkTop
        ? earlyDetailAdjust
        : artworkTop - questionTop

      section.style.setProperty('--theme-pin-top', `${-pinDistance}px`)
      section.style.setProperty('--theme-parallax-y', `${offset}px`)
      detail.style.setProperty('--theme-detail-y', `${detailAdjust}px`)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updatePin)
    }

    updatePin()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updatePin)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updatePin)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={sectionRef} id={variant} className={`${styles['theme-section']} ${styles[`theme-section--${variant}`]}`} data-name={variant}>
      <div className={styles['theme-section__content']}>
        <div className={styles['theme-section__pin-header']}>
          <RevealText as="p" className={styles['theme-section__title']} enabled={reveal}>{title}</RevealText>
          <RevealText as="p" className={styles['theme-section__index']} enabled={reveal}>{index}</RevealText>
        </div>

        <div className={styles['theme-section__art']} aria-hidden="true">
          {Array.from({ length: barCount }, (_, i) => (
            <div
              key={i}
              className={`${styles['theme-section__bar']} ${styles[`theme-section__bar--${String(i + 1).padStart(2, '0')}`]}`}
            />
          ))}
        </div>

        <div className={styles['theme-section__copy']}>
          <div className={styles['theme-section__question-wrap']}>
            <RevealText as="p" className={styles['theme-section__question']} enabled={reveal}>{question}</RevealText>
          </div>
          <div className={styles['theme-section__description-wrap']}>
            <RevealText as="p" className={styles['theme-section__description']} enabled={reveal}>{description}</RevealText>
          </div>
        </div>

        <div className={styles['theme-section__pin-meta']}>
          <RevealText as="p" className={styles['theme-section__side-label']} enabled={reveal}>{sideLabel}</RevealText>
          <RevealText as="p" className={styles['theme-section__versus']} enabled={reveal}>{versus}</RevealText>
          <div className={styles['theme-section__rule']} data-name="line" aria-hidden="true">
            <div className={styles['theme-section__rule-inset']}>
              <svg className={styles['theme-section__rule-svg']} fill="none" preserveAspectRatio="none" viewBox="0 0 1400 1">
                <path d="M0 0.5H1400" stroke="var(--theme-ink)" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
