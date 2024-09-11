import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rotas from './rotas/rotas'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false}/>
     <RouterProvider router={rotas} />
  </StrictMode>,
)
