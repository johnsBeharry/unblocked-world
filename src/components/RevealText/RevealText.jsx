import React, { useEffect, useRef, useState } from 'react'
import styles from './RevealText.module.scss'

function getWords(value) {
  return value.split(/\n/).flatMap((line, lineIndex, lines) => {
    const words = [...line.matchAll(/(\S+)(\s*)/g)].map(([, text, spaceAfter]) => ({ type: 'word', text, spaceAfter }))
    return lineIndex < lines.length - 1 ? [...words, { type: 'break' }] : words
  })
}

function getText(value) {
  if (value == null || typeof value === 'boolean') return ''
  if (typeof value === 'string' || typeof value === 'number') return String(value)
  if (Array.isArray(value)) return value.map(getText).join('')
  if (React.isValidElement(value)) {
    return value.type === 'br' ? '\n' : getText(value.props.children)
  }
  return ''
}

function getLineGroups(words) {
  const groups = []
  let current = []
  let previousTop = null

  words.forEach((word) => {
    if (word.hasAttribute('data-reveal-break')) {
      if (current.length) groups.push(current)
      current = []
      previousTop = null
      return
    }
    const top = Math.round(word.getBoundingClientRect().top)
    if (current.length && top !== previousTop) {
      groups.push(current)
      current = []
    }
    current.push({
      text: word.textContent,
      spaceAfter: word.dataset.spaceAfter ?? ' ',
    })
    previousTop = top
  })

  if (current.length) groups.push(current)
  return groups
}

export function RevealText({
  as: Tag = 'span',
  children,
  className = '',
  enabled = true,
  delay = 0,
  stagger = 0.08,
  duration = 1,
  distance = '120%',
  ease = 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  play = null,
  ...props
}) {
  const measureRef = useRef(null)
  const rootRef = useRef(null)
  const [lines, setLines] = useState(null)
  const [hasEntered, setHasEntered] = useState(false)
  const text = getText(children)

  useEffect(() => {
    if (!enabled) {
      setLines(null)
      setHasEntered(false)
      return undefined
    }

    let frame
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!measureRef.current) return
        const words = [...measureRef.current.querySelectorAll('[data-reveal-word], [data-reveal-break]')]
        setLines(getLineGroups(words))
      })
    }

    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(() => {
      measure()
      requestAnimationFrame(measure)
      requestAnimationFrame(() => requestAnimationFrame(measure))
    })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', measure)
    }
  }, [enabled, text])

  useEffect(() => {
    if (!enabled || !lines || !rootRef.current) return undefined

    if (play !== null) {
      setHasEntered(play)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )

    observer.observe(rootRef.current)
    return () => observer.disconnect()
  }, [enabled, lines, play])

  if (!enabled) return <Tag {...props} className={className}>{children}</Tag>

  if (!lines) {
    return (
      <Tag {...props} ref={measureRef} className={`${className} ${styles.measure}`}>
        {getWords(text).map((word, index, words) => (
          <React.Fragment key={`${word.type}-${word.text ?? ''}-${index}`}>
            {word.type === 'break' ? <span data-reveal-break="true" /> : <span data-reveal-word="true" data-space-after={word.spaceAfter}>{word.text}</span>}
            {word.type === 'word' && word.spaceAfter}
          </React.Fragment>
        ))}
      </Tag>
    )
  }

  return (
    <Tag {...props} ref={rootRef} className={`${className} ${styles.root} ${hasEntered ? styles.active : ''}`}>
      {lines.map((line, index) => (
        <span
          className={styles.line}
          data-page-reveal-line="true"
          key={`${line.map((word) => word.text).join(' ')}-${index}`}
          style={{
            '--reveal-delay': `${delay + index * stagger}s`,
            '--reveal-duration': `${duration}s`,
            '--reveal-distance': distance,
            '--reveal-ease': ease,
          }}
        >
          <span className={styles.lineInner} data-page-reveal-line-inner="true">
            {line.map((word, wordIndex) => (
              <React.Fragment key={`${word}-${wordIndex}`}>
                <span>{word.text}</span>
                {word.spaceAfter || (wordIndex < line.length - 1 ? ' ' : null)}
              </React.Fragment>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  )
}
