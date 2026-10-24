import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './app/App.jsx'
import './styles/Global.scss'

export function render(url) {
  return renderToString(<App url={url} />)
}
