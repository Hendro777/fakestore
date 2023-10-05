import axios from "axios"

const apiBase = "https://dummyjson.com"

// Categories
export async function getCategories() {
  const apiEndpoint = "https://dummyjson.com/products/categories/"
  const response = await axios.get(apiEndpoint)
  const data = await response.data

  return data
}

// Products
export async function getProductsByCategory(category, limit, currentPage) {
  if (!limit) {
    throw { message: "getProducts: limit must be set!" }
  }

  const apiSubpath = category
    ? `/products/category/${category}`
    : "/products" // no omitted / null
  const apiEndpoint = new URL(apiSubpath, apiBase)

  apiEndpoint
    .searchParams
    .set("limit", limit)
  if (currentPage) {
    apiEndpoint
      .searchParams
      .set("skip", limit * (currentPage - 1))
  }

  console.log(apiEndpoint.href)

  const response = await axios.get(apiEndpoint.href)
  const data = await response.data

  return data
}

export async function getProductById(id) {
  const apiSubpath = `/products/${id}`
  const apiEndpoint = new URL(apiSubpath, apiBase)
  const response = await axios.get(apiEndpoint)
  const data = await response.data

  return data
}

// Users
export async function getUserById(id) {
  const apiSubpath = `/users/${id}`
  const apiEndpoint = new URL(apiSubpath, apiBase)
  const response = await axios.get(apiEndpoint.href)
  const data = response.data

  return data
}

// Cart
export async function getCart(userId) {
  const apiSubpath = `/carts/user/${userId}`
  const apiEndpoint = new URL(apiSubpath, apiBase)
  const response = await axios.get(apiEndpoint.href)
  const data = response.data
  const userCart = data.carts[0]

  return userCart
}

export async function getLocalCart() {
  const localCartProducts = localStorage.getItem("cartProducts")
    || [
      {
        id: 45,
        title: "Malai Maxi Dress",
        price: 50,
        quantity: 10,
        total: 50,
        discountPercentage: 5.07,
        discountedPrice: 47
      },
    ]

  const total = localCartProducts.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)
  const discountedTotal = localCartProducts.reduce((acc, prod) => acc + prod.discountedPrice * prod.quantity, 0)
  const totalProducts = localCartProducts.reduce((acc, prod) => acc + prod.quantity, 0)
  const totalQuantity = localCartProducts.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)


  const localCart = { products: localCartProducts, total, discountedTotal, totalProducts, totalQuantity }

  return localCart
}

// HTTP-Error handling
export function checkResponseForError(response) {
  if (!response.ok) {
    console.log("err", response)
    throw {
      message: response.message,
      statusText: response.statusText,
      status: response.status
    }
  }
}