import { Fragment, useRef } from "react";
import { RevealText } from "../../../../../components/RevealText/RevealText";
import { RevealRow } from "../../../../../components/RevealRow/RevealRow";
import { useScrollMarquee } from "../../../../components/scroll-marquee/useScrollMarquee";
import styles from "./FundingSection.module.scss";

// Amount section of the grant program pages (Culture Grants, Open Systems):
// a scroll-direction marquee of the amount and a square, the rule below it,
// and the centred note. Content comes from the page's JSON (`amount` parts
// are joined with the raised dash); per-page spacing comes from the page
// through the custom properties documented in FundingSection.module.scss.

// Two identical groups make the loop seamless; each group (two amounts) is
// wider than the viewport.
const MARQUEE_GROUPS = ["main", "loop"];
const MARQUEE_ITEMS = 2;
const MARQUEE_SPEED = 0.5; // font sizes per second (82px/s at 164px text)

export function FundingSection({ content, className = "" }) {
  const marqueeRef = useRef(null);
  useScrollMarquee(marqueeRef, { speed: MARQUEE_SPEED });

  return (
    <section className={`${styles.funding} ${className}`} aria-label="Grant amount">
      {/* The marquee rises in its mask while the rule below draws in. */}
      <RevealRow
        as="div"
        className={styles["funding__amount-row"]}
        lineClassName={styles["funding__rule"]}
      >
        <div
          ref={marqueeRef}
          className={styles["funding__marquee"]}
          role="img"
          aria-label={content.amountLabel}
        >
          <div className={styles["funding__track"]} data-marquee-track>
            {MARQUEE_GROUPS.map((group) => (
              <div className={styles["funding__group"]} key={group} aria-hidden="true">
                {Array.from({ length: MARQUEE_ITEMS }, (_, index) => (
                  <span className={styles["funding__amount"]} key={index}>
                    <span>
                      {content.amount.map((part, partIndex) => (
                        <Fragment key={part}>
                          {partIndex > 0 && (
                            <>
                              {" "}
                              <span className={styles["funding__dash"]}>–</span>{" "}
                            </>
                          )}
                          {part}
                        </Fragment>
                      ))}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </RevealRow>

      <RevealText as="p" className={styles["funding__note"]}>
        {content.note}
      </RevealText>
    </section>
  );
}
