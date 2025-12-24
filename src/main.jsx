import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WhatToShowProvider from './contexts/WhatToShow.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WhatToShowProvider>
      <App />
    </WhatToShowProvider>
  </StrictMode>,
)
