import { useEffect, useState } from "react"
import { useLoaderData, Link } from "react-router-dom"
import { getCategories } from "../../utils/api"
import { firstLetterToUpperCase } from "../../utils/util"
import Category from "./Category"

export async function loader() {
    return getCategories()
}

function Categories() {
    const [categories, setCategories] = useState(useLoaderData().map(category => (
        {
            title: category,
            thumbnail: null,
        }
    )))

    const categoryItems = categories.map(category => (
        <Category
            key={category.title}
            item={category}
            loadThumbnail={() => loadThumbnail(category.title)} />
    ))

    async function loadThumbnail(categoryTitle) {
        const apiEndpoint = `https://dummyjson.com/products/category/${categoryTitle}`
        const response = await fetch(apiEndpoint)
        const data = await response.json()
        const products = data.products

        // let rnd = Math.floor(Math.random() * products.length)
        let rnd = 0
        const thumbnail = products[rnd].thumbnail

        setCategories(prevCategories => {
            const newCategories = prevCategories.map(category => {
                return category.title === categoryTitle ?
                    {
                        ...category,
                        thumbnail: thumbnail
                    } :
                    category
            })

            return newCategories
        })
    }

    return (
        <main className="vh-container categories">
            <section className="intro">
                <h1 className="secondary">Check our versatile sortiment @fakestore</h1>
            </section>
            <section className="categoryItems">
                {categoryItems}
            </section>
        </main>
    )
}

export default Categories