import React from "react";
import { ThemeSection } from "../theme-section/ThemeSection.jsx";

export default function PeersSection() {
  return (
    <ThemeSection
      variant="peers"
      title="Peers"
      index="04"
      question="What can we do together?"
      description="We have more ways to connect than ever. Yet many of us feel increasingly disconnected. How do people organize, exchange and support one another? What becomes possible when we build together?"
      sideLabel="Isolation"
      barCount={17}
    />
  );
}
