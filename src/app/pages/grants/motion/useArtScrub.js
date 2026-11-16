import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scrubbed artwork build of the grant program cards (Culture Grants Makers;
// shared from grants/motion): `build(timeline, root)`
// adds tweens that start from the artwork's opening state and end on the
// mockup. Progress runs only while the artwork itself is fully on screen:
// from its bottom reaching the viewport bottom until its centre reaches 35%
// of the viewport (the card trigger used before let the tall green card
// start the build while the artwork was still below the screen). Reverses on
// upward scroll; reduced motion keeps the static mockup.
export function useArtScrub(rootRef, build) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "bottom bottom",
          end: "center 35%",
          scrub: true,
        },
      });
      build(timeline, root);
    }, root);

    return () => ctx.revert();
  }, [rootRef, build]);
}
