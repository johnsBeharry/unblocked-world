import React, { useState } from 'react'
import styles from './ContactInformationPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'
import { SelectPanel } from '../SelectPanel/SelectPanel.jsx'
import countries from '../../data/countries.json'
import citiesByCountry from '../../data/cities.json'

const OTHER_CITY = 'Other (type your city)'

const fields = [
  { name: 'full_name', label: 'Full Name', value: 'Andre' },
  { name: 'email', label: 'Email Address' },
  { name: 'instagram', label: 'Instagram (Optional)' },
  { name: 'telephone', label: 'Telephone Number' },
  { name: 'country', label: 'Country', select: true },
  { name: 'city', label: 'City', select: true },
  { name: 'website', label: 'Website (Optional)' },
]

export function ContactInformationPanel({ value = {}, onChange, verification = {}, onVerificationChange }) {
  // City list follows the selected country; "Other" switches to free text.
  const [typedCity, setTypedCity] = useState(false)
  const cities = value.country ? [...(citiesByCountry[value.country] ?? []), OTHER_CITY] : []
  const selectProps = {
    country: {
      options: countries,
      onChange: country => {
        setTypedCity(false)
        const keepCity = (citiesByCountry[country] ?? []).includes(value.city)
        onChange?.({ country, ...(keepCity ? {} : { city: '' }) })
      },
    },
    city: {
      options: cities,
      // Locked until a country is chosen (its list depends on it).
      disabled: !value.country,
      onChange: city => {
        if (city === OTHER_CITY) {
          setTypedCity(true)
          onChange?.({ city: '' })
        } else onChange?.({ city })
      },
    },
  }

  return (
    <section className={styles.panel} aria-labelledby="contact-title">
      <div className={styles.inner}>
        <RevealText as="h1" id="contact-title">Contact Information</RevealText>
        <RevealText as="p" className={styles.intro}>Provide your contact details so we can communicate important updates regarding your submission.</RevealText>
        <form className={styles.form}>
          {fields.map(field => (
            <RevealRow as="label" className={styles.field} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule} key={field.label}>
              {field.value
                ? <>
                    <span className={styles.fieldLabel}>{field.label}</span>
                    <input className={styles.fieldValue} aria-label={field.label} value={value[field.name] ?? field.value} onChange={event => onChange?.({ [field.name]: event.target.value })} />
                  </>
                : field.select && !(field.name === 'city' && typedCity)
                  ? <SelectPanel label={field.label} value={value[field.name] || ''} triggerClassName={`${styles.emptyField} ${styles.selectField}`} emptyClassName={styles.selectEmpty} {...selectProps[field.name]} />
                  : field.name === 'city' && typedCity
                  ? <input className={styles.emptyField} aria-label={field.label} placeholder="Type your city" autoFocus value={value.city || ''} onChange={event => onChange?.({ city: event.target.value })} />
                  : <input className={styles.emptyField} aria-label={field.label} placeholder={field.label} value={value[field.name] || ''} onChange={event => onChange?.({ [field.name]: event.target.value })} />}
              {field.select && !(field.name === 'city' && typedCity) && <span className={styles.chevron} aria-hidden="true" />}
            </RevealRow>
          ))}
          {verification.status !== 'idle' && (
            <div className={styles.verification}>
              <RevealRow as="label" className={styles.field} contentClassName={styles.fieldContent} lineClassName={styles.fieldRule}>
                <span className={styles.fieldLabel}>Email Verification Code</span>
                <input
                  className={styles.fieldValue}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={verification.code || ''}
                  onChange={event => onVerificationChange?.({ code: event.target.value.replace(/\D/g, '').slice(0, 6) })}
                  placeholder="6-digit code"
                />
              </RevealRow>
              <RevealText as="p" className={styles.verificationHint}>Enter the code sent to your email, then continue.</RevealText>
              {verification.error && <p className={styles.error} role="alert">{verification.error}</p>}
            </div>
          )}
          {verification.status === 'idle' && verification.error && <p className={styles.error} role="alert">{verification.error}</p>}
        </form>
      </div>
    </section>
  )
}
