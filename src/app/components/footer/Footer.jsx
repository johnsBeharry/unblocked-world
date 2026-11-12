import React from "react";
import { gsap } from "gsap";
import styles from "./Footer.module.scss";
import SubmitWorkSection from "./submit-work/SubmitWorkSection.jsx";
import { BrandLogo } from "../logo/index.jsx";

export const FOOTER_COLORS = { home: "#d9d9d9", poster: "#d9d9d9" };

const BRAND_MASK_COUNT = 14;
const BRAND_MASK_REVEAL_STAGGER = 0.03;
const BRAND_MASK_SLIDE_Y = 20;
const BRAND_MASK_REVEAL_START = 0.9;

function FooterBrand() {
  const brandRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!brandRef.current) return undefined;

    const brand = brandRef.current;
    const masks = Array.from(
      brand.querySelectorAll("[data-footer-brand-mask]"),
    );
    let frame = 0;
    let revealStarted = false;
    gsap.set(masks, { y: 0, scaleY: 0, opacity: 0, y: BRAND_MASK_SLIDE_Y });

    const finalScales = masks.map((mask, index) => {
      const height = Math.max(1, mask.offsetHeight);
      const minimumScale = Math.min(1, 2 / height);
      const indexProgress = index / Math.max(1, masks.length - 1);
      return minimumScale + (1 - minimumScale) * indexProgress;
    });

    const revealAtBottom = () => {
      if (revealStarted) return;
      revealStarted = true;

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .to([...masks].reverse(), {
          scaleY: (_, mask) => finalScales[masks.indexOf(mask)],
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: BRAND_MASK_REVEAL_STAGGER,
          overwrite: "auto",
          ease: "power4.out",
        });
    };

    const checkBottom = () => {
      frame = 0;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const scrollProgress = window.scrollY / maxScroll;
      if (scrollProgress >= BRAND_MASK_REVEAL_START) revealAtBottom();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(checkBottom);
    };
    const onResize = () => checkBottom();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    checkBottom();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      gsap.killTweensOf(masks);
    };
  }, []);

  return (
    <div ref={brandRef} className={styles.brandReveal}>
      <div className={styles.brandMasks} aria-hidden="true">
        {Array.from({ length: BRAND_MASK_COUNT }, (_, index) => (
          <div
            key={index}
            className={styles.brandMask}
            data-footer-brand-mask
            style={{ "--brand-mask-index": index }}
          />
        ))}
      </div>
    </div>
  );
}

export function Footer({ color = FOOTER_COLORS.home, ctaVariant = "default" }) {
  const colorClass =
    color === FOOTER_COLORS.poster ? styles.posterColor : styles.homeColor;
  const ctaProps =
    ctaVariant === "poster"
      ? {
          variant: "poster",
          titleLines: ["Read the", "Guidelines (→)"],
          topLabel:
            "Before You Submit. Make sure your work is original, prepared in the correct format, and connected to the current theme.",
          bottomLabel: "",
        }
      : ctaVariant === "guidelines"
        ? {
            titleLines: ["Submit", "Entry (→)"],
            showTopLabel: false,
            showBottomLabel: false,
          }
        : {};

  return (
    <footer className={`${styles.footer} ${colorClass}`}>
      <FooterBrand />

      <div className={styles.cta}>
        <SubmitWorkSection {...ctaProps} />
      </div>
      <div className={styles.main}>
        <div
          className={`${styles["main__content"]} ${styles["main__content--top"]}`}
        >
          <BrandLogo />

          <div>
            <p className={`${styles.text} ${styles.label}`}>Explore</p>
            <div className={styles.menu}>
              <a
                className={`${styles.text} ${styles.ownership}`}
                href="/posters"
              >
                Ownership
              </a>
              <a
                className={`${styles.text} ${styles.guidelines}`}
                href="/guidelines"
              >
                Guidelines
              </a>
              <a className={`${styles.text} ${styles.submit}`} href="/submit">
                (→) Submit
              </a>
            </div>
          </div>

          <div>
            <p className={`${styles.text} ${styles.label}`}>Social</p>

            <div className={styles.menu}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter (X)
              </a>
            </div>
          </div>
          <div className={`${styles.backToTop}`}>
            <a href="#top">Back to Top (↑)</a>
          </div>
        </div>
        <div className={`${styles["main__content"]}`}>
          <p className={`${styles.text} ${styles.description}`}>
            Exploring ownership, permanence, energy and peers through art,
            design and culture. Built through participation, dialogue and
            creative expression.
          </p>

          <div>
            <p className={`${styles.text} ${styles.label}`}>
              Question Everything
            </p>
            <div className={styles.menu}>
              <a className={styles.email} href="mailto:hello@unblocked.net">
                (hello@unblocked.net)
              </a>
            </div>
          </div>

          <div className={`${styles.copyright}`}>© Copyright&nbsp;2026</div>
        </div>
      </div>
    </footer>
  );
}
