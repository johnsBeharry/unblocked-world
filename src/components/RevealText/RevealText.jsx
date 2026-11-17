import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RevealText.module.scss";
import {
  RollingGlyphs,
  RollingText,
  rollingStyles,
} from "../RollingText/RollingText.jsx";

gsap.registerPlugin(ScrollTrigger);

// Plain <br> = forced break; <br className> = responsive break, encoded as
// "\u0001className\u0002", which the consumer can hide per breakpoint with CSS.
const BREAK = /\n|\u0001([^\u0002]*)\u0002/g;

function getWords(value) {
  const words = [];
  const pushText = (chunk) => {
    // Space right after a break belongs to the word before it, so the words
    // stay apart when a responsive break is hidden.
    const previous = words[words.length - 2];
    if (/^\s/.test(chunk) && words.at(-1)?.type === "break" && previous && !previous.spaceAfter)
      previous.spaceAfter = " ";
    words.push(
      ...[...chunk.matchAll(/(\S+)(\s*)/g)].map(([, text, spaceAfter]) => ({
        type: "word",
        text,
        spaceAfter,
      })),
    );
  };
  let last = 0;
  for (const match of value.matchAll(BREAK)) {
    pushText(value.slice(last, match.index));
    words.push({ type: "break", className: match[1] });
    last = match.index + match[0].length;
  }
  pushText(value.slice(last));
  return words;
}

function getText(value) {
  if (value == null || typeof value === "boolean") return "";
  if (typeof value === "string" || typeof value === "number")
    return String(value);
  if (Array.isArray(value)) return value.map(getText).join("");
  if (React.isValidElement(value)) {
    if (value.type === "br")
      return value.props.className
        ? `\u0001${value.props.className}\u0002`
        : "\n";
    return getText(value.props.children);
  }
  return "";
}

// True once the entrance animation of the current lines has finished (the
// line animations are CSS, gated by the page phase).
function hasPlayed(root) {
  if (document.body.dataset.pagePhase !== "content") return false;
  const inner = root.querySelector("[data-page-reveal-line-inner]");
  const animations = inner?.getAnimations?.() ?? [];
  return animations.length > 0 && animations.every((a) => a.playState === "finished");
}

function getLineGroups(words) {
  const groups = [];
  let current = [];
  let previousTop = null;

  words.forEach((word) => {
    if (word.hasAttribute("data-reveal-break")) {
      // Responsive break hidden at this breakpoint (display: none).
      if (!word.getClientRects().length) return;
      if (current.length) groups.push(current);
      current = [];
      previousTop = null;
      return;
    }
    // Layout offset, not the on-screen rect: inside a rotated/transformed
    // ancestor every word of one line has a different screen top.
    const top = word.offsetTop;
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
  rolling = false,
  ...props
}) {
  const measureRef = useRef(null);
  const rootRef = useRef(null);
  const linesRef = useRef(null);
  const enteredRef = useRef(false);
  // When pending lines are re-split (font swap during the delay), their CSS
  // animations restart; shift the delay by the time already elapsed so the
  // entrance keeps its original schedule.
  const enteredAtRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  // Lines re-split after the text has already been revealed render without
  // replaying the entrance (e.g. resize or late font swap).
  const [instant, setInstant] = useState(false);
  const text = getText(children);
  // Readable copy for the rolling label (break markers become spaces).
  const readable = text.replace(/\u0001[^\u0002]*\u0002|\n/g, " ");
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
      // Skip the replay only when the entrance has really finished; a
      // re-split while it is still pending (e.g. `play` set on mount, then the
      // font loads during the delay) must still animate.
      if (previous && enteredRef.current) {
        if (hasPlayed(root)) setInstant(true);
        else if (enteredAtRef.current !== null)
          setElapsed((performance.now() - enteredAtRef.current) / 1000);
      }
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
    // Animations only run in the content phase; an entry before it has no
    // schedule to keep yet.
    enteredAtRef.current =
      document.body.dataset.pagePhase === "content" ? performance.now() : null;
    setElapsed(0);
  }, [hasEntered]);

  useEffect(() => {
    if (!enabled || !lines || !rootRef.current) return undefined;

    if (play !== null) {
      setHasEntered(play);
      return undefined;
    }

    const root = rootRef.current;
    let done = false;
    const enter = () => {
      if (done) return;
      done = true;
      setHasEntered(true);
      cleanup();
    };
    // Normal trigger: the top 90% of the viewport.
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && enter(),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    // Text in the bottom 10% at the very end of the page (e.g. the footer
    // copyright) can never scroll higher; while it is on screen, play it once
    // the page is scrolled to the end.
    const atPageEnd = () =>
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 2;
    const checkEnd = () => atPageEnd() && enter();
    let watchingEnd = false;
    const onScreen = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !watchingEnd) {
        watchingEnd = true;
        window.addEventListener("scroll", checkEnd, { passive: true });
        checkEnd();
      } else if (!entry.isIntersecting && watchingEnd) {
        watchingEnd = false;
        window.removeEventListener("scroll", checkEnd);
      }
    });
    const cleanup = () => {
      observer.disconnect();
      onScreen.disconnect();
      window.removeEventListener("scroll", checkEnd);
    };

    observer.observe(root);
    onScreen.observe(root);
    return cleanup;
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
        {rolling ? <RollingText text={readable} arrowOnly={rolling === "arrow"} /> : children}
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
  // rolling: odometer hover on the glyphs (CTA links / buttons); "arrow"
  // moves only the arrows (large title CTAs). Lines are
  // decorative then; the hidden label is the readable text.
  let charIndex = 0;
  const rollWord = (word) => {
    const start = charIndex;
    charIndex += word.length + 1;
    return (
      <RollingGlyphs
        text={word}
        start={start}
        arrowOnly={rolling === "arrow"}
      />
    );
  };

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
      {rolling && (
        <span className={rollingStyles["rolling-text__label"]}>{readable}</span>
      )}
      {lines?.map((line, index) => (
        <span
          className={styles.line}
          data-page-reveal-line="true"
          aria-hidden={rolling || undefined}
          key={`${line.map((word) => word.text).join(" ")}-${index}`}
          style={{
            "--reveal-delay": `${delay - elapsed + index * stagger}s`,
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
                  {rolling ? rollWord(word.text) : word.text}
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
              <span data-reveal-break="true" className={word.className} />
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
