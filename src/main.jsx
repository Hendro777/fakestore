import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.scss'
import '@fontsource-variable/inter'
import '@fontsource-variable/karla'

import SiteLayout from "./components/SiteLayout"
import Home from './pages/Home'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  </BrowserRouter>,
)
