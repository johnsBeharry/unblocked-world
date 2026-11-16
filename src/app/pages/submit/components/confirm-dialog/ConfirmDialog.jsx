import React, { useEffect, useId, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import styles from './ConfirmDialog.module.scss'

// Confirmation popup of the Submit flow (user reference 2026-11-17, "Remove
// this poster?"): centred dark panel over a 40% black overlay with Close,
// title, message and one action. Escape, the overlay and Close cancel. It
// fades in with a short rise and fades out before unmounting.
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// `children` is the message; `content` (e.g. a field) sits between the message
// and the action; `className` lets a consumer set the panel size through
// `--confirm-dialog-height` / `--confirm-dialog-offset` (half the height,
// whole px).
export function ConfirmDialog({ open, title, children, content = null, className = '', confirmLabel, busy = false, error = '', onConfirm, onClose, onBack }) {
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const closingRef = useRef(null)
  const returnFocusRef = useRef(null)
  const titleId = useId()
  const [mounted, setMounted] = React.useState(open)

  if (open && !mounted) setMounted(true)

  // Entry (before paint) / exit animation.
  useLayoutEffect(() => {
    const panel = panelRef.current
    const overlay = overlayRef.current
    if (!mounted || !panel || !overlay) return undefined
    if (open) {
      closingRef.current?.kill()
      closingRef.current = null
      if (!reducedMotion()) {
        gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' })
        gsap.fromTo(panel, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      }
      return undefined
    }
    if (reducedMotion()) {
      setMounted(false)
      return undefined
    }
    closingRef.current = gsap.to([panel, overlay], {
      opacity: 0, duration: 0.3, ease: 'power1.out',
      onComplete: () => { closingRef.current = null; setMounted(false) },
    })
    return undefined
  }, [open, mounted])

  // Focus the action on open, give focus back on close; Escape cancels and
  // Tab stays inside the panel.
  useEffect(() => {
    if (!open) return undefined
    returnFocusRef.current = document.activeElement
    const panel = panelRef.current
    const first = panel?.querySelector('[data-dialog-autofocus]') ?? panel?.querySelector('[data-confirm-action]')
    first?.focus({ preventScroll: true })
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.()
      if (event.key !== 'Tab' || !panel) return
      const items = [...panel.querySelectorAll('button:not(:disabled), input:not(:disabled)')]
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      returnFocusRef.current?.focus?.({ preventScroll: true })
    }
  }, [open, onClose])

  if (!mounted) return null
  return createPortal(
    <>
      <div ref={overlayRef} className={styles['confirm-dialog__overlay']} onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className={`${styles['confirm-dialog']} ${className}`} role="alertdialog" aria-modal="true" aria-labelledby={titleId}>
        {/* Optional (←) on the Close row: back to the previous stage. */}
        <div className={styles['confirm-dialog__bar']}>
          {onBack && <button type="button" className={styles['confirm-dialog__back']} disabled={busy} onClick={onBack} aria-label="Back">(←)</button>}
          <button type="button" className={styles['confirm-dialog__close']} onClick={onClose}>Close</button>
        </div>
        <h2 id={titleId} className={styles['confirm-dialog__title']}>{title}</h2>
        <p className={styles['confirm-dialog__message']}>{children}</p>
        {content}
        {error && <p className={styles['confirm-dialog__error']} role="alert">{error}</p>}
        <button type="button" className={styles['confirm-dialog__action']} disabled={busy} onClick={onConfirm} data-confirm-action>{confirmLabel}</button>
      </div>
    </>,
    document.body,
  )
}
