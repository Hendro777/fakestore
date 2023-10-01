import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.scss'
import '@fontsource-variable/inter'
import '@fontsource-variable/karla'

import SiteLayout from "./components/SiteLayout"
import Home from './pages/Home'
import Categories from './pages/Categories'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import ProductDescription from "./pages/ProductDetails/ProductDescription"
import ProductSpecifications from './pages/ProductDetails/ProductSpecifications'
import ProductReviews from './pages/ProductDetails/ProductReviews'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter
    basename={import.meta.env.DEV ? '/' : '/fakestore/'}>
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />}>
          <Route index element={<ProductDescription />} />
          <Route path="specifications" element={<ProductSpecifications />} />
          <Route path="reviews" element={<ProductReviews />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
