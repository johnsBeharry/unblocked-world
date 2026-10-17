import React from 'react'
import { ThemeSection } from '../theme-section/ThemeSection.jsx'

export default function PeersSection() {
  return (
    <ThemeSection
      variant="peers"
      title="Peers"
      index="04"
      question="When did exhaustion become normal?"
      description="Scarcity is not the natural state of human beings. What becomes possible when we stop accepting stagnation as progress?"
      sideLabel="Hierarchies"
      barCount={17}
    />
  )
}

