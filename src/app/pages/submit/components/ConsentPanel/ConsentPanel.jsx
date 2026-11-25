import React, { useRef } from 'react'
import styles from './ConsentPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { CheckboxRow } from '../CheckboxRow/CheckboxRow.jsx'
import content from './consent-panel-content.json'
import { useErrorInView } from '../../hooks/useErrorInView.js'

// Consent step (user reference 2026-11-17): the three required
// confirmations. Every in-progress poster is sent (SubmitPage ticks them all
// when entering the step); the reference has no poster picker.
export const CONSENTS = content.consents

// `showInvalid`: after a failed Submit, unticked boxes turn red until ticked.
export function ConsentPanel({ value = {}, onChange, error, showInvalid = false }) {
  const errorRef = useRef(null)
  useErrorInView(errorRef, error)
  return (
    <section className={styles['consent-panel']} aria-labelledby="consent-title">
      <div className={styles['consent-panel__inner']}>
        <RevealText as="h1" id="consent-title" className={styles['consent-panel__title']}>{content.title}</RevealText>
        <RevealText as="p" className={styles['consent-panel__lede']}>{content.lede}</RevealText>
        <div className={styles['consent-panel__list']} role="group" aria-label={content.listLabel}>
          {CONSENTS.map(consent => (
            <CheckboxRow key={consent.name} className={styles['consent-panel__row']} required invalid={showInvalid && !value[consent.name]} checked={Boolean(value[consent.name])} onChange={checked => onChange?.({ [consent.name]: checked })}>
              {consent.label}
            </CheckboxRow>
          ))}
        </div>
        {error && <p ref={errorRef} className={styles['consent-panel__error']} role="alert">{error}</p>}
      </div>
    </section>
  )
}
