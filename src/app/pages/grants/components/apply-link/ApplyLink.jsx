import { RevealRow } from "../../../../../components/RevealRow/RevealRow";
import { RollingText } from "../../../../../components/RollingText/RollingText.jsx";
import styles from "./ApplyLink.module.scss";
import content from "./apply-link-content.json";

// "Apply Now (→)" link of the grant program pages (ProgramHero and the
// Culture Grants Application section). RevealRow keeps the link markup; its
// rule is the underline and draws in together with the label. Consumers
// position it via `className`.
export function ApplyLink({ className = "" }) {
  return (
    <RevealRow
      as="a"
      href={content.href}
      className={`${styles["apply-link"]} ${className}`}
      lineClassName={styles["apply-link__rule"]}
    >
      <RollingText text={content.label} />
    </RevealRow>
  );
}
