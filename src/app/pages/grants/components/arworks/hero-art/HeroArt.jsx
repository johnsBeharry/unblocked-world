import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HeroArt.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Entrance (user requests 2026-11-17: "in on scroll, real time", then "all
// from the centre outward, a circle in the middle at the start"): every
// piece (a circle clipped to a band, both moving together) is scaled down
// around the shared centre so its ring is START_RADIUS wide — the four rings
// collapse into one small circle in the middle — and grows out to the mockup
// while the artwork scrolls in. Scrubbed on desktop / tablet (reverses on
// scroll up); on mobile the artwork is on the first screen, so the same
// build plays once on load (as the Culture Grants hero). A solid core disc
// makes the opening a clean circle (the collapsed pieces alone leave gaps)
// and shrinks to nothing as the rings grow. No opacity; reduced motion keeps
// the static mockup (the core stays hidden: `.core` in the module).
const CENTRE = "345.233 402.451";
const START_RADIUS = 90; // design px, radius of the opening circle
// Scrub from the artwork centre (the opening circle) entering at the
// viewport bottom until it reaches 35% of the viewport, so the circle is on
// screen when the build starts.
const BUILD = { start: "center bottom", end: "center 35%", ease: "power2.inOut" };
const MOBILE_QUERY = "(max-width: 600px)";
const MOBILE_INTRO = { delay: 0.4, duration: 1.4 };

function useRingBuild(rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const pieces = gsap.utils.toArray("[data-ring-piece]", root);
    const radius = (piece) => Number(piece.querySelector("circle").getAttribute("r"));
    const core = root.querySelector("[data-ring-core]");
    const add = (timeline, duration = 1) => {
      // Shown right away (inside the matchMedia context, so a revert hides
      // it again); a set at time 0 of a scrubbed timeline would not render
      // at progress 0.
      gsap.set(core, { display: "inline" });
      return timeline
        .fromTo(
          pieces,
          { scale: (_, piece) => START_RADIUS / radius(piece), svgOrigin: CENTRE },
          { scale: 1, svgOrigin: CENTRE, duration, ease: BUILD.ease },
          0,
        )
        // The core stays whole while the rings leave it, then shrinks away.
        .fromTo(core, { scale: 1, svgOrigin: CENTRE }, { scale: 0, svgOrigin: CENTRE, duration: duration * 0.6, ease: "power2.in" }, duration * 0.15);
    };
    const mm = gsap.matchMedia(root);
    mm.add(`not all and ${MOBILE_QUERY}`, () =>
      add(gsap.timeline({ scrollTrigger: { trigger: root, start: BUILD.start, end: BUILD.end, scrub: true } })),
    );
    mm.add(MOBILE_QUERY, () => add(gsap.timeline({ delay: MOBILE_INTRO.delay }), MOBILE_INTRO.duration));
    return () => mm.revert();
  }, [rootRef]);
}

export function HeroArtwork({ label }) {
  const rootRef = useRef(null);
  useRingBuild(rootRef);
  return (
    <svg
      ref={rootRef}
      className={styles.artwork}
      width="690"
      height="804"
      viewBox="0 0 690 804"
      fill="none"
      role="img"
      aria-label={label}
    >
      <g clipPath="url(#clip0_2693_1700)">
        <rect
          width="690"
          height="804"
          transform="translate(690 804) rotate(180)"
          fill="#4F23BF"
        />
        <g data-ring-piece data-dx="0.0" data-dy="-58.106">
          <g clipPath="url(#clip1_2693_1700)">
            <circle cx="345.233" cy="344.345" r="211.35" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="0.0" data-dy="57.672">
          <g clipPath="url(#clip2_2693_1700)">
            <circle cx="345.233" cy="460.123" r="211.35" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="25.382" data-dy="0.0">
          <g clipPath="url(#clip3_2693_1700)">
            <circle cx="370.615" cy="402.451" r="211.35" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="-25.86" data-dy="0.0">
          <g clipPath="url(#clip4_2693_1700)">
            <circle cx="319.373" cy="402.451" r="211.35" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="-20.73" data-dy="0.146">
          <g clipPath="url(#clip5_2693_1700)">
            <circle cx="324.503" cy="402.597" r="339.441" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="20.33" data-dy="0.138">
          <g clipPath="url(#clip6_2693_1700)">
            <circle cx="365.563" cy="402.589" r="339.441" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="0.101" data-dy="-36.66">
          <g clipPath="url(#clip7_2693_1700)">
            <circle cx="345.334" cy="365.791" r="301.013" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="0.101" data-dy="36.211">
          <g clipPath="url(#clip8_2693_1700)">
            <circle cx="345.334" cy="438.662" r="301.013" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="0.273" data-dy="-24.66">
          <g clipPath="url(#clip9_2693_1700)">
            <circle cx="345.506" cy="377.791" r="445.115" fill="#0B0B0B" />
          </g>
        </g>
        <g data-ring-piece data-dx="0.265" data-dy="24.508">
          <g clipPath="url(#clip10_2693_1700)">
            <circle cx="345.498" cy="426.959" r="445.115" fill="#0B0B0B" />
          </g>
        </g>
        {/* Opening circle: covers the collapsed pieces at the start and
            shrinks away as they grow (scale 0 at the end = the mockup). */}
        <circle data-ring-core className={styles.core} cx="345.233" cy="402.451" r={START_RADIUS} fill="#0B0B0B" />
      </g>
      <defs>
        <clipPath id="clip0_2693_1700">
          <rect
            width="690"
            height="804"
            fill="white"
            transform="translate(690 804) rotate(180)"
          />
        </clipPath>
        <clipPath id="clip1_2693_1700">
          <rect
            width="65.1051"
            height="306.924"
            fill="white"
            transform="translate(191.539 555.695) rotate(-90)"
          />
        </clipPath>
        <clipPath id="clip2_2693_1700">
          <rect
            width="65.1051"
            height="306.924"
            fill="white"
            transform="matrix(1.31134e-7 1 1 -1.31134e-7 191.539 248.766)"
          />
        </clipPath>
        <clipPath id="clip3_2693_1700">
          <rect
            width="65.1051"
            height="306.924"
            fill="white"
            transform="matrix(-1 8.74228e-8 8.74228e-8 1 581.969 248.766)"
          />
        </clipPath>
        <clipPath id="clip4_2693_1700">
          <rect
            width="65.1051"
            height="306.924"
            fill="white"
            transform="translate(108.024 248.766)"
          />
        </clipPath>
        <clipPath id="clip5_2693_1700">
          <rect
            width="104.563"
            height="492.938"
            fill="white"
            transform="translate(-14.9374 155.766)"
          />
        </clipPath>
        <clipPath id="clip6_2693_1700">
          <rect
            width="104.563"
            height="492.938"
            fill="white"
            transform="matrix(-1 8.74228e-8 8.74228e-8 1 705 155.758)"
          />
        </clipPath>
        <clipPath id="clip7_2693_1700">
          <rect
            width="92.7254"
            height="437.134"
            fill="white"
            transform="translate(126.426 666.805) rotate(-90)"
          />
        </clipPath>
        <clipPath id="clip8_2693_1700">
          <rect
            width="92.7254"
            height="437.134"
            fill="white"
            transform="matrix(1.31134e-7 1 1 -1.31134e-7 126.426 137.648)"
          />
        </clipPath>
        <clipPath id="clip9_2693_1700">
          <rect
            width="137.115"
            height="646.4"
            fill="white"
            transform="translate(21.7969 822.906) rotate(-90)"
          />
        </clipPath>
        <clipPath id="clip10_2693_1700">
          <rect
            width="137.115"
            height="646.4"
            fill="white"
            transform="matrix(1.31134e-7 1 1 -1.31134e-7 21.793 -18.1562)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
