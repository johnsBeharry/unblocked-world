import React from 'react'
import { renderToString } from 'react-dom/server'
import { App, isKnownPath } from './app/App.jsx'
import './styles/Global.scss'

export function render(url) {
  return renderToString(<App url={url} />)
}

export { isKnownPath }
