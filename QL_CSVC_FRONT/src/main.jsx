import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import { BrowserRouter } from "react-router-dom"; 
//import AppStaff from './AppStaff.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,

  /**
   * staff
   *  <StrictMode>
    <BrowserRouter>
      <AppStaff />
    </BrowserRouter>
  </StrictMode>
   */
)
