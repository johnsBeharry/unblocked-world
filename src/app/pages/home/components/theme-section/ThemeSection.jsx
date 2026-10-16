import React from 'react'
import styles from './ThemeSection.module.scss'

export function ThemeSection({
  variant,
  title,
  index,
  question,
  description,
  sideLabel,
  versus = '(vs)',
  barCount,
}) {
  return (
    <section id={variant} className={`${styles['theme-section']} ${styles[`theme-section--${variant}`]}`} data-name={variant}>
      <p className={styles['theme-section__title']}>{title}</p>
      <p className={styles['theme-section__index']}>{index}</p>

      <div className={styles['theme-section__art']} aria-hidden="true">
        {Array.from({ length: barCount }, (_, i) => (
          <div
            key={i}
            className={`${styles['theme-section__bar']} ${styles[`theme-section__bar--${String(i + 1).padStart(2, '0')}`]}`}
          />
        ))}
      </div>

      <div className={styles['theme-section__rule']} data-name="line" aria-hidden="true">
        <div className={styles['theme-section__rule-inset']}>
          <svg className={styles['theme-section__rule-svg']} fill="none" preserveAspectRatio="none" viewBox="0 0 1400 1">
            <path d="M0 0.5H1400" stroke="var(--theme-ink)" />
          </svg>
        </div>
      </div>

      <div className={styles['theme-section__copy']}>
        <div className={styles['theme-section__question-wrap']}>
          <p className={styles['theme-section__question']}>{question}</p>
        </div>
        <div className={styles['theme-section__description-wrap']}>
          <p className={styles['theme-section__description']}>{description}</p>
        </div>
      </div>

      <p className={styles['theme-section__side-label']}>{sideLabel}</p>
      <p className={styles['theme-section__versus']}>{versus}</p>
    </section>
  )
}
