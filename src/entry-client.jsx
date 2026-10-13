import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { App } from './app/App.jsx'
import './styles/Global.module.scss'

hydrateRoot(document.getElementById('root'), <App url={window.location.pathname} />)
