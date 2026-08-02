import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UseEffect from './UseEffect.jsx'
import { UseMemo } from './UseMemo.jsx'
import { UseCallback } from './UseCallback.jsx'
import CustomHook from './CustomHook.jsx'
import UseRef from './UseRef.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <UseEffect /> */}
    {/* <UseMemo /> */}
    {/* <UseCallback /> */}
    {/* <CustomHook/> */}
    <UseRef/>
  </StrictMode>,
)
