import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ThemeSectionStack.module.scss";

gsap.registerPlugin(ScrollTrigger);

const getDriftDistance = () => window.innerHeight * 0.6;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function ThemeSectionStack({ children }) {
  const stackRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray("[data-theme-section-frame]", stack);
      const sections = frames.map((f) =>
        f.querySelector("[data-theme-section]"),
      );
      if (!frames.length) return;
      const last = frames.length - 1;

      const headerH = (section) =>
        section
          .querySelector('[class*="theme-section__pin-header"]')
          ?.getBoundingClientRect().height ?? 0;

      const baseTop = (k) => (k === 0 ? 0 : headerH(sections[k - 1]));
      const isTall = (k) => frames[k].offsetHeight > window.innerHeight + 1;
      const pinTop = (k) =>
        isTall(k) ? window.innerHeight - frames[k].offsetHeight : baseTop(k);
      const flowTop = (k) =>
        frames.slice(0, k).reduce((t, f) => t + f.offsetHeight, 0);

      // berapa px section k boleh geser (0 = nggak drift)
      // section terakhir & section tinggi nggak ikut drift
      const weight = (k) =>
        k >= 1 && k < last && !isTall(k) && !isTall(k - 1) ? baseTop(k) : 0;

      let stackTop = 0;
      let starts = [];
      let weights = [];

      const measure = () => {
        frames.forEach((frame, k) => {
          frame.style.position = "sticky";
          frame.style.top = `${pinTop(k)}px`;
          frame.style.zIndex = String(k + 1);
          frame.style.backgroundColor = getComputedStyle(
            sections[k],
          ).backgroundColor;
        });
        stackTop = stack.getBoundingClientRect().top + window.scrollY;
        // scroll (relatif ke top stack) saat section k mulai ke-pin
        starts = frames.map((_, k) => flowTop(k) - pinTop(k));
        weights = frames.map((_, k) => weight(k));
      };

      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      // quickTo = ada inersia halus tanpa bikin tween baru tiap frame
      const setY = frames.map((f) =>
        gsap.quickTo(f, "y", { duration: 0.4, ease: "power3.out" }),
      );

      const update = (self) => {
        const rel = self.scroll() - stackTop;
        const D = getDriftDistance();

        // dorongan tiap section k, hanya jalan SETELAH k ke-pin
        const push = frames.map(
          (_, k) => weights[k] * clamp01((rel - starts[k]) / D),
        );

        // y section j = total dorongan dari j sampai section terakhir yang sudah drift
        let acc = 0;
        for (let j = last; j >= 0; j -= 1) {
          acc += push[j];
          setY[j](-acc);
        }
      };

      ScrollTrigger.create({
        trigger: stack,
        start: "top bottom",
        end: "bottom top",
        invalidateOnRefresh: true,
        onUpdate: update,
        onRefresh: update,
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => ScrollTrigger.removeEventListener("refreshInit", measure);
    }, stack);

    return () => {
      ctx.revert();
      stack
        .querySelectorAll("[data-theme-section-frame]")
        .forEach((f) =>
          [
            "position",
            "top",
            "z-index",
            "background-color",
            "transform",
          ].forEach((p) => f.style.removeProperty(p)),
        );
    };
  }, []);

  return (
    <div ref={stackRef} className={styles.root} data-theme-section-stack>
      {children}
    </div>
  );
}
