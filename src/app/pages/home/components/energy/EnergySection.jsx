import React from 'react'
import { ThemeSection } from '../theme-section/ThemeSection.jsx'

export default function EnergySection() {
  return (
    <ThemeSection
      variant="energy"
      title="Energy"
      index="03"
      question="When did exhaustion become normal?"
      description="Scarcity is not the natural state of human beings. What becomes possible when we stop accepting stagnation as progress?"
      sideLabel="Stagnation"
      barCount={22}
    />
  )
}


