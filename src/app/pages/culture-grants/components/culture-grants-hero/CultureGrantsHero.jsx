import { RevealText } from "../../../../../components/RevealText/RevealText";
import { ApplyLink } from "../apply-link/ApplyLink";
import { SliceArtwork } from "../slice-artwork/SliceArtwork";
import styles from "./CultureGrantsHero.module.scss";

export function CultureGrantsHero() {
  return (
    <section className={styles["culture-hero"]} aria-labelledby="culture-grants-title">
      <div className={styles["culture-hero__intro"]}>
        <RevealText
          as="h1"
          id="culture-grants-title"
          className={styles["culture-hero__title"]}
        >
          Culture Grants
        </RevealText>

        <div className={styles["culture-hero__footer"]}>
          <RevealText as="p" className={styles["culture-hero__summary"]}>
            One-time money from $500 to $5000 for public work on our four
            themes. Make a focused piece, show it or document it, and it joins
            the UNBLOCKED archive and published in our book.
          </RevealText>

          <ApplyLink className={styles["culture-hero__apply"]} />
        </div>
      </div>

      <SliceArtwork />
    </section>
  );
}
