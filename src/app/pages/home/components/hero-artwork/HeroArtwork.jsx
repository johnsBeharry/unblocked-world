import React from "react";
import { gsap } from "gsap";
import heroStyles from "../hero/HeroSection.module.scss";
import styles from "./HeroArtwork.module.scss";

const ARTWORK_PARALLAX_FACTOR = 0.12;

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
  return <div className={styles.tabletArt} data-hero-artwork="tablet"><HeroDesktopArtwork /></div>;
}

export function HeroArtwork() {
  React.useEffect(() => {
    const artworkWrappers = Array.from(document.querySelectorAll('[data-hero-artwork]'))
    const groups = Array.from(document.querySelectorAll('[data-hero-artwork] [data-artwork-motif]'))
    if (!artworkWrappers.length || !groups.length) return undefined

    let frame = 0
    const updateLayerScale = () => {
      frame = 0
      if (document.body.dataset.pagePhase !== 'content') return

      gsap.set(artworkWrappers, { y: window.scrollY * ARTWORK_PARALLAX_FACTOR })
      gsap.killTweensOf(groups)
      gsap.set(groups, { scaleY: 1 })
      const startDistance = window.innerHeight * 0.1
      const scales = groups.map((group) => {
        const rect = group.getBoundingClientRect()
        const scaleY = startDistance > 0
          ? Math.min(1, Math.max(0, rect.top / startDistance))
          : 1

        return { group, scaleY }
      })

      scales.forEach(({ group, scaleY }) => {
        gsap.set(group, { scaleY })
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateLayerScale)
    }
    const onResize = () => updateLayerScale()
    const phaseObserver = new MutationObserver(updateLayerScale)

    phaseObserver.observe(document.body, { attributes: true, attributeFilter: ['data-page-phase'] })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    updateLayerScale()

    return () => {
      phaseObserver.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div className={styles.desktopArt} data-hero-artwork="desktop" aria-hidden="true">
        <HeroDesktopArtwork />
      </div>
      <TabletArtwork />
      <p className={heroStyles["hero__node-202"]} data-page-logo="hero">UNBLOCKED</p>
    </>
  );
}
