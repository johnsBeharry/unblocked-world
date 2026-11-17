import React from "react";
import { ThemeSection } from "../theme-section/ThemeSection.jsx";
import styles from "../theme-section/ThemeSection.module.scss";

export default function PermanenceSection() {
  return (
    <ThemeSection
      variant="permanence"
      title="Permanence"
      index="02"
      backgroundColor="#34BD5F"
      question="What deserves to last?"
      description="Objects, memories, platforms and ideas. What do we choose to preserve? What should be repairable? And why are so many things designed to disappear?"
      sideLabel="Disposability"
    />
  );
}
