import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
<StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
