import React from 'react'
import styles from './App.module.scss'
import { Header } from './components/header/Header.jsx'
import { HomePage } from './pages/home/HomePage.jsx'
import { PostersPage } from './pages/posters/PostersPage.jsx'
import { GuidelinesPage } from './pages/guidelines/GuidelinesPage.jsx'
import { SubmitPage } from './pages/submit/SubmitPage.jsx'

export function App({ url = '/' }) {
  const path = url.split('?')[0].replace(/\/$/, '') || '/'
  const page = path === '/posters'
    ? <PostersPage />
    : path === '/guidelines'
      ? <GuidelinesPage />
      : path === '/submit'
        ? <SubmitPage />
        : <HomePage />
  return <div className={styles.app} data-route={path}><Header /><div>{page}</div></div>
}
