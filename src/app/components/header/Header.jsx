import React, { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealText } from "../../../components/RevealText/RevealText.jsx";
import { getLenis } from "../smooth-scroll/SmoothScroll.jsx";
import { RollingText } from "../../../components/RollingText/RollingText.jsx";
import styles from "./Header.module.scss";

export const HEADER_COLORS = {
  home: "#d9d9d9",
  poster: "#f4a9c0",
  guidelines: "#fff0f0",
};

const DARK_TEXT = "#101010";

// sRGB relative luminance and WCAG contrast ratio.
const channel = (value) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
const luminance = ([r, g, b]) =>
  0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
const parseRgb = (value) => {
  const [r = 0, g = 0, b = 0, a = 1] = (value.match(/[\d.]+/g) ?? []).map(
    Number,
  );
  return { rgb: [r, g, b], alpha: value.startsWith("rgba") ? a : 1 };
};
const hexToRgb = (hex) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

// First opaque background behind a point (paint order, top first). Sampled at
// the left edge so centred decoration (e.g. hero artwork) is not picked up.
function backgroundAt(x, y) {
  for (const element of document.elementsFromPoint(x, y)) {
    const value = getComputedStyle(element).backgroundColor;
    const { alpha } = parseRgb(value);
    if (alpha > 0.5) return value;
  }
  return getComputedStyle(document.body).backgroundColor;
}

const HIDE_AFTER = 60; // always shown near the top of the page
const BAR_AFTER = 5; // bar background only after scrolling past this
const SCROLL_DELTA = 6; // ignore tiny scroll movements (no flicker)
const MENU_CURTAIN_STRIPS = 20;

// Header bar takes the colour of the section underneath; its text switches to
// dark when that gives better contrast than the route's light colour. The bar
// is transparent at the top of the page (≤ BAR_AFTER px). The header slides
// away while scrolling down and returns on scroll up.
function useAdaptiveHeader(
  headerRef,
  barRef,
  lightText,
  { onLightClass, hiddenClass, barVisibleClass },
) {
  useEffect(() => {
    const header = headerRef.current;
    const bar = barRef.current;
    if (!header || !bar) return undefined;
    const light = hexToRgb(lightText);
    const dark = hexToRgb(DARK_TEXT);
    let frame = 0;
    let last = "";
    let lastY = window.scrollY;

    const updateVisibility = () => {
      const y = window.scrollY;
      if (y <= HIDE_AFTER) header.classList.remove(hiddenClass);
      else if (Math.abs(y - lastY) < SCROLL_DELTA) return;
      else header.classList.toggle(hiddenClass, y > lastY);
      lastY = y;
    };

    const update = () => {
      frame = 0;
      updateVisibility();
      bar.classList.toggle(barVisibleClass, window.scrollY > BAR_AFTER);
      const background = backgroundAt(2, bar.offsetHeight / 2);
      if (background === last) return;
      last = background;
      const { rgb } = parseRgb(background);
      bar.style.backgroundColor = background;
      header.classList.toggle(
        onLightClass,
        contrast(rgb, dark) > contrast(rgb, light),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    // Keyboard users tabbing into the header always see it.
    const reveal = () => header.classList.remove(hiddenClass);

    update();
    header.addEventListener("focusin", reveal);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    return () => {
      cancelAnimationFrame(frame);
      header.removeEventListener("focusin", reveal);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
    };
  }, [
    headerRef,
    barRef,
    lightText,
    onLightClass,
    hiddenClass,
    barVisibleClass,
  ]);
}

// Each label sits in a `data-header-intro` span so a page intro (home hero)
// can slide it inside its link; elsewhere the spans are static.
export function Header({ color = HEADER_COLORS.home }) {
  const headerRef = useRef(null);
  const barRef = useRef(null);
  const menuCurtainRef = useRef(null);
  const menuContentRef = useRef(null);
  const closingRef = useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuRevealed, setMenuRevealed] = React.useState(false);
  const [menuClosing, setMenuClosing] = React.useState(false);
  useAdaptiveHeader(headerRef, barRef, color, {
    onLightClass: styles.onLight,
    hiddenClass: styles.scrolledAway,
    barVisibleClass: styles.barVisible,
  });

  const colorClass =
    color === HEADER_COLORS.poster
      ? styles.posterColor
      : color === HEADER_COLORS.guidelines
        ? styles.guidelinesColor
        : styles.homeColor;

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    const lenis = getLenis();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  // Close mirrors the open: the copy lifts and fades, then the strips retract
  // upward from the bottom one; the menu unmounts (and scroll unlocks) only
  // when the curtain is gone.
  const closeMenu = () => {
    if (closingRef.current) return;
    const strips = Array.from(menuCurtainRef.current?.children ?? []);
    if (
      !strips.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setMenuOpen(false);
      return;
    }
    gsap.killTweensOf(strips);
    setMenuClosing(true);
    closingRef.current = gsap
      .timeline({
        onComplete: () => {
          closingRef.current = null;
          setMenuClosing(false);
          setMenuOpen(false);
        },
      })
      .to(
        menuContentRef.current,
        { autoAlpha: 0, y: -16, duration: 0.35, ease: "power2.in" },
        0,
      )
      .to(
        strips,
        {
          scaleY: 0,
          transformOrigin: "50% 0%",
          duration: 0.55,
          stagger: { each: 0.02, from: "end" },
          ease: "power2.inOut",
        },
        0.15,
      );
  };

  useEffect(() => () => closingRef.current?.kill(), []);

  useLayoutEffect(() => {
    if (!menuOpen) {
      setMenuRevealed(false);
      return undefined;
    }

    const strips = Array.from(menuCurtainRef.current?.children ?? []);
    if (!strips.length) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      gsap.set(strips, { scaleY: 1 });
      setMenuRevealed(true);
      return undefined;
    }

    gsap.set(strips, { scaleY: 0 });
    const curtain = gsap.to(strips, {
      scaleY: 1,
      transformOrigin: "50% 100%",
      duration: 0.5,
      stagger: 0.02,
      ease: "power2.inOut",
      onComplete: () => setMenuRevealed(true),
    });

    return () => curtain.kill();
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={`${styles.header} ${menuOpen ? styles.menuOpen : ""}`}
      aria-label="Primary navigation"
    >
      <span ref={barRef} className={styles.bar} aria-hidden="true" />
      {menuOpen && (
        <div
          className={styles.mobileMenu}
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation"
          style={{ "--mobile-menu-color": color }}
        >
          <div
            ref={menuCurtainRef}
            className={styles.mobileMenuCurtain}
            aria-hidden="true"
          >
            {Array.from({ length: MENU_CURTAIN_STRIPS }, (_, index) => (
              <span
                key={index}
                className={styles.mobileMenuStrip}
                style={{ "--strip-index": index }}
              />
            ))}
          </div>
          <div
            ref={menuContentRef}
            className={`${styles.mobileMenuContent} ${menuRevealed ? styles.mobileMenuContentReady : ""}`}
          >
            <nav className={styles.mobileMenuLinks} aria-label="Mobile links">
              <RevealText
                as="a"
                href="/posters"
                play={menuRevealed}
                delay={0}
                duration={0.8}
              >
                Poster
              </RevealText>
              <RevealText
                as="a"
                href="/grants"
                play={menuRevealed}
                delay={0.08}
                duration={0.8}
              >
                Grants
              </RevealText>
              <RevealText
                as="a"
                href="/guidelines"
                play={menuRevealed}
                delay={0.08}
                duration={0.8}
              >
                Guidelines
              </RevealText>
              <RevealText
                as="a"
                href="/submit"
                play={menuRevealed}
                delay={0.16}
                duration={0.8}
              >
                Submit (→)
              </RevealText>
            </nav>
            <div className={styles.mobileMenuContact}>
              <RevealText
                as="p"
                play={menuRevealed}
                delay={0.32}
                duration={0.7}
              >
                Question Everything
              </RevealText>
              <RevealText
                as="a"
                href="mailto:hello@unblocked.net"
                play={menuRevealed}
                delay={0.38}
                duration={0.7}
              >
                (hello@unblocked.net)
              </RevealText>
            </div>
          </div>
        </div>
      )}
      <nav className={`${styles.nav} ${colorClass}`}>
        <a className={styles.navItem} href="/posters">
          <span data-header-intro>
            <RollingText dim text="Poster" />
          </span>
        </a>
        <a className={styles.navItem} href="/grants">
          <span data-header-intro>
            <RollingText dim text="Grants" />
          </span>
        </a>
        <a className={styles.navItem} href="/guidelines">
          <span data-header-intro>
            <RollingText dim text="Guidelines" />
          </span>
        </a>
        <a className={styles.navItem} href="/submit">
          <span data-header-intro>
            <RollingText dim text="Submit (→)" />
          </span>
        </a>
      </nav>
      <a className={`${styles.home} ${colorClass}`} href="/">
        <span data-header-intro>
            <RollingText dim text="Home" />
          </span>
      </a>
      <button
        className={`${styles.menu} ${colorClass}`}
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen && !menuClosing}
        onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
      >
        <span data-header-intro>
          {menuOpen && !menuClosing ? "Close" : "Menu"}
        </span>
      </button>
    </header>
  );
}
