import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from './OwnershipJury.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

const DEFAULT_PHOTO = '/UNBLOCKED-poster_files/d356dbbf2d02f78c903bcc39b1a7ff95ac05d5a7.d356dbbf.png'

const JURY_MEMBERS = [
  'Kyle Fletcher',
  'Johns Beharry',
  'Lewis Webber',
  'Liam Hartwell',
  'Caleb Winters',
  'Ava Sinclair',
]

const MOBILE_JURY_CARDS = [0, 1, 2, 3]
export function OwnershipJury({ photoSrc = DEFAULT_PHOTO }) {
  const memberListRef = useRef(null)
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    const memberList = memberListRef.current
    if (!memberList) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    )

    observer.observe(memberList)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasEntered || !memberListRef.current) return undefined

    const masks = Array.from(memberListRef.current.querySelectorAll('[data-jury-mask]'))
    const rows = Array.from(memberListRef.current.querySelectorAll('[data-jury-row]'))
    const textRows = Array.from(memberListRef.current.querySelectorAll('[data-jury-text]'))
    const inactiveRows = rows.slice(1)
    if (!masks.length) return undefined

    gsap.set(rows, { opacity: 1 })
    memberListRef.current.classList.add(styles.revealing)
    const timeline = gsap.timeline()

    timeline.fromTo(
      masks,
      { scaleY: 1 },
      { scaleY: 0, duration: 0.5, ease: 'power2.inOut', stagger: 0.12 },
    )
    timeline.to(inactiveRows, {
      '--jury-border-color': 'rgba(220, 145, 168, 0.35)',
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.06,
      onComplete: () => {
        memberListRef.current?.classList.remove(styles.revealing)
        memberListRef.current?.classList.add(styles.complete)
      },
    }, '+=0')
    timeline.to(textRows, {
      opacity: 0.5,
      color: '#dc91a8',
      duration: 0.45,
      ease: 'power2.out',
      stagger: 0.06,
    }, '<')
    timeline.to(rows, {
      '--jury-highlight-scale': 0,
      duration: 0.5,
      ease: 'power2.out',
    }, '<')

    const hoverCleanups = rows.map((row, index) => {
      const text = textRows[index]
      const handleEnter = () => {
        row.classList.add(styles.hovered)
        gsap.set(row, { opacity: 1 })
        gsap.to(textRows, { opacity: 0.5, color: '#dc91a8', duration: 0.5, ease: 'power2.out', overwrite: true })
        gsap.to(text, { opacity: 1, color: '#dc91a8', duration: 0.5, ease: 'power2.out', overwrite: true })
        gsap.to(row, { '--jury-highlight-scale': 1, duration: 0.5, ease: 'power2.out', overwrite: true })
      }
      const handleLeave = () => {
        row.classList.remove(styles.hovered)
        gsap.set(row, { opacity: 1 })
        gsap.to(textRows, {
          opacity: 0.5,
          color: '#dc91a8',
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true,
        })
        gsap.to(row, { '--jury-highlight-scale': 0, duration: 0.5, ease: 'power2.out', overwrite: true })
      }

      row.addEventListener('pointerenter', handleEnter)
      row.addEventListener('pointerleave', handleLeave)
      return () => {
        row.removeEventListener('pointerenter', handleEnter)
        row.removeEventListener('pointerleave', handleLeave)
      }
    })

    return () => {
      timeline.kill()
      hoverCleanups.forEach((cleanup) => cleanup())
      memberListRef.current?.classList.remove(styles.revealing)
    }
  }, [hasEntered])

  return (
    <section className={styles.section} data-name="jury" aria-label="Jury Members">
      <div className={styles.label}>
        <RevealText as="p">Sec. 05 (Jury Members)</RevealText>
      </div>

      <div className={styles.imageFrame}>
        <div className={styles.imageLayer} data-name="image 40">
          <img src={photoSrc} alt="Jury member portrait" />
        </div>
      </div>

      <div
        ref={memberListRef}
        className={styles.memberList}
      >
        {JURY_MEMBERS.map((member, index) => (
          <p
            className={index === 0 ? styles.memberActive : styles.member}
            key={member}
            data-jury-row
            style={{ '--line-delay': `${index * 0.08}s` }}
          >
            <RevealText as="span" className={styles.memberText} data-jury-text enabled={false}>
              {member}
            </RevealText>
            <span className={styles.memberMask} data-jury-mask aria-hidden="true" />
          </p>
        ))}
      </div>

      <RevealText as="p" className={styles.description}>
        Head of Brand Creative at Cash App, with experience shaping cultural work across music, identity, and visual systems.
      </RevealText>

      <div className={styles.mobileCards} aria-hidden="true">
        {MOBILE_JURY_CARDS.map((card) => (
          <article className={styles.mobileCard} key={card}>
            <div className={styles.mobileImageFrame}>
              <img src={photoSrc} alt="" />
            </div>
            <RevealText as="h2">Kyle Fletcher</RevealText>
            <RevealText as="p">Head of Brand Creative at Cash App, with experience shaping cultural work across music, identity, and visual systems.</RevealText>
          </article>
        ))}
      </div>
    </section>
  )
}
