export async function getCategories() {
    const apiEndpoint = "https://dummyjson.com/products/categories/"
    const response = await fetch(apiEndpoint)
    checkResponseForError(response)
    const data = await response.json()

    if (data.length > 0) {
        const categories = data.map(category => ({
            title: category,
            thumbnail: null
        }))

        return categories
    }

    return data
}

export async function getProductsPaginated(limit, currentPage) {
    if(!limit) {
        throw {
            message: "getProducts: limit must be set!"
        }
    }
    const apiEndpoint = limit && currentPage
        ? `https://dummyjson.com/products?limit=${limit}&skip=${limit * (currentPage - 1)}`
        : `https://dummyjson.com/products?limit=${limit}`

    const response = await fetch(apiEndpoint)
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
        throw {
            message: data.message,
            statusText: response.statusText,
            status: response.status
        }
    }
}