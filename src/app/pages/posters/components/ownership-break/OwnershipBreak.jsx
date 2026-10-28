import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './OwnershipBreak.module.scss'

const MAIN_BACKGROUND = '#dc91a8'
const SECOND_LAYER_START = 0.5
const SECOND_LAYER_END = 0.75
const THIRD_LAYER_START = SECOND_LAYER_END
const LAYERS = [
  ['layerOne', '#865b68'],
  ['layerTwo', '#ab7284'],
  ['layerThree', '#865b68'],
  ['layerFour', '#ab7284'],
  ['layerFive', MAIN_BACKGROUND],
]

export function OwnershipBreak() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const layers = Array.from(section.querySelectorAll('[data-ownership-break-layer]'))
    const centerLayer = layers[layers.length - 1]
    let frame
    let timeline

    const createTimeline = () => {
      timeline?.kill()
      const centerRect = centerLayer.getBoundingClientRect()
      const centerX = centerRect.left + centerRect.width / 2
      timeline = gsap.timeline({ paused: true })

      const addPair = (pair, start, end) => {
        pair.forEach(layer => {
          const letter = layer.querySelector('[data-ownership-break-letter]')
          if (!letter) return
          const layerRect = layer.getBoundingClientRect()
          const layerX = layerRect.left + layerRect.width / 2
          timeline.fromTo(letter, { x: centerX - layerX }, { x: 0, duration: end - start, ease: 'none' }, start)
        })
      }

      const centerLetter = centerLayer.querySelector('[data-ownership-break-letter]')
      timeline.fromTo(centerLetter, { scale: 0.8 }, { scale: 1, duration: 1, ease: 'none' }, 0)
      addPair([layers[3], layers[1]], 0, 1)
      addPair([layers[2], layers[0]], 0, 1)

      timeline.fromTo([layers[3], layers[1]], { backgroundColor: MAIN_BACKGROUND }, { backgroundColor: '#ab7284', duration: SECOND_LAYER_END - SECOND_LAYER_START, ease: 'none' }, SECOND_LAYER_START)
      timeline.fromTo([layers[2], layers[0]], { backgroundColor: MAIN_BACKGROUND }, { backgroundColor: '#ab7284', duration: SECOND_LAYER_END - SECOND_LAYER_START, ease: 'none' }, SECOND_LAYER_START)
      timeline.to([layers[2], layers[0]], { backgroundColor: '#865b68', duration: 1 - THIRD_LAYER_START, ease: 'none' }, THIRD_LAYER_START)
      timeline.set(centerLayer, { backgroundColor: MAIN_BACKGROUND }, 0)
    }

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect()
        const start = window.innerHeight * 0.8
        const end = 0
        const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)))
        timeline.progress(progress)
      })
    }

    createTimeline()
    update()
    window.addEventListener('scroll', update, { passive: true })
    const handleResize = () => {
      createTimeline()
      update()
    }
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', handleResize)
      timeline?.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.breakSection} data-name="break" aria-label="Ownership break">
      {LAYERS.map(([layerName, originalBackground]) => (
        <div
          className={`${styles.layer} ${styles[layerName]}`}
          data-ownership-break-layer
          data-original-background={originalBackground}
          key={layerName}
        >
          <p className={styles.letter} data-ownership-break-letter>O</p>
        </div>
      ))}
      <div className={styles.mobileArt} aria-hidden="true">
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentFarLeft}`} />
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentLeft}`} />
        <div className={styles.mobileRing}>O</div>
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentRight}`} />
        <div className={`${styles.mobileCrescent} ${styles.mobileCrescentFarRight}`} />
      </div>
    </section>
  )
}
