import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import { HelmetProvider } from 'react-helmet-async';
import Providers from './Providers/Providers';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
    <HelmetProvider>
    <div className='max-w-screen-xl mx-auto'>
      <RouterProvider router={router} />
    </div>
    </HelmetProvider>
    </Providers>
  </React.StrictMode>,
)
