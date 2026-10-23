import React from "react";
import heroStyles from "../hero/HeroSection.module.scss";
import styles from "./HeroArtwork.module.scss";

const HERO_ARTWORK_MOTIFS = [
  {
    layers: [...Array(24).keys()].map(() => [0, 0, 0, 0]),
  },
];

function HeroDesktopArtwork() {
  return (
    <div
      className={`${styles.artwork} ${styles.desktopArtLayer}`}
      aria-hidden="true"
    >
      {Array.from({ length: 24 }, (_, motifIndex) => (
        <div
          key={motifIndex}
          className={styles.motif}
          data-artwork-motif={motifIndex}
        >
          {Array.from({ length: 3 }, (_, layerIndex) => (
            <div
              key={layerIndex}
              className={styles.layer}
              data-artwork-layer={`${motifIndex}-${layerIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
function TabletArtwork() {
  return <div className={styles.tabletArt}><HeroDesktopArtwork /></div>;
}

export function HeroArtwork() {
  return (
    <>
      <div className={styles.desktopArt} aria-hidden="true">
        <HeroDesktopArtwork />
      </div>
      <TabletArtwork />
      <p className={heroStyles["hero__node-202"]}>UNBLOCKED</p>
    </>
  );
}
