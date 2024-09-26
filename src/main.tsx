import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rotas from './rotas/rotas'
import { Toaster } from 'react-hot-toast'
import { ApiProvider } from './services/contexAPI'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-center" reverseOrder={false} />
    <ApiProvider>
      <RouterProvider router={rotas} />
    </ApiProvider>
  </StrictMode>,
)
