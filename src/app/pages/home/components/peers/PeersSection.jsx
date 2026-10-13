import React from 'react'
import { ThemeSection } from '../theme-section/ThemeSection.jsx'

export default function PeersSection() {
  return (
    <ThemeSection
      variant="peers"
      title="Peers"
      index="04"
      question="Who decides what matters?"
      description="We are more connected than ever. Yet increasingly separated from each other. What happens when people build directly together again?"
      sideLabel="Hierarchies"
      barCount={17}
    />
  )
}


