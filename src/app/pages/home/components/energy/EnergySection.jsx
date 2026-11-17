import React from "react";
import { ThemeSection } from "../theme-section/ThemeSection.jsx";

export default function EnergySection() {
  return (
    <ThemeSection
      variant="energy"
      title="Energy"
      backgroundColor="#EAE438"
      index="03"
      question="What makes things possible?"
      description="Energy powers everything we make, from the physical world to the digital one. Who has access to it? How is it distributed? What becomes possible when we rethink abundance?"
      sideLabel="Scarcity"
    />
  );
}
