import { RevealRow } from "../../../../../components/RevealRow/RevealRow";
import styles from "./ApplyLink.module.scss";

// "Apply Now (→)" link of the Culture Grants page (hero and Application
// section). RevealRow keeps the link markup; its rule is the underline and
// draws in together with the label. Consumers position it via `className`.
export function ApplyLink({ className = "" }) {
  return (
    <RevealRow
      as="a"
      href="/submit"
      className={`${styles["apply-link"]} ${className}`}
      lineClassName={styles["apply-link__rule"]}
    >
      Apply Now (→)
    </RevealRow>
  );
}
