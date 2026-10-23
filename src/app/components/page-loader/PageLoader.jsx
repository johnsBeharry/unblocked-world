import React from 'react'
import { gsap } from 'gsap'
import styles from './PageLoader.module.scss'

const REVEAL_EASE = 'power2.inOut'
const LAYER_DURATION = 1.5
const GROUP_STAGGER = 0.06

function getArtworkGroups() {
  const groups = Array.from(document.querySelectorAll('[data-hero-artwork] [data-artwork-motif]'))
  const grouped = new Map()

  groups.forEach((group) => {
    const index = Number(group.dataset.artworkMotif)
    const matchingGroups = grouped.get(index) ?? []
    matchingGroups.push(group)
    grouped.set(index, matchingGroups)
  })

  return grouped
}

function getLayerByDepth(groups, depth) {
  return groups.flatMap((group) => {
    const layers = Array.from(group.querySelectorAll('[data-artwork-layer]'))
    return layers[layers.length - 1 - depth] ?? []
  })
}

function getGroupSteps(groupIndexes, centerIndex) {
  const steps = [[centerIndex]]

  for (let offset = 1; offset < groupIndexes.length; offset += 1) {
    const above = centerIndex - offset
    const below = centerIndex + offset
    const step = []

    if (groupIndexes.includes(above)) step.push(above)
    if (groupIndexes.includes(below)) step.push(below)
    if (step.length) steps.push(step)
  }

  return steps
}

function getGroupScaleX(groupIndex, centerIndex) {
  const distance = Math.abs(groupIndex - centerIndex)
  return Math.max(0.2, 0.8 - distance * 0.1)
}

export function PageLoader({ duration = 2000 }) {
  const [loading, setLoading] = React.useState(true)

  React.useLayoutEffect(() => {
    const artworkGroups = getArtworkGroups()
    const allLayers = Array.from(document.querySelectorAll('[data-hero-artwork] [data-artwork-layer]'))
    const groupIndexes = [...artworkGroups.keys()].sort((a, b) => a - b)
    const centerIndex = groupIndexes[Math.floor((groupIndexes.length - 1) / 2)]
    const centerGroups = artworkGroups.get(centerIndex) ?? []
    const loaderLayer = getLayerByDepth(centerGroups, 0)
    const allGroups = [...artworkGroups.values()].flat()

    gsap.set(allLayers, { opacity: 1, scaleX: 1, scaleY: 0, transformOrigin: 'center center' })
    allGroups.forEach((group) => {
      const groupIndex = Number(group.dataset.artworkMotif)
      gsap.set(group, {
        scaleX: getGroupScaleX(groupIndex, centerIndex),
        transformOrigin: 'center center',
      })
    })
    gsap.set(loaderLayer, { scaleX: 0, scaleY: 0.25 })
    const loaderTween = gsap.to(loaderLayer, {
      scaleX: 1,
      duration: duration / 1000,
      ease: 'power2.inOut',
    })
    document.body.dataset.pagePhase = 'loading'

    return () => {
      loaderTween.kill()
      delete document.body.dataset.pagePhase
    }
  }, [duration])

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let cancelled = false
    const finishLoader = async () => {
      await new Promise((resolve) => window.setTimeout(resolve, duration))
      if (!cancelled) {
        document.body.style.overflow = previousOverflow
        setLoading(false)
      }
    }

    finishLoader()

    return () => {
      cancelled = true
      document.body.style.overflow = previousOverflow
      delete document.body.dataset.pagePhase
    }
  }, [duration])

  React.useLayoutEffect(() => {
    if (loading) return undefined

    document.body.dataset.pagePhase = 'artwork'

    const artworkGroups = getArtworkGroups()
    const groupIndexes = [...artworkGroups.keys()].sort((a, b) => a - b)
    const centerIndex = groupIndexes[Math.floor((groupIndexes.length - 1) / 2)]
    const groupSteps = getGroupSteps(groupIndexes, centerIndex)

    const timeline = gsap.timeline({
      paused: true,
    })

    groupSteps.forEach((groupStep, stepIndex) => {
      groupStep.forEach((groupIndex) => {
        const groups = artworkGroups.get(groupIndex) ?? []
        const firstDepth = 0

        timeline.to(
          groups,
          { scaleX: 1, duration: LAYER_DURATION, ease: REVEAL_EASE },
          stepIndex * GROUP_STAGGER,
        )

        for (let depth = firstDepth; depth < 3; depth += 1) {
          const layerGroup = getLayerByDepth(groups, depth)
          if (!layerGroup.length) continue

          timeline.to(
            layerGroup,
            { scaleX: 1, scaleY: 1, duration: LAYER_DURATION, ease: REVEAL_EASE },
            stepIndex * GROUP_STAGGER + (depth - firstDepth) * 0.1,
          )
        }
      })
    })

    const lineTargets = Array.from(document.querySelectorAll('[data-page-reveal-line-inner]'))
    const logoTargets = Array.from(document.querySelectorAll('[data-page-logo]'))
    const textTargets = Array.from(document.querySelectorAll('header *, #container *'))
      .filter((element) => (
        element.children.length === 0
        && element.textContent.trim()
        && !element.closest('[data-page-reveal-line-inner]')
        && !element.matches('[data-page-logo], [data-page-static]')
      ))
    const contentTargets = [...lineTargets, ...logoTargets, ...textTargets]

    gsap.set(lineTargets, { opacity: 0 })
    gsap.set(logoTargets, { opacity: 0, yPercent: 12 })
    gsap.set(textTargets, { opacity: 0, y: 16 })

    const revealContent = () => {
      document.body.dataset.pagePhase = 'content'
      gsap.to(logoTargets, {
        opacity: 1,
        yPercent: 0,
        duration: 2,
        ease: 'power4.inOut',
      })
      gsap.to(lineTargets, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.03,
      })
      gsap.to(textTargets, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.03,
      })
    }

    timeline.eventCallback('onComplete', revealContent)

    timeline.play(0)

    return () => {
      timeline.eventCallback('onComplete', null)
      timeline.kill()
      gsap.killTweensOf(contentTargets)
    }
  }, [loading])

  return (
    <div className={styles.loader} role="status" aria-label="Loading">
    </div>
  )
}
