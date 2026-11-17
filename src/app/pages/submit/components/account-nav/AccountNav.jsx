import React from 'react'
import styles from './AccountNav.module.scss'
import { RevealRow } from '../../../../../components/RevealRow/RevealRow.jsx'

// Signed-in nav of the Submit column (Profile reference 2026-11-17): the
// Profile / Poster tabs on the left, Sign out on the right. Shown instead of
// the step list on the Profile screen.
export function AccountNav({ active = 'profile', onProfile, onPosters, onSignOut, busy = false }) {
  const tab = (name, label, onClick) => (
    <RevealRow as="button" line={false} pinned type="button" className={`${styles['account-nav__tab']} ${active === name ? styles['account-nav__tab--active'] : ''}`} aria-current={active === name ? 'page' : undefined} onClick={onClick}>{label}</RevealRow>
  )
  return (
    <nav className={styles['account-nav']} aria-label="Account">
      <span className={styles['account-nav__tabs']}>
        {tab('profile', 'Profile', onProfile)}
        {tab('posters', 'Poster', onPosters)}
      </span>
      <RevealRow as="button" line={false} pinned type="button" className={styles['account-nav__sign-out']} disabled={busy} onClick={onSignOut}>{busy ? 'Signing out…' : 'Sign out'}</RevealRow>
    </nav>
  )
}
