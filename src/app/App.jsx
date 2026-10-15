import React from 'react'
import styles from './App.module.scss'
import { Header, HEADER_COLORS } from './components/header/Header.jsx'
import { HomePage } from './pages/home/HomePage.jsx'
import { PostersPage } from './pages/posters/PostersPage.jsx'
import { GuidelinesPage } from './pages/guidelines/GuidelinesPage.jsx'
import { SubmitPage } from './pages/submit/SubmitPage.jsx'
import { SmoothScroll } from './components/smooth-scroll/SmoothScroll.jsx'

export function App({ url = '/' }) {
  const path = url.split('?')[0].replace(/\/$/, '') || '/'
  const page = path === '/posters'
    ? <PostersPage />
    : path === '/guidelines'
      ? <GuidelinesPage />
      : path === '/submit'
        ? <SubmitPage />
        : <HomePage />
  const headerColor = path === '/posters'
    ? HEADER_COLORS.poster
    : path === '/guidelines'
      ? HEADER_COLORS.guidelines
      : HEADER_COLORS.home

  return <div className={styles.app} data-route={path}><SmoothScroll /><Header color={headerColor} /><div>{page}</div></div>
}
