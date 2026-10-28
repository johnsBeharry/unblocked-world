import React from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App.jsx'
import './styles/Global.scss'

createRoot(document.getElementById('root')).render(<App url={window.location.pathname} />)
