import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RevealText.module.scss";

gsap.registerPlugin(ScrollTrigger);

function getWords(value) {
  return value.split(/\n/).flatMap((line, lineIndex, lines) => {
    const words = [...line.matchAll(/(\S+)(\s*)/g)].map(
      ([, text, spaceAfter]) => ({ type: "word", text, spaceAfter }),
    );
    return lineIndex < lines.length - 1 ? [...words, { type: "break" }] : words;
  });
}

function getText(value) {
  if (value == null || typeof value === "boolean") return "";
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (Array.isArray(value)) return value.map(getText).join("");
  if (React.isValidElement(value)) {
    return value.type === "br" ? "\n" : getText(value.props.children);
  }
  return "";
}

function getLineGroups(words) {
  const groups = [];
  let current = [];
  let previousTop = null;

  words.forEach((word) => {
    if (word.hasAttribute("data-reveal-break")) {
      if (current.length) groups.push(current);
      current = [];
      previousTop = null;
      return;
    }
    const top = Math.round(word.getBoundingClientRect().top);
    if (current.length && top !== previousTop) {
      groups.push(current);
      current = [];
    }
    current.push({
      text: word.textContent,
      spaceAfter: word.dataset.spaceAfter ?? " ",
    });
    previousTop = top;
  });

  if (current.length) groups.push(current);
  return groups;
}

function sameLines(a, b) {
  return (
    a.length === b.length &&
    a.every(
      (line, index) =>
        line.length === b[index].length &&
        line.every((word, wordIndex) => word.text === b[index][wordIndex].text),
    )
  );
}

export function RevealText({
  as: Tag = "span",
  children,
  className = "",
  enabled = true,
  delay = 0,
  stagger = 0.1,
  duration = 1.2,
  distance = "calc(100% + 1.1em)",
  ease = "cubic-bezier(0.16, 1, 0.3, 1)",
  play = null,
  fade = true,
  highlight = false,
  ...props
}) {
  const measureRef = useRef(null);
  const rootRef = useRef(null);
  const linesRef = useRef(null);
  const enteredRef = useRef(false);
  const [lines, setLines] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  // Lines re-split after the text has already been revealed render without
  // replaying the entrance (e.g. resize or late font swap).
  const [instant, setInstant] = useState(false);
  const text = getText(children);
  enteredRef.current = hasEntered;

  // The hidden measurer stays mounted inside the root, so lines are re-measured
  // whenever the font finishes loading or the container width changes. The
  // first measure runs before paint, so the measurer is never visible.
  useLayoutEffect(() => {
    if (!enabled) {
      linesRef.current = null;
      setLines(null);
      setHasEntered(false);
      setInstant(false);
      return undefined;
    }

    const measurer = measureRef.current;
    const root = rootRef.current;
    if (!measurer || !root) return undefined;

    let frame;
    let cancelled = false;
    const measure = () => {
      const next = getLineGroups([
        ...measurer.querySelectorAll("[data-reveal-word], [data-reveal-break]"),
      ]);
      const previous = linesRef.current;
      if (previous && sameLines(previous, next)) return;
      if (previous && enteredRef.current) setInstant(true);
      linesRef.current = next;
      setLines(next);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!cancelled) measure();
      });
    };

    linesRef.current = null;
    measure();
    const resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(root);
    document.fonts?.ready.then(schedule);
    document.fonts?.addEventListener?.("loadingdone", schedule);

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.fonts?.removeEventListener?.("loadingdone", schedule);
    };
  }, [enabled, text]);

  useEffect(() => {
    if (!hasEntered) setInstant(false);
  }, [hasEntered]);

  useEffect(() => {
    if (!enabled || !lines || !rootRef.current) return undefined;

    if (play !== null) {
      setHasEntered(play);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [enabled, lines, play]);

  // highlight: words brighten one by one with scroll (0.2 → 1 opacity), driven
  // by a single scrubbed progress value; the per-word curve lives in CSS.
  useEffect(() => {
    const root = rootRef.current;
    if (!enabled || !highlight || !lines || !root) return undefined;
    const setProgress = (self) =>
      root.style.setProperty("--reveal-progress", self.progress.toFixed(4));
    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 80%",
      end: "bottom 55%",
      onUpdate: setProgress,
      onRefresh: setProgress,
    });
    return () => trigger.kill();
  }, [enabled, highlight, lines]);

  if (!enabled)
    return (
      <Tag {...props} className={className}>
        {children}
      </Tag>
    );

  // Running word index across lines, for the highlight wave.
  const wordOffsets = (lines ?? []).reduce(
    (offsets, line, index) => [
      ...offsets,
      index ? offsets[index - 1] + lines[index - 1].length : 0,
    ],
    [],
  );

  return (
    <Tag
      {...props}
      ref={rootRef}
      className={`${className} ${styles.root} ${hasEntered ? styles.active : ""} ${instant ? styles.instant : ""} ${fade ? "" : styles.noFade} ${highlight ? styles.highlight : ""}`}
      style={
        highlight
          ? { ...props.style, "--reveal-words": lines?.flat().length ?? 0 }
          : props.style
      }
    >
      {lines?.map((line, index) => (
        <span
          className={styles.line}
          data-page-reveal-line="true"
          key={`${line.map((word) => word.text).join(" ")}-${index}`}
          style={{
            "--reveal-delay": `${delay + index * stagger}s`,
            "--reveal-duration": `${duration}s`,
            "--reveal-distance": distance,
            "--reveal-ease": ease,
          }}
        >
          <span className={styles.lineInner} data-page-reveal-line-inner="true">
            {line.map((word, wordIndex) => (
              <React.Fragment key={`${word.text}-${wordIndex}`}>
                <span
                  className={highlight ? styles.word : undefined}
                  style={
                    highlight
                      ? { "--word-index": wordOffsets[index] + wordIndex }
                      : undefined
                  }
                >
                  {word.text}
                </span>
                {word.spaceAfter || (wordIndex < line.length - 1 ? " " : null)}
              </React.Fragment>
            ))}
          </span>
        </span>
      ))}
      {/* Last child: list markers and first-line layout stay on the real text. */}
      <span ref={measureRef} className={styles.measure} aria-hidden="true">
        {getWords(text).map((word, index) => (
          <React.Fragment key={`${word.type}-${word.text ?? ""}-${index}`}>
            {word.type === "break" ? (
              <span data-reveal-break="true" />
            ) : (
              <span data-reveal-word="true" data-space-after={word.spaceAfter}>
                {word.text}
              </span>
            )}
            {word.type === "word" && word.spaceAfter}
          </React.Fragment>
        ))}
      </span>
    </Tag>
  );
}
