import React from "react";
import { ThemeSection } from "../theme-section/ThemeSection.jsx";

export default function OwnershipSection() {
  return (
    <ThemeSection
      variant="ownership"
      title="Ownership"
      index="01"
      backgroundColor="#DC91A8"
      question="What does it mean to own?"
      description="We create, exchange, use and depend on things every day. But where does access end and ownership begin? Who decides what belongs to us, and what happens when the rules change?"
      sideLabel="Access"
      barCount={20}
    />
  );
}
