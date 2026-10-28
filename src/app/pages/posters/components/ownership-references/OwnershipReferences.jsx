import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './OwnershipReferences.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

const POSTER_PROFILES = [
  { speed: 0.24 },
  { speed: 0.34 },
  { speed: 0.46 },
  { speed: 0.58 },
]

const MOUSE_DEPTH = [0.35, 0.55, 0.8, 1]
const MAX_MOUSE_SCALE = 1.2

const references = [
  {
    name: 'A4 - 1',
    imageName: 'image 54',
    src: '/UNBLOCKED-poster_files/ff2033a1c38a4357386d641377703903abf0cb51.ff2033a1.png',
  },
  {
    name: 'A4 - 3',
    imageName: 'image 56',
    src: '/UNBLOCKED-poster_files/e353c20b9b160ceed44fa9f8dfbd71844bc63f36.e353c20b.png',
  },
  {
    name: 'A4 - 2',
    imageName: 'image 55',
    src: '/UNBLOCKED-poster_files/ace3413e5a82a9d017f82762129b9755a0ff0588.ace3413e.png',
  },
  {
    name: 'A4 - 4',
    imageName: 'image 57',
    src: '/UNBLOCKED-poster_files/49a99c5012c102d9fd4cf34cc5a1f852cdfb92ed.49a99c50.png',
  },
]

export function OwnershipReferences() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const posters = Array.from(section.querySelectorAll('[data-reference-poster]'))
    const mouseX = posters.map((poster) => gsap.quickTo(poster, 'x', {
      duration: 0.45,
      ease: 'power3.out',
    }))
    const mouseScale = posters.map((poster) => gsap.quickTo(poster, 'scale', {
      duration: 0.5,
      ease: 'power3.out',
    }))
    let posterProfiles = []
    let frame

    const handlePointerMove = (event) => {
      const rect = section.getBoundingClientRect()
      const insideSection = event.clientX >= rect.left
        && event.clientX <= rect.right
        && event.clientY >= rect.top
        && event.clientY <= rect.bottom

      if (!insideSection) {
        resetPointer()
        return
      }

      const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
      posters.forEach((poster, index) => {
        const posterRect = poster.getBoundingClientRect()
        const centerX = posterRect.left + posterRect.width / 2
        const centerY = posterRect.top + posterRect.height / 2
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY)
        const influenceRadius = Math.max(posterRect.width, posterRect.height) * 1.2
        const proximity = Math.max(0, Math.min(1, 1 - distance / influenceRadius))
        const depth = MOUSE_DEPTH[index % MOUSE_DEPTH.length]
        const movement = 0.35 + proximity * 0.65
        mouseX[index](normalizedX * 8 * depth * movement)
        mouseScale[index](1 + (MAX_MOUSE_SCALE - 1) * proximity)
      })
    }

    const resetPointer = () => {
      posters.forEach((poster, index) => {
        mouseX[index](0)
        mouseScale[index](1)
      })
    }

    const measureProfiles = () => {
      posterProfiles = posters.map((poster, index) => ({
        poster,
        profile: POSTER_PROFILES[index % POSTER_PROFILES.length],
      }))
    }

    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const top = section.getBoundingClientRect().top
        posterProfiles.forEach(({ poster, profile }) => {
          gsap.set(poster, { y: top * profile.speed })
        })
      })
    }

    const handleResize = () => {
      measureProfiles()
      update()
    }

    measureProfiles()
    update()
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className={styles.references} data-name="references" aria-label="Creative references">
      <div className={styles.heading}>
        <RevealText as="p">Sec.03</RevealText>
        <RevealText as="p">(References)</RevealText>
      </div>

      {references.map((reference, index) => (
        <div
          className={`${styles.poster} ${styles[`poster${index + 1}`]}`}
          data-name={reference.name}
          data-reference-poster
          key={reference.name}
        >
          <div className={`${styles.imageFrame} ${styles[`imageFrame${index + 1}`]}`} data-name={reference.imageName}>
            <img src={reference.src} alt={`Creative reference poster ${index + 1}`} />
          </div>
        </div>
      ))}

      <RevealText as="p" className={styles.description}>
        These references are provided as creative inspiration rather than stylistic direction.
      </RevealText>
    </section>
  )
}
