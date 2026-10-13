import React from 'react'
import styles from './Header.module.scss'

export const HEADER_COLORS = { home: '#d9d9d9', poster: '#dc91a8' }

export function Header({ color = HEADER_COLORS.home }) {
  return (
    <header className={styles.header} aria-label="Primary navigation">
      <nav className={styles.nav} style={{ color }}>
        <a className={styles.navItem} href="/posters">Posters</a>
        <a className={styles.navItem} href="/guidelines">Guidelines</a>
        <a className={styles.navItem} href="/submit">Submit (→)</a>
      </nav>
      <a className={styles.home} style={{ color }} href="/">Home</a>
    </header>
  )
}
