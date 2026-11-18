import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import styles from "./OwnershipReferences.module.scss";
import content from "./ownership-references-content.json";

gsap.registerPlugin(ScrollTrigger);

const POSTER_PROFILES = [
  { speed: 0.24 },
  { speed: 0.34 },
  { speed: 0.46 },
  { speed: 0.58 },
];

const MOUSE_DEPTH = [0.35, 0.55, 0.8, 1];
const MAX_MOUSE_SCALE = 1.2;


export function OwnershipReferences() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const posters = Array.from(
      section.querySelectorAll("[data-reference-poster]"),
    );
    const mouseX = posters.map((poster) =>
      gsap.quickTo(poster, "x", {
        duration: 0.45,
        ease: "power3.out",
      }),
    );
    // quickTo needs individual properties (the `scale` alias cannot be
    // reset and only warns), so scaleX and scaleY move together.
    const mouseScale = posters.map((poster) => {
      const toX = gsap.quickTo(poster, "scaleX", { duration: 0.5, ease: "power3.out" });
      const toY = gsap.quickTo(poster, "scaleY", { duration: 0.5, ease: "power3.out" });
      return (value) => {
        toX(value);
        toY(value);
      };
    });
    let posterProfiles = [];
    let pinTrigger;
    let frame;

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect();
      const insideSection =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!insideSection) {
        resetPointer();
        return;
      }

      const normalizedX = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      posters.forEach((poster, index) => {
        const posterRect = poster.getBoundingClientRect();
        const centerX = posterRect.left + posterRect.width / 2;
        const centerY = posterRect.top + posterRect.height / 2;
        const distance = Math.hypot(
          event.clientX - centerX,
          event.clientY - centerY,
        );
        const influenceRadius =
          Math.max(posterRect.width, posterRect.height) * 1.2;
        const proximity = Math.max(
          0,
          Math.min(1, 1 - distance / influenceRadius),
        );
        const depth = MOUSE_DEPTH[index % MOUSE_DEPTH.length];
        const movement = 0.35 + proximity * 0.65;
        mouseX[index](normalizedX * 8 * depth * movement);
        mouseScale[index](1 + (MAX_MOUSE_SCALE - 1) * proximity);
      });
    };

    const resetPointer = () => {
      posters.forEach((poster, index) => {
        mouseX[index](0);
        mouseScale[index](1);
      });
    };

    const measureProfiles = () => {
      posterProfiles = posters.map((poster, index) => ({
        poster,
        profile: POSTER_PROFILES[index % POSTER_PROFILES.length],
      }));
    };

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const top = pinTrigger
          ? pinTrigger.start - window.scrollY
          : section.getBoundingClientRect().top;
        posterProfiles.forEach(({ poster, profile }) => {
          gsap.set(poster, { y: top * profile.speed });
        });
      });
    };

    const handleResize = () => {
      measureProfiles();
      update();
    };

    const handlePin = () => {
      const section = sectionRef.current;
      if (!section || !posters.length) return undefined;

      const getPinEnd = () => {
        const threshold = window.innerHeight * 0.8;
        const clearance = posters.map((poster, index) => {
          const baseBottom = poster.offsetTop + poster.offsetHeight;
          const speed = POSTER_PROFILES[index % POSTER_PROFILES.length].speed;

          return (baseBottom - threshold) / speed;
        });
        const longestClearance = Math.max(...clearance, 1);

        return `+=${Math.max(1, longestClearance)}`;
      };

      return ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: getPinEnd,
        scrub: true,
        invalidateOnRefresh: true,
        onRefresh: update,
      });
    };

    pinTrigger = handlePin();
    measureProfiles();
    update();
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", handleResize);
      pinTrigger?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.references}
      data-name="references"
      aria-label={content.label}
    >
      <div className={styles.textContainer}>
        <div className={styles.heading}>
          {content.heading.map((line) => (
            <RevealText key={line} as="p">
              {line}
            </RevealText>
          ))}
        </div>
        <RevealText as="p" className={styles.description}>
          {content.description}
        </RevealText>
      </div>

      {content.posters.map((reference, index) => (
        <div
          className={`${styles.poster} ${styles[`poster${index + 1}`]}`}
          data-name={reference.name}
          data-reference-poster
          key={reference.name}
        >
          <div
            className={`${styles.imageFrame} ${styles[`imageFrame${index + 1}`]}`}
            data-name={reference.imageName}
          >
            <img
              src={reference.src}
              alt={reference.alt}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
