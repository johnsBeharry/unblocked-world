import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import styles from './SelectPanel.module.scss'

// Form dropdown in the Submit flow: the field is a button; its options open in
// a panel pinned to the bottom of the browser over the form column (title,
// Close, ruled option rows). It slides up on open and fades out on close.
// Choosing an option fills the field and closes the panel.
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export function SelectPanel({
  label,
  value = '',
  options,
  onChange,
  triggerClassName = '',
  emptyClassName = '',
  disabled = false,
  emptyMessage = 'No options available.',
}) {
  const triggerRef = useRef(null)
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const listId = useId()
  const [open, setOpen] = useState(false)
  const closingRef = useRef(null)

  // Fade out, then unmount.
  const close = (restoreFocus = true) => {
    const panel = panelRef.current
    if (restoreFocus) triggerRef.current?.focus()
    if (!panel || reducedMotion()) {
      setOpen(false)
      return
    }
    if (closingRef.current) return
    closingRef.current = gsap.to([panel, overlayRef.current], {
      opacity: 0, duration: 0.3, ease: 'power1.out',
      onComplete: () => {
        closingRef.current = null
        setOpen(false)
      },
    })
  }

  // Align the fixed panel with the form column (measured on open/resize).
  useLayoutEffect(() => {
    const panel = panelRef.current
    const form = triggerRef.current?.closest('form')
    if (!open || !panel || !form) return undefined
    const place = () => {
      const rect = form.getBoundingClientRect()
      panel.style.setProperty('--form-left', `${rect.left}px`)
      panel.style.setProperty('--form-width', `${rect.width}px`)
    }
    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [open])

  // Escape / outside click close; focus the selected (or first) option.
  useEffect(() => {
    if (!open) return undefined
    const panel = panelRef.current
    const selected = panel?.querySelector('[aria-selected="true"]') ?? panel?.querySelector('[role="option"]')
    selected?.focus({ preventScroll: true })
    selected?.scrollIntoView({ block: 'nearest' })

    const onKey = (event) => { if (event.key === 'Escape') close() }
    const onPointer = (event) => {
      if (!panel?.contains(event.target) && !triggerRef.current?.contains(event.target)) close(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  // Opening: the panel slides up from the bottom edge of the browser.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!open || !panel || reducedMotion()) return undefined
    const tween = gsap.fromTo(panel, { yPercent: 100 }, {
      yPercent: 0, duration: 0.8, ease: 'power3.out',
      onComplete: () => gsap.set(panel, { clearProps: 'transform' }),
    })
    const dim = gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' })
    return () => {
      tween.kill()
      dim.kill()
      closingRef.current?.kill()
      closingRef.current = null
    }
  }, [open])

  const choose = (option) => {
    onChange?.(option)
    close()
  }

  // Arrow keys move between options.
  const onListKeyDown = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const items = [...panelRef.current.querySelectorAll('[role="option"]')]
    const index = items.indexOf(document.activeElement)
    const next = items[Math.min(items.length - 1, Math.max(0, index + (event.key === 'ArrowDown' ? 1 : -1)))]
    next?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`${triggerClassName} ${value ? '' : emptyClassName}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        disabled={disabled}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {value || label}
      </button>
      {open && createPortal(
        <>
        {/* Dim layer (#00000066); clicking it closes the panel. */}
        <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
        <div ref={panelRef} className={styles.panel} data-lenis-prevent>
          <div className={styles.header}>
            <p className={styles.title}>{label}</p>
            <button type="button" className={styles.close} onClick={() => close()}>Close</button>
          </div>
          {options.length ? (
            <ul id={listId} className={styles.list} role="listbox" aria-label={label} onKeyDown={onListKeyDown}>
              {options.map((option) => (
                <li key={option} className={styles.item}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={option === value}
                    className={styles.option}
                    onClick={() => choose(option)}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.empty}>{emptyMessage}</p>
          )}
        </div>
        </>,
        document.body,
      )}
    </>
  )
}
