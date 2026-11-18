import React from "react";
import styles from "./OwnershipKeyDates.module.scss";
import content from "./ownership-key-dates-content.json";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import { RevealRow } from "../../../../../components/RevealRow/RevealRow.jsx";

export function OwnershipKeyDates() {
  return (
    <>
      <section
        className={styles.section}
        data-name="key-dates"
        aria-label={content.label}
      >
        <h2 className={styles.title}>
          {content.title.map((part) => (
            <RevealText key={part} as="span" className={styles.titlePart}>
              {part}
            </RevealText>
          ))}
        </h2>

        <RevealText as="p" className={styles.intro}>
          {content.intro}
        </RevealText>

        <div className={styles.timeline}>
          {content.dates.map(({ number, milestone, date }) => (
            <RevealRow
              as="div"
              className={styles.row}
              contentClassName={styles.rowContent}
              lineClassName={styles.rowRule}
              key={number}
            >
              <span className={styles.number}>{number}</span>
              <span className={styles.milestone}>{milestone}</span>
              <time className={styles.date}>{date}</time>
            </RevealRow>
          ))}
        </div>
      </section>
    </>
  );
}
