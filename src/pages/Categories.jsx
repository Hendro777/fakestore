import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"
import { getCategories } from "../api"

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
        <main className="categories">
            <section className="intro">
                <h1 className="secondary">Check our versatile sortiment @fakestore</h1>
            </section>
            <section className="categoryItems">
                {categoryItems}
            </section>
        </main>
    )
}

const Category = function (props) {
    useEffect(() => {
        props.loadThumbnail()
    }, [])

    return (
        <div className="category">
            <div className="thumbnail-container">
                <img className='thumbnail' src={props.item.thumbnail} />
            </div>
            <div className="info">
                <h3>{props.item.title}</h3>
                <p>Checkout our latest {props.item.title} products!</p>
            </div>
        </div>
    )
}

export default Categories