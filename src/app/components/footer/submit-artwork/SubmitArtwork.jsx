import React from 'react'
import { gsap } from 'gsap'
import { ARTWORK_MOTIFS } from './SubmitArtwork.geometry.js'
import styles from './SubmitArtwork.module.scss'

const REVEAL_START_GROUP = 1
const GROUP_SLIDE_DISTANCE = 64

function toCanvasPixels(value) {
  return `${value}px`
}

function SubmitArtworkMotif({ motif, motifIndex }) {
  return (
    <div
      className={styles.motif}
      data-artwork-motif={motifIndex}
      style={{
        left: toCanvasPixels(motif.x),
        top: toCanvasPixels(motif.y),
        width: toCanvasPixels(motif.width),
        height: toCanvasPixels(motif.height),
      }}
    >
      {motif.layers.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          className={styles.layer}
          data-artwork-layer={`${motifIndex}-${layerIndex}`}
          style={{
            left: toCanvasPixels(layer.x - motif.x),
            top: toCanvasPixels(layer.centerY - motif.y - (layer.height / 2)),
            width: toCanvasPixels(layer.width),
            height: toCanvasPixels(layer.height),
          }}
        />
      ))}
    </div>
  )
}

function SubmitArtworkCanvas({ artworkRef, artworkClassName }) {
  return (
    <div ref={artworkRef} className={artworkClassName} aria-hidden="true">
      {Array.from({ length: ARTWORK_MOTIFS.length }, (_, motifIndex) => (
        <SubmitArtworkMotif
          key={motifIndex}
          motif={ARTWORK_MOTIFS[motifIndex]}
          motifIndex={motifIndex}
        />
      ))}
    </div>
  )
}

export function SubmitArtwork({ className = '', animate = false }) {
  const artworkRef = React.useRef(null)
  const artworkClassName = [styles.artwork, className].filter(Boolean).join(' ')

  React.useLayoutEffect(() => {
    if (!animate || !artworkRef.current) return undefined

    const artwork = artworkRef.current
    const groups = Array.from(artwork.querySelectorAll('[data-artwork-motif]'))
    const allLayers = Array.from(artwork.querySelectorAll('[data-artwork-layer]'))

    gsap.set(allLayers, { opacity: 1, scaleY: 1, transformOrigin: 'center center' })
    gsap.set(groups, { y: GROUP_SLIDE_DISTANCE, scaleY: 0, opacity: 0, transformOrigin: 'center center' })

    let frame = 0
    const updateReveal = () => {
      frame = 0

      // Measure neutral geometry first so transforms cannot feed back into the scroll math.
      gsap.set(groups, { y: 0, scaleY: 1, opacity: 1 })
      gsap.set(allLayers, { scaleY: 1 })

      const startLine = window.innerHeight * REVEAL_START_GROUP
      const revealDistance = Math.max(1, window.innerHeight * 0.1)

      groups.forEach((group) => {
        const groupRect = group.getBoundingClientRect()
        const groupProgress = gsap.utils.clamp(0, 1, (startLine - groupRect.top) / revealDistance)
        gsap.set(group, {
          y: GROUP_SLIDE_DISTANCE * (1 - groupProgress),
          scaleY: groupProgress,
          opacity: groupProgress,
        })
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateReveal)
    }
    const onResize = () => updateReveal()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    updateReveal()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      if (frame) cancelAnimationFrame(frame)
      gsap.killTweensOf([...groups, ...allLayers])
    }
  }, [animate])

  return <SubmitArtworkCanvas artworkRef={artworkRef} artworkClassName={artworkClassName} />
}
