import { RevealText } from "../../../../../components/RevealText/RevealText";
import styles from "./ProgramCrossLinkSection.module.scss";

// Last section of the grant program pages: a coloured copy half linking to
// the other program (Culture Grants → Open Systems, Open Systems → Culture
// Grants) next to an artwork panel. Content (`title` lines, `description`,
// `href`) comes from the page's JSON, the artwork element and the colours
// (`--cross-link-bg`, `--cross-link-ink` and the artwork's own properties
// on className) from the page. Text keeps the plain line reveal; the
// artwork runs its own scroll motion.
export function ProgramCrossLinkSection({ id, content, artwork, className = "" }) {
  return (
    <section className={`${styles["cross-link"]} ${className}`} aria-labelledby={id}>
      <div className={styles["cross-link__copy"]}>
        <h2 id={id} className={styles["cross-link__title"]}>
          {/* The link wraps the line reveals (RevealText flattens links
              placed inside it). */}
          <a className={styles["cross-link__title-link"]} href={content.href}>
            {content.title.map((line) => (
              <RevealText key={line} rolling="arrow">
                {line}
              </RevealText>
            ))}
          </a>
        </h2>
        <RevealText as="p" className={styles["cross-link__description"]}>
          {content.description}
        </RevealText>
      </div>

      <div className={styles["cross-link__art"]}>{artwork}</div>
    </section>
  );
}
