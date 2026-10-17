import React from 'react'
import { ThemeSection } from '../theme-section/ThemeSection.jsx'
import styles from '../theme-section/ThemeSection.module.scss'

export default function OwnershipSection() {
  return (
    <ThemeSection
      variant="ownership"
      title="Ownership"
      index="01"
      question="Who owns your life?"
      description={<>We mistake access for ownership. We mistake convenience for control. We mistake permission for freedom.<br className={styles['theme-section__mobile-break']} /> What happens when the things that <br className={styles['theme-section__mobile-break']} />matter most no longer belong to us?</>}
      sideLabel="Dependence"
      barCount={20}
    />
  )
}

