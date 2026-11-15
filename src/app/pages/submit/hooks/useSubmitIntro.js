import { useLayoutEffect, useState } from 'react'
import { gsap } from 'gsap'

// Two-column layout only (matches the SCSS tablet-portrait/mobile breakpoints,
// where the pink column is not shown).
const STACKED_QUERY = '(max-width: 600px), (max-width: 864px) and (orientation: portrait)'
const PANEL_DURATION = 1
const TEXT_START = 0.75 // text starts while the panel settles
const PANEL_EASE = 'power2.inOut'
const ART_AT_DISTANCE = 0.8 // artwork starts when the panel is 80% of the way in

// Time (0–1) at which an ease reaches `progress`, read from GSAP's own curve
// (power2.inOut is cubic, so 80% of the distance is ~63% of the time).
function timeAtProgress(ease, progress) {
  const curve = gsap.parseEase(ease)
  let low = 0
  let high = 1
  for (let step = 0; step < 24; step += 1) {
    const mid = (low + high) / 2
    if (curve(mid) < progress) low = mid
    else high = mid
  }
  return high
}
const ART_START = timeAtProgress(PANEL_EASE, ART_AT_DISTANCE)

// Page entry: the page arrives fully pink (same colour as the page curtain),
// the black column slides in from the right, then the content text reveals.
// Text reveals are gated by body[data-page-phase="content"], so the phase is
// held at "loading" until the panel is nearly in place.
// `artIntroRef` holds the artwork's paused timeline (created by the child
// before this effect runs); the panel timeline plays it in the same frame, so
// React re-render latency never delays the hand-off. Returns `pending` while
// the panel intro runs.
export function useSubmitIntro(contentRef, artIntroRef) {
  const [pending, setPending] = useState(() =>
    !window.matchMedia(STACKED_QUERY).matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useLayoutEffect(() => {
    const content = contentRef.current
    if (!pending || !content) {
      artIntroRef.current?.play()
      return undefined
    }

    document.body.dataset.pagePhase = 'loading'
    const timeline = gsap.timeline({ onComplete: () => setPending(false) })
      .fromTo(content, { clipPath: 'inset(0% 0% 0% 100%)' }, {
        clipPath: 'inset(0% 0% 0% 0%)', duration: PANEL_DURATION, ease: PANEL_EASE,
      })
      .call(() => { document.body.dataset.pagePhase = 'content' }, null, PANEL_DURATION * TEXT_START)
      .call(() => artIntroRef.current?.play(), null, PANEL_DURATION * ART_START)

    return () => {
      timeline.kill()
      gsap.set(content, { clearProps: 'clipPath' })
      document.body.dataset.pagePhase = 'content'
    }
    // Runs once on mount; `pending` only goes true → false.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return pending
}
