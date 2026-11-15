import { useEffect, useRef, useState } from "react";
import styles from "./RevealRow.module.scss";

const STAGGER = 0.08;

// One shared observer: rows entering together (e.g. a whole list on load) are
// revealed top-to-bottom in DOM order as one staggered batch. A pause longer
// than BATCH_GAP starts a new batch, so rows scrolled in later start at once.
const BATCH_GAP = 200;
const pending = new Map();
let observer = null;
let batchIndex = 0;
let lastBatch = 0;

const byDocumentOrder = (a, b) =>
  a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      const now = performance.now();
      if (now - lastBatch > BATCH_GAP) batchIndex = 0;
      lastBatch = now;
      entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort(byDocumentOrder)
        .forEach((row) => {
          pending.get(row)?.(batchIndex++ * STAGGER);
          pending.delete(row);
          observer.unobserve(row);
        });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0 },
  );
  return observer;
}

// List row reveal: the row content (marker + label, links included) slides up
// inside a stationary mask while the row rule draws in from the left.
export function RevealRow({
  as: Tag = "li",
  className = "",
  contentClassName = "",
  lineClassName = "",
  line = true,
  children,
  ...props
}) {
  const rowRef = useRef(null);
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    pending.set(row, setDelay);
    getObserver().observe(row);
    return () => {
      pending.delete(row);
      observer.unobserve(row);
    };
  }, []);

  return (
    <Tag
      {...props}
      ref={rowRef}
      className={`${className} ${styles.row} ${delay !== null ? styles.active : ""}`}
      style={delay !== null ? { "--row-delay": `${delay}s` } : undefined}
    >
      <span className={styles.mask}>
        <span className={`${styles.content} ${contentClassName}`}>{children}</span>
      </span>
      {line && <span className={`${styles.line} ${lineClassName}`} aria-hidden="true" />}
    </Tag>
  );
}
