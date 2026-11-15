import { RevealText } from "../../../../../components/RevealText/RevealText";
import styles from "./SectionLabel.module.scss";

// Grey "Sec. 0X  Title" tag at the top-left of the Grants sections.
export function SectionLabel({ children, className = "" }) {
  return (
    <p className={`${styles["section-label"]} ${className}`}>
      <RevealText>{children}</RevealText>
    </p>
  );
}
