import React from "react";
import styles from "./HeroSection.module.scss";
import { HeroArtwork } from "../hero-artwork/HeroArtwork.jsx";
import { RevealText } from "../../../../../components/RevealText/RevealText.jsx";

export function HeroSection({ reveal = true }) {
  return (
    <div className={styles["hero"]} data-name="hero">
      <div className={styles["hero__node-001"]}>
        <RevealText as="a" className={styles["hero__node-002"]} href="/submit" enabled={reveal}>
          Submit Work (→)
        </RevealText>
        <RevealText as="a" className={styles["hero__node-003"]} href="#ownership" enabled={reveal}>
          (↓) Explore Themes
        </RevealText>
      </div>
      <RevealText as="p" className={styles["hero__node-004"]} enabled={reveal}>
        Everything around us was designed by someone. The systems. The
        platforms. The institutions. The incentives. The habits. They were
        built. Which means they can be questioned.
      </RevealText>
      <RevealText as="p" className={styles["hero__node-005"]} enabled={reveal}>
        The World Isn’t Inevitable
      </RevealText>
      <HeroArtwork />
    </div>
  );
}
