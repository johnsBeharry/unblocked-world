import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from './SubmissionSuccessPanel.module.scss'
import { RevealText } from '../../../../../components/RevealText/RevealText.jsx'

// Nested hearts, innermost first. Motion (user request 2026-11-17, "settle
// like a pulse, centre → out, not too intense"): the hearts settle in from
// the centre outward (fade + 0.92 → 1 scale, expo-out, 0.06s apart), then a
// soft pulse keeps travelling outward: each heart dims to 55% and swells 2%
// in turn, every ~3.2s. Scale origin = the inner heart's centre.
const PATTERN_ORIGIN = '94 95'
const SETTLE = { duration: 1.1, each: 0.06, ease: 'expo.out', from: 0.92 }
const PULSE = { each: 0.08, half: 0.55, opacity: 0.55, scale: 1.02, pause: 1.6 }

function useSuccessPulse(ref) {
  useLayoutEffect(() => {
    const paths = ref.current?.querySelectorAll('[data-success-heart]')
    if (!paths?.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const ctx = gsap.context(() => {
      gsap.set(paths, { svgOrigin: PATTERN_ORIGIN })
      const intro = gsap.timeline({ delay: 0.3 })
      intro.fromTo(paths, { opacity: 0, scale: SETTLE.from }, { opacity: 1, scale: 1, duration: SETTLE.duration, ease: SETTLE.ease, stagger: SETTLE.each })
      const pulse = gsap.timeline({ repeat: -1, repeatDelay: PULSE.pause, paused: true })
      pulse
        .to(paths, { opacity: PULSE.opacity, scale: PULSE.scale, duration: PULSE.half, ease: 'sine.inOut', stagger: PULSE.each })
        .to(paths, { opacity: 1, scale: 1, duration: PULSE.half * 1.4, ease: 'sine.inOut', stagger: PULSE.each }, PULSE.half)
      intro.call(() => pulse.play(), null, '-=0.4')
    }, ref)
    return () => ctx.revert()
  }, [ref])
}

function SuccessPattern() {
  const ref = useRef(null)
  useSuccessPulse(ref)
  return (
    <svg ref={ref} className={styles['submission-success__pattern']} viewBox="0 0 187 187" aria-hidden="true">
      <g clipPath="url(#success-clip)">
        <path data-success-heart d="M137.2 70.6464 79.3557 128.492 51.2637 100.399l8.0136-8.0139 20.0784 20.0779 49.8303-49.8302 8.0139 8.0136Z" />
        <path data-success-heart d="m149.222 70.6527-69.866 69.8673-40.1138-40.115 20.0355-20.0355 20.0784 20.0795 49.8303-49.8318 20.0356 20.0355Z" />
        <path data-success-heart d="m161.246 70.651-81.8877 81.889-52.1356-52.1376 32.0573-32.0574 20.0783 20.0784 49.8307-49.8306 32.057 32.0572Z" />
        <path data-success-heart d="m173.27 70.6573-93.9094 93.9107-64.1575-64.1581 44.0792-44.0795 20.0783 20.0797 49.8304-49.832 44.079 44.0792Z" />
        <path data-success-heart d="m185.291 70.6557-105.932 105.933-76.1793-76.1803 56.1009-56.101 20.0784 20.0783 49.8309-49.8306 56.1011 56.1006Z" />
        <path data-success-heart d="m197.315 70.654-117.9537 117.955-88.2011-88.203 68.1228-68.1235 20.0783 20.0798 49.8307-49.832 68.123 68.1237Z" />
        <path data-success-heart d="m209.339 70.6524-129.9754 129.9766-100.223  -100.224 80.1447-80.1449 20.0783 20.0783 49.8304-49.8306 80.1449 80.145Z" />
        <path data-success-heart d="m221.361 70.6586-141.997 141.9984-112.2449-112.246 92.1665-92.1665 20.0784 20.0798 49.8306-49.8319 92.1664 92.1662Z" />
        <path data-success-heart d="m233.385 70.657-154.0187 154.02-124.2667-124.268 104.1883-104.1879 20.0784 20.0784 49.8303-49.8306 104.1884 104.1881Z" />
        <path data-success-heart d="m245.409 70.6633-166.0404 166.0417-136.288  -136.289 116.2096-116.2106 20.0784 20.0798 49.8304-49.832 116.21 116.2101Z" />
        <path data-success-heart d="m257.43 70.6616-178.063 178.0644-148.309-148.312 128.231-128.232 20.078 20.0783 49.831-49.8306 128.232 128.232Z" />
        <path data-success-heart d="m269.454 70.6678-190.0848 190.0862-160.3311-160.334 140.2527-140.2537 20.0784 20.0798 49.8308-49.832 140.254 140.2537Z" />
        <path data-success-heart d="m281.478 70.6663-202.1064 202.1077-172.3539-172.3556 152.2755-152.2765 20.0784 20.0784 49.8304-49.8307 152.276 152.2767Z" />
        <path data-success-heart d="m293.5 70.6646-214.1281 214.1294-184.3759-184.3776 164.2976-164.2985 20.0783 20.0797 49.8309-49.832 164.2972 164.299Z" />
      </g>
      <defs>
        <clipPath id="success-clip"><rect width="187" height="187" /></clipPath>
      </defs>
    </svg>
  )
}

// Thank-you screen (user reference 2026-11-17): pattern, title, message and
// "Explore More (→)" back to the site.
export function SubmissionSuccessPanel() {
  return (
    <section className={styles['submission-success']} aria-labelledby="submission-success-title">
      <div className={styles['submission-success__inner']}>
        <SuccessPattern />
        <RevealText as="h1" id="submission-success-title" className={styles['submission-success__title']}>Entry Submitted</RevealText>
        <RevealText as="p" className={styles['submission-success__copy']}>Thank you for your submission. Your work has been received and is now under review. We'll keep you informed of any updates as the selection process progresses.</RevealText>
        <a className={styles['submission-success__explore']} href="/">Explore More (→)</a>
      </div>
    </section>
  )
}
