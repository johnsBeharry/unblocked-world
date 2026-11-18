import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ThemeSectionStack.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Reading pause before each slide, in viewport heights of scroll (same 30% as
// the earlier reading spacer). A slide takes one viewport height, so the door
// moves 1:1 with the scroll.
const READ_HOLD = 0.3;
// The section below opens its clip this far above the door's bottom edge, so a
// sub-pixel rounding difference can never show a seam of the page background.
const SEAM_OVERLAP = "4px";

// Door slide (user request 2026-11-18, every screen size; sections are full
// screen): all sections sit on the same spot in one pinned stack, first on
// top. Scrolling slides the top section up out of the screen like a door while
// the section below stays still; after the last one the stack releases.
// Sections below are clipped to the part the door has uncovered (visually
// identical, they are hidden behind it anyway) so their IntersectionObserver
// reveals play when they are really seen.
export function ThemeSectionStack({ children }) {
  const stackRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray("[data-theme-section-frame]", stack);
      if (!frames.length) return;
      const sections = frames.map((f) =>
        f.querySelector("[data-theme-section]"),
      );
      const last = frames.length - 1;

      // lvh: the frame also covers the strip under collapsing mobile browser
      // bars (the section inside keeps its svh height).
      gsap.set(stack, { height: "100lvh" });
      gsap.set(frames, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100lvh",
        zIndex: (k) => frames.length - k,
        backgroundColor: (k) => getComputedStyle(sections[k]).backgroundColor,
      });
      gsap.set(frames.slice(1), {
        clipPath: `inset(calc(100% - ${SEAM_OVERLAP}) 0px 0px 0px)`,
      });

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
      });
      frames.forEach((frame, k) => {
        if (k === last) {
          timeline.to({}, { duration: READ_HOLD });
          return;
        }
        timeline
          .to(frame, { yPercent: -100, duration: 1 }, `+=${READ_HOLD}`)
          .to(
            frames[k + 1],
            {
              clipPath: `inset(calc(0% - ${SEAM_OVERLAP}) 0px 0px 0px)`,
              duration: 1,
            },
            "<",
          );
      });

      ScrollTrigger.create({
        trigger: stack,
        start: "top top",
        end: () => `+=${timeline.duration() * window.innerHeight}`,
        pin: true,
        scrub: true,
        animation: timeline,
        invalidateOnRefresh: true,
      });
    }, stack);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stackRef} className={styles.root} data-theme-section-stack>
      {children}
    </div>
  );
}
