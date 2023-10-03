import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

import './index.scss'
import '@fontsource-variable/inter'
import '@fontsource-variable/karla'

import SiteLayout from "./components/SiteLayout"
import Home from './pages/Home'
import Error from "./components/Error"
import Categories, { loader as categoriesLoader } from './pages/Categories'
import Products, { loader as productsLoader } from './pages/Products'
import ProductDetails, { loader as productDetailsLoader } from './pages/ProductDetails/ProductDetails'
import ProductDescription from "./pages/ProductDetails/ProductDescription"
import ProductSpecifications from './pages/ProductDetails/ProductSpecifications'
import ProductReviews from './pages/ProductDetails/ProductReviews'

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<SiteLayout />}>
    <Route index element={<Home />} />
    <Route path="categories" element={<Categories />} loader={categoriesLoader} />
    <Route path="products" element={<Products />} errorElement={<Error />} loader={productsLoader} />
    <Route path="products/:id" element={<ProductDetails />} loader={productDetailsLoader}>
      <Route index element={<ProductDescription />} />
      <Route path="specifications" element={<ProductSpecifications />} />
      <Route path="reviews" element={<ProductReviews />} />
    </Route>
  </Route>
), {
  basename: import.meta.env.DEV ? '/' : '/fakestore/'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
