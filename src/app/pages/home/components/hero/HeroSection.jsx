import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import { BrandLogo } from "../../../../components/logo/index.jsx";
import { HeroArtwork } from "../../../../components/hero-artwork/HeroArtwork.jsx";
import {
  addArtworkIntro,
  prepareArtworkIntro,
} from "../../../../components/hero-artwork/artworkIntro.js";
import styles from "./HeroSection.module.scss";

// Home intro (user reference frames, 3s total): the logo drops in from above
// inside its own SVG viewport, the header labels drop into their links, the
// artwork runs the shared intro (hairlines that thicken bottom → top), and the
// two links under the logo rise in.
const INTRO = {
  logo: { at: 0, duration: 1.2, ease: "power2.inOut" },
  header: { at: 1, duration: 0.7, stagger: 0.06, ease: "power2.out" },
  artwork: 1, // shared artwork intro (hairlines → thicken), ends ~2.85s
  links: 1.6, // RevealText delay; 1.2s line reveal ends at ~2.8s
};
// Copy on the first screen plays with the intro instead of waiting for the
// viewport observer (on tablet/mobile it sits in the bottom 10% of the view,
// where the observer would hold it until the user scrolls).
const firstScreen = { delay: INTRO.links, play: true };

// Timeline position (`at`) is not a tween property; GSAP warns about it.
const tween = ({ at, ...vars }) => vars;

function useHeroIntro(rootRef, enabled) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (
      !enabled ||
      !root ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return undefined;

    const logo = root.querySelector(":scope > svg path");
    const headerLabels = Array.from(
      document.querySelectorAll("[data-header-intro]"),
    );
    const headerLinks = headerLabels.map((label) => label.parentElement);

    // Hidden state before first paint. Each layer starts as a ~1px line.
    gsap.set(logo, { yPercent: -105 });
    // Mask flush with each label's top edge inside its link (labels come from
    // above; links can be taller than their label, e.g. the 60px Home link),
    // extended below and at the sides.
    headerLinks.forEach((link, index) =>
      gsap.set(link, {
        clipPath: `inset(${headerLabels[index].offsetTop}px -0.2em -0.2em -0.2em)`,
      }),
    );
    gsap.set(headerLabels, { yPercent: -110 });
    // Only the visible artwork (desktop or compact) has measurable rows.
    const artworkIntro = prepareArtworkIntro(root);
    // Settled: drop leftover transforms so everything renders exactly as
    // static (the logo path and the layers have no transforms of their own).
    const settle = () => {
      gsap.set([logo, ...headerLabels], { clearProps: "transform,opacity" });
      artworkIntro.settle();
      gsap.set(headerLinks, { clearProps: "clipPath" });
    };
    const timeline = gsap
      .timeline({ onComplete: settle })
      .to(logo, { yPercent: 0, ...tween(INTRO.logo) }, INTRO.logo.at)
      .to(
        headerLabels,
        {
          yPercent: 0,
          ...tween(INTRO.header),
          onComplete: () => gsap.set(headerLinks, { clearProps: "clipPath" }),
        },
        INTRO.header.at,
      );
    addArtworkIntro(timeline, artworkIntro, INTRO.artwork);

    return () => {
      timeline.kill();
      settle();
    };
  }, [rootRef, enabled]);
}

export function HeroSection({ reveal = true }) {
  const rootRef = useRef(null);
  useHeroIntro(rootRef, reveal);

  return (
    <div ref={rootRef} className={styles["hero"]} data-name="hero">
      <BrandLogo />
      <div className={styles["hero__node-001"]}>
        <RevealText
          as="a"
          className={styles["submit-work-link"]}
          href="/submit"
          enabled={reveal}
          {...firstScreen}
        >
          Submit Work (→)
        </RevealText>
        <RevealText
          as="a"
          className={styles["explore-themes-link"]}
          data-explore-themes
          href="#ownership"
          enabled={reveal}
          {...firstScreen}
        >
          (↓) Explore Themes
        </RevealText>
      </div>
      <div className={styles["intro"]}>
        <RevealText
          as="h2"
          className={styles["intro__title"]}
          enabled={reveal}
          {...firstScreen}
        >
          The World Isn’t Inevitable
        </RevealText>
        <RevealText as="p" enabled={reveal} {...firstScreen}>
          Everything around us was designed by someone. The systems. The
          platforms. The institutions. The incentives. The habits. They were
          built. Which means they can be questioned.
        </RevealText>
      </div>
      <div className={styles["content"]}>
        <RevealText as="p" className={styles["text"]} enabled={reveal}>
          Everything around us was designed by someone. The systems, platforms,
          institutions, incentives, and habits that shape our lives were all
          built through human choices.
        </RevealText>
        <RevealText as="p" className={styles["text"]} enabled={reveal}>
          And what has been built can be questioned and challenged. We don't
          have to accept the world as it is. We have the power to imagine
          something different.
        </RevealText>
      </div>
      <HeroArtwork compactArtwork />
    </div>
  );
}
