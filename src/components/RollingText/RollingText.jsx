import styles from "./RollingText.module.scss";

const STATIC_CHARS = new Set(["(", ")"]);
const ARROWS = { "→": "right", "←": "left", "↑": "up", "↓": "down" };

// Glyph masks for one string. Letters roll up and a copy pushes in from
// below; parentheses stay still; arrows are pushed out by a new arrow in the
// direction they point (→ to the right, ↑ upward). `start` continues the
// stagger index across several strings (RevealText words). `arrowOnly`
// (large title CTAs): only the arrows move, without stagger delay.
export function RollingGlyphs({ text, start = 0, arrowOnly = false }) {
  return Array.from(text, (char, offset) => {
    const kind = ARROWS[char]
      ? `arrow-${ARROWS[char]}`
      : STATIC_CHARS.has(char) || arrowOnly
        ? "static"
        : "letter";
    return (
      <span
        key={offset}
        className={`${styles["rolling-text__mask"]} ${styles[`rolling-text__mask--${kind}`]}`}
        style={{ "--char-index": arrowOnly ? 0 : start + offset }}
      >
        <span className={styles["rolling-text__glyph"]} data-char={char}>
          {char}
        </span>
      </span>
    );
  });
}

// Odometer hover label: hovering (or keyboard-focusing) the closest link or
// button rolls the glyphs, staggered left to right. `dim` lands the label at
// reduced opacity (header / footer), so the hover state reads as different.
// The text is read once through the visually hidden copy.
export function RollingText({
  text,
  dim = false,
  arrowOnly = false,
  className = "",
}) {
  return (
    <span
      className={`${styles["rolling-text"]} ${dim ? styles["rolling-text--dim"] : ""} ${className}`}
    >
      <span className={styles["rolling-text__label"]}>{text}</span>
      <span className={styles["rolling-text__glyphs"]} aria-hidden="true">
        <RollingGlyphs text={text} arrowOnly={arrowOnly} />
      </span>
    </span>
  );
}

export { styles as rollingStyles };
