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
      question="Who owns your life?"
      description={
        <>
          We mistake access for ownership. We mistake
          <br className={styles["theme-section__desktop-break"]} />
          convenience for control. We mistake permission for
          <br className={styles["theme-section__desktop-break"]} />
          freedom. What happens when the things that
          <br className={styles["theme-section__desktop-break"]} />
          matter most no longer belong to us?
        </>
      }
      sideLabel="Dependence"
      barCount={18}
    />
  );
}
