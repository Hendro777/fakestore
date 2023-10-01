export async function getCategories() {
    const apiEndpoint = "https://dummyjson.com/products/categories/"
    const response = await fetch(apiEndpoint)

    if (!response.ok) {
        throw {
            message: data.message,
            statusText: response.statusText,
            status: response.status
        }
    }
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