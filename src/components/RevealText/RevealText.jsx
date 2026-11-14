<<<<<<< HEAD
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
=======
import React, { useEffect, useRef, useState } from "react";
>>>>>>> origin/main
import styles from "./RevealText.module.scss";

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
<<<<<<< HEAD
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
=======
>>>>>>> origin/main
}

export function RevealText({
  as: Tag = "span",
  children,
  className = "",
  enabled = true,
  delay = 0,
<<<<<<< HEAD
  stagger = 0.1,
  duration = 1.2,
  distance = "calc(100% + 1.1em)",
  ease = "cubic-bezier(0.16, 1, 0.3, 1)",
=======
  stagger = 0.08,
  duration = 1,
  distance = "120%",
  ease = "cubic-bezier(0.165, 0.84, 0.44, 1)",
>>>>>>> origin/main
  play = null,
  fade = true,
  ...props
}) {
  const measureRef = useRef(null);
  const rootRef = useRef(null);
<<<<<<< HEAD
  const linesRef = useRef(null);
  const enteredRef = useRef(false);
  const [lines, setLines] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  // Lines re-split after the text has already been revealed render without
  // replaying the entrance (e.g. resize or late font swap).
  const [instant, setInstant] = useState(false);
  const text = getText(children);
  enteredRef.current = hasEntered;
=======
  const [lines, setLines] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const text = getText(children);
>>>>>>> origin/main

  // The hidden measurer stays mounted inside the root, so lines are re-measured
  // whenever the font finishes loading or the container width changes. The
  // first measure runs before paint, so the measurer is never visible.
  useLayoutEffect(() => {
    if (!enabled) {
<<<<<<< HEAD
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
=======
      setLines(null);
      setHasEntered(false);
      return undefined;
    }

    let frame;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!measureRef.current) return;
        const words = [
          ...measureRef.current.querySelectorAll(
            "[data-reveal-word], [data-reveal-break]",
          ),
        ];
        setLines(getLineGroups(words));
      });
    };

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(() => {
      measure();
      requestAnimationFrame(measure);
      requestAnimationFrame(() => requestAnimationFrame(measure));
    });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
>>>>>>> origin/main
    };
  }, [enabled, text]);

  useEffect(() => {
<<<<<<< HEAD
    if (!hasEntered) setInstant(false);
  }, [hasEntered]);

  useEffect(() => {
=======
>>>>>>> origin/main
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

  if (!enabled)
<<<<<<< HEAD
    return (
      <Tag {...props} className={className}>
        {children}
      </Tag>
    );
=======
    return (
      <Tag {...props} className={className}>
        {children}
      </Tag>
    );

  if (!lines) {
    return (
      <Tag
        {...props}
        ref={measureRef}
        className={`${className} ${styles.measure}`}
      >
        {getWords(text).map((word, index, words) => (
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
      </Tag>
    );
  }
>>>>>>> origin/main

  return (
    <Tag
      {...props}
      ref={rootRef}
<<<<<<< HEAD
      className={`${className} ${styles.root} ${hasEntered ? styles.active : ""} ${instant ? styles.instant : ""} ${fade ? "" : styles.noFade}`}
    >
      {lines?.map((line, index) => (
=======
      className={`${className} ${styles.root} ${hasEntered ? styles.active : ""}`}
    >
      {lines.map((line, index) => (
>>>>>>> origin/main
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
                <span>{word.text}</span>
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
