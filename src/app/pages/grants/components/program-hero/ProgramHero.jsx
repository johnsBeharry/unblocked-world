import { RevealText } from "../../../../../components/RevealText/RevealText";
import { ApplyLink } from "../apply-link/ApplyLink";
import styles from "./ProgramHero.module.scss";

// Hero of the grant program pages (Culture Grants, Open Systems): a coloured
// intro (title lines, summary, Apply Now) above a full-width artwork.
// Content comes from the page's JSON; colours from the page through
// `--program-hero-bg` / `--program-hero-ink` on `className`.
export function ProgramHero({ id, title, summary, artwork, className = "" }) {
  return (
    <section className={`${styles["program-hero"]} ${className}`} aria-labelledby={id}>
      <div className={styles["program-hero__intro"]}>
        <h1 id={id} className={styles["program-hero__title"]}>
          {title.map((line) => (
            <RevealText key={line}>{line}</RevealText>
          ))}
        </h1>

        <div className={styles["program-hero__footer"]}>
          <RevealText as="p" className={styles["program-hero__summary"]}>
            {summary}
          </RevealText>

          <ApplyLink className={styles["program-hero__apply"]} />
        </div>
      </div>

      {artwork}
    </section>
  );
}
