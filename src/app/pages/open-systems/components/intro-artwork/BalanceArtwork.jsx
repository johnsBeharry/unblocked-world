import { useId, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "../../../grants/motion/scrollMotion";
import styles from "./IntroArtwork.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Supplied 450 × 267 export (Open Systems Intro, pink card): a ball on top
// of the lower half / bottom slices of three larger circles, each cut by its
// clip box. `lift` = how far above its place a piece starts (SVG units =
// design px): every falling piece starts above the pink card (the SVG sits
// 102.5px below the card top, the bowl ends at 237), and higher pieces
// start higher, so they land bottom → top.
const CX = 225;
const BASE = { cy: 42, r: 225, clip: { x: 0, y: 237, width: 450, height: 30 } };
const BOWL = { cy: 87, r: 150, clip: { x: 75, y: 165, width: 300, height: 72 }, lift: 360 };
const CUP = { cy: 90, r: 75, clip: { x: 150, y: 90, width: 150, height: 75 }, lift: 420 };
const BALL = { cy: 45, r: 45, lift: 480 };

// Drop: bowl, cup and ball start together when the pink card is half way up
// the viewport and fall under one gravity (fall time = √(2h / g)), so they
// land bottom → top. A softer gravity and a fall curve that eases into its
// first frames keep the drop smooth. Plays once; reduced motion keeps the
// export.
const GRAVITY = 1700; // design px / s²
const FALL_EASE = "power2.in";

// Rocker board: bowl and cup have curved bottoms resting on a flat top, so
// on landing they rock like a rocker board — they roll on their arc (rotate
// around their circle centre, with x = R·θ, so the arc keeps touching the
// surface without slipping) and the swing dies out. Everything above rides
// along (cup in the bowl's frame, ball in the cup's). `swings` are the
// successive extreme angles (deg) of the damped rocking; `half` the time
// between two extremes (the smaller cup rocks faster).
const ROCK = {
  bowl: { swings: [3.2, -1.9, 1.05, -0.5, 0.2, 0], half: 0.34 },
  cup: { swings: [-4.5, 2.6, -1.4, 0.65, -0.25, 0], half: 0.26 },
};

// Medium-firm rubber ball: a short squash from its bottom on impact, then
// two bounces that lose most of their height (same gravity on the way up and
// down, so the rhythm stays physical).
const BOUNCE = {
  squash: { scaleX: 1.06, scaleY: 0.9, duration: 0.07 },
  heights: [24, 6], // design px
};

const fallTime = (height) => Math.sqrt((2 * height) / GRAVITY);
const DEG = Math.PI / 180;

// Damped rocking of `frame` around (CX, cy): the transform attribute is
// written directly (translate + rotate around the circle centre), so it
// never mixes with the GSAP fall tweens on the inner groups.
function addRock(timeline, frame, { cy, r }, { swings, half }, at) {
  const rock = { angle: 0 };
  const write = () =>
    frame.setAttribute(
      "transform",
      `translate(${r * rock.angle * DEG} 0) rotate(${rock.angle} ${CX} ${cy})`,
    );
  timeline.to(
    rock,
    {
      keyframes: swings.map((angle, index) => ({
        angle,
        // The landing kicks the first swing (fast start), the rest swing
        // through the rest position.
        duration: index === 0 ? half / 2 : half,
        ease: index === 0 ? "sine.out" : "sine.inOut",
      })),
      onUpdate: write,
    },
    at,
  );
}

function useDrop(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (prefersReducedMotion()) return undefined;
    const card = root.closest("[data-program-card]") ?? root;
    const part = (name) => root.querySelector(`[data-balance="${name}"]`);

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 50%", once: true },
      });

      [
        [part("bowl-fall"), BOWL],
        [part("cup-fall"), CUP],
        [part("ball-fall"), BALL],
      ].forEach(([element, piece]) => {
        timeline.fromTo(
          element,
          { y: -piece.lift },
          { y: 0, duration: fallTime(piece.lift), ease: FALL_EASE },
          0,
        );
      });

      addRock(timeline, part("bowl-rock"), BOWL, ROCK.bowl, fallTime(BOWL.lift));
      addRock(timeline, part("cup-rock"), CUP, ROCK.cup, fallTime(CUP.lift));

      // Explicit positions: the rock tweens make the timeline longer than
      // the ball's own sequence, so appended tweens would start too late.
      const body = part("ball-body");
      const ball = part("ball-fall");
      let at = fallTime(BALL.lift);
      timeline
        .fromTo(
          body,
          { scaleX: 1, scaleY: 1, transformOrigin: "50% 100%" },
          { ...BOUNCE.squash, ease: "power1.out" },
          at,
        )
        .to(
          body,
          { scaleX: 1, scaleY: 1, duration: BOUNCE.squash.duration, ease: "power1.in" },
          at + BOUNCE.squash.duration,
        );
      at += BOUNCE.squash.duration * 2;
      BOUNCE.heights.forEach((height) => {
        const time = fallTime(height);
        timeline
          .to(ball, { y: -height, duration: time, ease: "power2.out" }, at)
          .to(ball, { y: 0, duration: time, ease: "power2.in" }, at + time);
        at += time * 2;
      });
    }, root);

    return () => {
      ctx.revert();
      part("bowl-rock").removeAttribute("transform");
      part("cup-rock").removeAttribute("transform");
    };
  }, [rootRef]);
}

export function BalanceArtwork() {
  const rootRef = useRef(null);
  // Clip ids must be unique per instance.
  const idPrefix = useId().replace(/:/g, "");
  useDrop(rootRef);
  const clipId = (name) => `${idPrefix}-${name}`;

  return (
    <svg
      ref={rootRef}
      className={styles["intro-artwork--balance"]}
      viewBox="0 0 450 267"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {[
          ["base", BASE],
          ["bowl", BOWL],
          ["cup", CUP],
        ].map(([name, piece]) => (
          <clipPath id={clipId(name)} key={name}>
            <rect {...piece.clip} />
          </clipPath>
        ))}
      </defs>

      {/* Base: in place from the start. */}
      <g clipPath={`url(#${clipId("base")})`}>
        <circle cx={CX} cy={BASE.cy} r={BASE.r} />
      </g>

      {/* Rock frames (unclipped) nest bottom → top so the pieces above ride
          along; each falling group carries its own clip, so a slice keeps
          its shape while it falls and rocks. The ball is never clipped. */}
      <g data-balance="bowl-rock">
        <g clipPath={`url(#${clipId("bowl")})`} data-balance="bowl-fall">
          <circle cx={CX} cy={BOWL.cy} r={BOWL.r} />
        </g>
        <g data-balance="cup-rock">
          <g clipPath={`url(#${clipId("cup")})`} data-balance="cup-fall">
            <circle cx={CX} cy={CUP.cy} r={CUP.r} />
          </g>
          <g data-balance="ball-fall">
            <circle cx={CX} cy={BALL.cy} r={BALL.r} data-balance="ball-body" />
          </g>
        </g>
      </g>
    </svg>
  );
}
