const apiBase = "https://dummyjson.com"

export async function getCategories() {
  const apiEndpoint = "https://dummyjson.com/products/categories/"
  const response = await fetch(apiEndpoint)
  checkResponseForError(response)
  const data = await response.json()

  if (data.length > 0) {
    const categories = data.map(category => ({title: category, thumbnail: null}))

    return categories
  }

  return data
}

export async function getProductsByCategory(category, limit, currentPage) {
  if (!limit) {
    throw {message: "getProducts: limit must be set!"}
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

  const response = await fetch(apiEndpoint.href)
  const data = await response.json()

  return data
}

export async function getProductById(id) {
  const apiEndpoint = `https://dummyjson.com/products/${id}`
  const response = await fetch(apiEndpoint)
  checkResponseForError(response)
  const data = await response.json()

  return data
}

function checkResponseForError(response) {
  if (!response.ok) {
    throw {message: data.message, statusText: response.statusText, status: response.status}
  }
}