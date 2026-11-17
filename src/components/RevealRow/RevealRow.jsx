import { useEffect, useRef, useState } from "react";
import styles from "./RevealRow.module.scss";

const STAGGER = 0.08;

// Shared observers (see getObserver): rows entering together (e.g. a whole list on load) are
// revealed top-to-bottom in DOM order as one staggered batch. A pause longer
// than BATCH_GAP starts a new batch, so rows scrolled in later start at once.
const BATCH_GAP = 200;
const pending = new Map();
let batchIndex = 0;
let lastBatch = 0;

// Screen order (top to bottom), DOM order for rows on the same line.
const byScreenOrder = (a, b) =>
  a.getBoundingClientRect().top - b.getBoundingClientRect().top ||
  (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);

// Both observers feed one queue that is flushed on the next frame, so pinned UI
// (Home link, step list) and content rows that enter together stagger in one
// top-to-bottom sequence, whichever observer reports first.
const queue = new Map();
let flushQueued = false;

function flush() {
  flushQueued = false;
  const now = performance.now();
  if (now - lastBatch > BATCH_GAP) batchIndex = 0;
  lastBatch = now;
  [...queue.keys()].sort(byScreenOrder).forEach((row) => {
    queue.get(row).unobserve(row);
    pending.get(row)?.(batchIndex++ * STAGGER);
    pending.delete(row);
  });
  queue.clear();
}

function onEntries(entries, observer) {
  entries
    .filter((entry) => entry.isIntersecting)
    .forEach((entry) => queue.set(entry.target, observer));
  if (queue.size && !flushQueued) {
    flushQueued = true;
    requestAnimationFrame(flush);
  }
}

// Content rows ignore the bottom 10% of the viewport (they reveal once
// properly scrolled in). `pinned` rows are UI fixed to the screen (footer
// nav, Home link, step list, fixed CTAs): they may sit in that bottom band
// for good, so they use the whole viewport.
const observers = {};
function getObserver(pinned) {
  const key = pinned ? "pinned" : "content";
  observers[key] ??= new IntersectionObserver(onEntries, {
    rootMargin: pinned ? "0px" : "0px 0px -10% 0px",
    threshold: 0,
  });
  return observers[key];
}

// List row reveal: the row content (marker + label, links included) slides up
// inside a stationary mask while the row rule draws in from the left.
export function RevealRow({
  as: Tag = "li",
  className = "",
  contentClassName = "",
  lineClassName = "",
  line = true,
  pinned = false,
  children,
  ...props
}) {
  const rowRef = useRef(null);
  const [delay, setDelay] = useState(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;
    const observer = getObserver(pinned);
    pending.set(row, setDelay);
    observer.observe(row);
    return () => {
      pending.delete(row);
      queue.delete(row);
      observer.unobserve(row);
    };
  }, [pinned]);

  return (
    <Tag
      {...props}
      ref={rowRef}
      className={`${className} ${styles.row} ${delay !== null ? styles.active : ""}`}
      style={delay !== null ? { "--row-delay": `${delay}s` } : undefined}
      data-reveal-row
    >
      <span className={styles.mask}>
        <span className={`${styles.content} ${contentClassName}`}>{children}</span>
      </span>
      {line && <span className={`${styles.line} ${lineClassName}`} aria-hidden="true" />}
    </Tag>
  );
}
