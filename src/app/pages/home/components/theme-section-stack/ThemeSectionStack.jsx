import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ThemeSectionStack.module.scss";

gsap.registerPlugin(ScrollTrigger);

const getDriftDistance = () => window.innerHeight * 0.6;
// Tablet + mobile (full-screen sections): plain pin, every section sticks when
// its top meets the browser top and the next one slides over it; no header
// offsets and no drift.
const PLAIN_PIN_QUERY = "(max-width: 864px)"; // same as the SCSS tablet mixin
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

      let plain = false;
      const baseTop = (k) =>
        k === 0 || plain ? 0 : headerH(sections[k - 1]);
      const isTall = (k) => frames[k].offsetHeight > window.innerHeight + 1;
      // Plain pin always sticks at the browser top, even when a frame is a
      // little taller than the visible viewport (mobile browser bars).
      const pinTop = (k) =>
        !plain && isTall(k)
          ? window.innerHeight - frames[k].offsetHeight
          : baseTop(k);
      const flowTop = (k) =>
        frames.slice(0, k).reduce((t, f) => t + f.offsetHeight, 0);
      // px section k yang ketutup di bawah viewport saat pin di bawah header
      const overflow = (k) =>
        Math.max(0, frames[k].offsetHeight - (window.innerHeight - baseTop(k)));

      // berapa px section k boleh geser (0 = nggak drift)
      // section terakhir & section tinggi nggak ikut drift.
      // Section yang overflow (mis. fullscreen) geser sebesar overflow-nya,
      // jadi naik sampai full visible sebelum section berikutnya masuk.
      const weight = (k) => {
        if (plain || k >= last || isTall(k) || (k > 0 && isTall(k - 1))) return 0;
        return overflow(k) || (k >= 1 ? baseTop(k) : 0);
      };

      let stackTop = 0;
      let starts = [];
      let weights = [];
      let distances = [];
      let exact = false;

      const measure = () => {
        plain = window.matchMedia(PLAIN_PIN_QUERY).matches;
        if (plain) gsap.set(frames, { y: 0 });
        frames.forEach((frame, k) => {
          frame.style.position = "sticky";
          frame.style.top = `${pinTop(k)}px`;
          frame.style.zIndex = String(k + 1);
          frame.style.backgroundColor = getComputedStyle(
            sections[k],
          ).backgroundColor;
          // Frames sit at fractional positions (vw heights + drift), so the
          // compositor can snap neighbours apart and expose a 1px seam of the
          // page background. Frames with a next frame get a 2px backfill
          // below them (see ThemeSection `.frame`); the next frame covers it.
          // Plain pin: every frame ends at the same stack bottom on release,
          // so a backfill would poke out below the last section; the next
          // frame always covers the previous one fully, so none is needed.
          frame.toggleAttribute(
            "data-theme-section-backfill",
            !plain && k < last,
          );
        });
        stackTop = stack.getBoundingClientRect().top + window.scrollY;
        // scroll (relatif ke top stack) saat section k mulai ke-pin
        starts = frames.map((_, k) => flowTop(k) - pinTop(k));
        weights = frames.map((_, k) => weight(k));
        // overflow drift 1:1 dengan scroll, supaya section berikutnya
        // tetap nempel di bawah section aktif tanpa celah
        distances = frames.map((_, k) => overflow(k) || getDriftDistance());
        exact = frames.some((_, k) => weights[k] && overflow(k));
      };

      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      // quickTo = ada inersia halus tanpa bikin tween baru tiap frame;
      // mode overflow pakai set langsung karena harus sinkron dengan scroll
      const smoothY = frames.map((f) =>
        gsap.quickTo(f, "y", { duration: 0.4, ease: "power3.out" }),
      );
      const exactY = frames.map((f) => gsap.quickSetter(f, "y", "px"));

      const update = (self) => {
        const rel = self.scroll() - stackTop;
        const setY = exact ? exactY : smoothY;

        // dorongan tiap section k, hanya jalan SETELAH k ke-pin
        const push = frames.map(
          (_, k) => weights[k] * clamp01((rel - starts[k]) / distances[k]),
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
        .forEach((f) => f.removeAttribute("data-theme-section-backfill"));
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
