import React from "react";
import styles from "./HeroSection.module.scss";
import { HeroArtwork } from "../hero-artwork/HeroArtwork.jsx";

export function HeroSection() {
  return (
    <div className={styles["hero"]} data-name="hero">
      <div className={styles["hero__node-001"]}>
        <a className={styles["hero__node-002"]} href="/submit">
          Submit Work (→)
        </a>
        <a className={styles["hero__node-003"]} href="#ownership">
          (↓) Explore Themes
        </a>
      </div>
      <p className={styles["hero__node-004"]}>
        Everything around us was designed by someone. The systems. The
        platforms. The institutions. The incentives. The habits. They were
        built. Which means they can be questioned.
      </p>
      <p className={styles["hero__node-005"]}>The World Isn’t Inevitable</p>
      <HeroArtwork />
    </div>
  );
}
