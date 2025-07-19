import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Darkmodeprovider } from './context/Darkmodecontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Darkmodeprovider>
    <App />
  </Darkmodeprovider>
  </StrictMode>,
)
