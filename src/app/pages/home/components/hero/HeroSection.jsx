import React from "react";
import styles from "./HeroSection.module.scss";
import { HeroArtwork } from "../hero-artwork/HeroArtwork.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";
import { BrandLogo } from "../../../../components/logo/index.jsx";

export function HeroSection({ reveal = true }) {
  return (
    <div className={styles["hero"]} data-name="hero">
      <BrandLogo />
      <div className={styles["hero__node-001"]}>
        <RevealText
          as="a"
          className={styles["submit-work-link"]}
          href="/submit"
          enabled={reveal}
        >
          Submit Work (→)
        </RevealText>
        <RevealText
          as="a"
          className={styles["explore-themes-link"]}
          data-explore-themes
          href="#ownership"
          enabled={reveal}
        >
          (↓) Explore Themes
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
      <HeroArtwork />
    </div>
  );
}
