import React from "react";
import { gsap } from "gsap";
import styles from "./Footer.module.scss";
import { RevealText } from "../../../components/RevealText/RevealText.jsx";
import { RevealRow } from "../../../components/RevealRow/RevealRow.jsx";
import SubmitWorkSection from "./submit-work/SubmitWorkSection.jsx";
import { BrandLogo } from "../logo/index.jsx";
import { RollingText } from "../../../components/RollingText/RollingText.jsx";
import content from "./footer-content.json";

export const FOOTER_COLORS = { home: "#d9d9d9", poster: "#d9d9d9" };

const BRAND_MASK_COUNT = 14;
const BRAND_MASK_REVEAL_STAGGER = 0.03;
const BRAND_MASK_SLIDE_Y = 20;

function FooterBrand() {
  const brandRef = React.useRef(null);

  React.useLayoutEffect(() => {
    if (!brandRef.current) return undefined;

    const brand = brandRef.current;
    const footer = brand.closest("footer");
    const footerEnd = footer?.querySelector("[data-footer-end]");
    const masks = Array.from(
      brand.querySelectorAll("[data-footer-brand-mask]"),
    );
    let revealStarted = false;
    let revealTimeline;
    gsap.set(masks, {
      y: BRAND_MASK_SLIDE_Y,
      scaleY: 0,
      opacity: 0,
    });

    const finalScales = masks.map((mask, index) => {
      const height = Math.max(1, mask.offsetHeight);
      const minimumScale = Math.min(1, 2 / height);
      const indexProgress = index / Math.max(1, masks.length - 1);
      return minimumScale + (1 - minimumScale) * indexProgress;
    });

    const revealAtBottom = () => {
      if (revealStarted) return;
      revealStarted = true;

      revealTimeline = gsap
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

    if (!footerEnd) return undefined;

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) revealAtBottom();
      },
      { threshold: 0 },
    );
    footerObserver.observe(footerEnd);

    return () => {
      footerObserver.disconnect();
      revealTimeline?.kill();
      gsap.killTweensOf(masks);
      gsap.set(masks, {
        y: 0,
        scaleY: 0,
        opacity: 0,
      });
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

// Explore links that carry their own column / mobile placement rule.
const EXPLORE_LINK_CLASS = {
  ownership: styles.ownership,
  guidelines: styles.guidelines,
  submit: styles.submit,
};

function FooterContact({ labelClassName = "" }) {
  return (
    <>
      <RevealText
        as="p"
        className={`${styles.text} ${styles.label} ${labelClassName}`.trim()}
      >
        {content.contact.title}
      </RevealText>
      <div className={styles.menu}>
        <RevealRow
          as="a"
          line={false}
          className={styles.email}
          href={content.contact.href}
        >
          <RollingText dim text={content.contact.label} />
        </RevealRow>
      </div>
    </>
  );
}

export function Footer({ color = FOOTER_COLORS.home, ctaVariant = "default" }) {
  const colorClass =
    color === FOOTER_COLORS.poster ? styles.posterColor : styles.homeColor;
  return (
    <footer className={`${styles.footer} ${colorClass}`}>
      <FooterBrand />

      <div className={styles.cta}>
        <SubmitWorkSection
          variant={ctaVariant}
          content={content.cta[ctaVariant] ?? content.cta.default}
        />
      </div>
      <div className={styles.main}>
        <div
          className={`${styles["main__content"]} ${styles["main__content--top"]}`}
        >
          <BrandLogo />

          <RevealText
            as="p"
            className={`${styles.text} ${styles.description} ${styles["mobile-description"]}`}
          >
            {content.description}
          </RevealText>

          <div>
            <RevealText as="p" className={`${styles.text} ${styles.label}`}>
              {content.explore.title}
            </RevealText>
            <div className={styles.menu}>
              {content.explore.links.map((link) => (
                <RevealRow
                  key={link.id}
                  as="a"
                  line={false}
                  className={[styles.text, EXPLORE_LINK_CLASS[link.id]].filter(Boolean).join(" ")}
                  href={link.href}
                >
                  <RollingText dim text={link.label} />
                </RevealRow>
              ))}
            </div>
          </div>

          <div>
            <RevealText as="p" className={`${styles.text} ${styles.label}`}>
              {content.socials.title}
            </RevealText>

            <div className={styles.menu}>
              {content.socials.links.map((link) => (
                <RevealRow
                  key={link.id}
                  as="a"
                  line={false}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <RollingText dim text={link.label} />
                </RevealRow>
              ))}
            </div>
          </div>

          <div className={`${styles["mobile-question"]}`}>
            <FooterContact />
          </div>
          <div className={`${styles.backToTop} ${styles["desktop"]}`}>
            <RevealRow as="a" line={false} href={content.backToTop.href}>
              <RollingText
                dim
                text={`${content.backToTop.label} ${content.backToTop.arrow}`}
              />
            </RevealRow>
          </div>
        </div>
        <div className={`${styles["main__content"]}`}>
          <div className={`${styles.backToTop} ${styles["mobile-back-to-top"]}`}>
            {/* Last row of the page: it stays in the bottom 10% band at the
                page end, so it uses the whole-viewport (pinned) observer. */}
            <RevealRow as="a" line={false} pinned href={content.backToTop.href}>
              <RollingText
                dim
                className={styles.backToTopLabel}
                text={`${content.backToTop.label} `}
              />
              <RollingText dim text={content.backToTop.arrow} />
            </RevealRow>
          </div>
          <RevealText
            as="p"
            className={`${styles.text} ${styles.description} ${styles["desktop"]}`}
          >
            {content.description}
          </RevealText>

          <div className={`${styles["desktop"]}`}>
            <FooterContact labelClassName={styles["desktop"]} />
          </div>

          <RevealText as="div" className={styles.copyright}>
            {content.copyright}
          </RevealText>
        </div>
      </div>
      <span
        className={styles.footerEndSentinel}
        data-footer-end
        aria-hidden="true"
      />
    </footer>
  );
}
