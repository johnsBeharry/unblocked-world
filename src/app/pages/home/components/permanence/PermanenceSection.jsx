import React from 'react'
import { ThemeSection } from '../theme-section/ThemeSection.jsx'

export default function PermanenceSection() {
  return (
    <ThemeSection
      variant="permanence"
      title="Permanence"
      index="02"
      question="Why is everything disposable?"
      description="Products. Memories. Platforms. Relationships. Why are so many things designed to disappear?"
      sideLabel="Decay"
      barCount={18}
    />
  )
}


