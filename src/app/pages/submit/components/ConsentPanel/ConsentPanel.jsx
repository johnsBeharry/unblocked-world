import React from 'react'
import styles from './ConsentPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import content from './consent-panel-content.json'

// Consent step (user reference 2026-11-17): the three required
// confirmations. Every in-progress poster is sent (SubmitPage ticks them all
// when entering the step); the reference has no poster picker.
export const CONSENTS = content.consents

export function ConsentPanel({ value = {}, onChange, error }) {
  return (
    <section className={styles['consent-panel']} aria-labelledby="consent-title">
      <div className={styles['consent-panel__inner']}>
        <RevealText as="h1" id="consent-title" className={styles['consent-panel__title']}>{content.title}</RevealText>
        <RevealText as="p" className={styles['consent-panel__lede']}>{content.lede}</RevealText>
        <div className={styles['consent-panel__list']} role="group" aria-label={content.listLabel}>
          {CONSENTS.map(consent => (
            <CheckboxRow key={consent.name} className={styles['consent-panel__row']} required checked={Boolean(value[consent.name])} onChange={checked => onChange?.({ [consent.name]: checked })}>
              {consent.label}
            </CheckboxRow>
          ))}
        </div>
        {error && <p className={styles['consent-panel__error']} role="alert">{error}</p>}
      </div>
    </section>
  )
}
