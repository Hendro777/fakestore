import { useState, useEffect } from "react"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

import PageNavigation from "../components/PageNavigation";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { getCategories, getProductsByCategory } from "../api";
import { Category } from "@mui/icons-material";

const LIMIT = 6

export async function loader({ request, params }) {
    const searchParams = new URL(request.url).searchParams
    const currentPage = searchParams.get("page") || 1
    const categories = await getCategories()
    const category = searchParams.get("category")

    if (category && categories.indexOf(category) === -1) {
        throw {
            message: "The selected does not exist!"
        }
    }

    const data = await getProductsByCategory(category, LIMIT, currentPage)
    const pages = {
        currentPage,
        total: Math.ceil(data.total / LIMIT)
    }
    const products = data.products

    if (pages.total > 0 &&
        (currentPage > pages.total || currentPage < 1)) {
        // redirect to 404 or Error page
        throw {
            message: `The selected pagenumber (${currentPage}) does not exist`
        }
    }

    return { products, pages, categories }
}

export default function Products() {
    const loaderData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()

    const [pages, setPages] = useState(loaderData.pages)
    const [products, setProducts] = useState(loaderData.products)

    const categories = loaderData.categories
    const categoryFilter = searchParams.get("category")

    useEffect(() => {
        async function updateProducts() {
            const data = await getProductsByCategory(categoryFilter, LIMIT, pages.currentPage)

            setProducts(data.products)
        }

        updateProducts()
    }, [pages, categoryFilter])

    const getStarIcons = function (rating) {
        const starIcons = []

        const float = parseFloat(rating)

        const intPrecision = parseInt(float, 10)
        const floatPrecision = float - parseInt(float, 10)

        for (let i = 0; i < intPrecision; i++) {
            starIcons.push(<StarIcon />)
        }

        if (floatPrecision < .25) {
            starIcons.push(<StarOutlineIcon />)
        } else if (floatPrecision >= .75) {
            starIcons.push(<StarIcon />)
        } else {
            starIcons.push(<StarHalfIcon />)
        }

        for (let i = starIcons.length; i < 5; i++) {
            starIcons.push(<StarOutlineIcon />)
        }

        return starIcons
    }

    const productItems = products?.map(product => (
        <ProductItem
            key={product.id}
            item={product}
            getStarIcons={() => getStarIcons(product.rating)} />
    ))

    function handleFilterChange(key, value) {
        setSearchParams(searchParams => {
            if (value === null) {
                searchParams.delete(key)
            } else {
                searchParams.set(key, value)
            }

            return searchParams
        })
    }

    const categoryControls = categories.map(category => (<label
        key={[category, "control"].join("-")}
        className="checkboxControl" htmlFor={category}>
        <input
            type="radio"
            name="categoryFilter"
            id={category}
            value={category}
            checked={categoryFilter === category}
            onChange={() => handleFilterChange("category", category)} />
        {category.charAt(0).toUpperCase() + category.slice(1)}
    </label>
    ))

    console.log(categoryControls)

    const setCurrentPage = function (newPage) {
        setSearchParams(prevParams => {
            prevParams.set("page", pages.currentPage)
            return prevParams
        })


        setPages(prevPages => ({
            ...prevPages,
            currentPage: newPage
        }))
    }

    return (
        <main className='products'>
            <div className="filters">
                <div className="filter">
                    <span className="filterTitle">Categories<ExpandMoreIcon /></span>
                    <div className="filterOptions">
                        {categoryControls}
                    </div>
                </div>
                <div className="filter">
                    <span className="filterTitle">Sort by<ExpandMoreIcon /></span>
                </div>
                <div className="filter">
                    <span className="filterTitle">Price Range<ExpandMoreIcon /></span>
                </div>
            </div>
            <div className="products-list">
                {productItems}
            </div>
            {
                pages && <PageNavigation
                    currentPage={pages.currentPage}
                    totalPages={pages.total}
                    setCurrentPage={setCurrentPage}
                    offset={2} />
            }
        </main >
    )
}

function handleNavLinkClick(event) {
    event.preventDefault()
    console.log("lcick")

    if (event.target.tagName === 'BUTTON') {
        console.log("clicked buy")
    } else {
        console.log("navlink")
    }
}

const ProductItem = function (props) {
    return (
        <div className="product">
            <NavLink
                to={props.item.id.toString()}
                className="navlink">
                <div className="thumbnail-container">
                    <img className='thumbnail' src={props.item.thumbnail} />
                </div>
                <div className="info">
                    <h3 className="title">{props.item.title}</h3>
                    <p className="brand">{props.item.brand}</p>
                    <div className="product-rating">
                        {props.getStarIcons()}
                        <span className="rating-value">{props.item.rating.toFixed(1)}</span>
                    </div>
                    <div className="discount">
                        Save {Number(props.item.discountPercentage).toFixed(1)}%
                    </div>
                    <div className="pricing">
                        <span className="price">{
                            Number(props.item.price * ((100 - props.item.discountPercentage) / 100)).toFixed(0)
                        }€</span>
                        <span className="rrp">RRP: <span className="value">{props.item.price}€</span></span>
                    </div>
                    {
                        props.item.stock <= 0 ?
                            <span className="stock out-of-stock">out of stock</span> :
                            <span className="stock in-stock">in stock</span>
                    }
                </div>
            </NavLink >
            {props.item.stock > 0 &&
                <button onClick={(event) => event.preventDefault()} type="button" className="buy-button ">Add to cart</button>}
        </div >
    )
}