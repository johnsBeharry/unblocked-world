import { useEffect } from "react";
import { gsap } from "gsap";

const TURN = 0.08; // easing toward the new direction per 60fps frame

// Infinite marquee that moves left while the page scrolls down and right
// while it scrolls up, easing through the turn instead of snapping.
// Markup: the marquee element holds a `[data-marquee-track]` whose children
// are identical groups (at least two, each wider than the viewport); the
// track moves by one group width and wraps, so the loop is seamless.
// `speed` is in font sizes of the marquee element per second.
export function useScrollMarquee(marqueeRef, { speed: fontSizesPerSecond }) {
  useEffect(() => {
    const marquee = marqueeRef.current;
    const track = marquee?.querySelector("[data-marquee-track]");
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;

    const setX = gsap.quickSetter(track, "x", "px");
    let speed = 0;
    const measure = () => {
      speed = fontSizesPerSecond * parseFloat(getComputedStyle(marquee).fontSize);
    };
    measure();
    let x = 0;
    let direction = -1;
    let velocity = -1;
    let lastScroll = window.scrollY;

    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (delta) direction = delta > 0 ? -1 : 1;
    };
    const tick = (time, deltaTime) => {
      const groupWidth = track.scrollWidth / track.children.length;
      if (!groupWidth) return;
      const turn = 1 - (1 - TURN) ** (deltaTime / (1000 / 60));
      velocity += (direction - velocity) * turn;
      x = gsap.utils.wrap(-groupWidth, 0, x + (velocity * speed * deltaTime) / 1000);
      setX(x);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      gsap.ticker.remove(tick);
    };
  }, [marqueeRef, fontSizesPerSecond]);
}
