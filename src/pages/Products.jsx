import { useState, useEffect } from "react"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';

import PageNavigation from "../components/PageNavigation";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { getCategories, getProductsByCategory } from "../utils/api";
import { firstLetterToUpperCase } from "../utils/util";

const LIMIT = 12

export async function loader({ request, params }) {
    const searchParams = new URL(request.url).searchParams
    const currentPage = searchParams.get("page") || 1

    const categories = await getCategories()
    const category = searchParams.get("category")

    const data = await getProductsByCategory(category, LIMIT, currentPage)
    const pages = {
        currentPage,
        total: Math.ceil(data.total / LIMIT)
    }
    const products = data.products

    return { products, pages, categories }
}

export default function Products() {
    const loaderData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState(loaderData.products)
    const [pages, setPages] = useState(loaderData.pages)

    const categories = loaderData.categories
    const categoryFilter = searchParams.get("category")

    // Errorhandling
    if (pages.total > 0 &&
        (pages.currentPage > pages.total || pages.currentPage < 1)) {
        throw {
            status: 404,
            statusText: 'Bad query string',
            message: `The specified pagenumber (${pages.currentPage}) does not exist`
        }
    }

    if (categoryFilter && categories.indexOf(categoryFilter) === -1) {
        throw {
            status: 404,
            statusText: 'Bad query string',
            message: "The specified category does not exist!"
        }
    }

    // Update data when querystring is changed
    useEffect(() => {
        async function updateProducts() {
            const data = await getProductsByCategory(categoryFilter, LIMIT, pages.currentPage)

            setProducts(data.products)
            setPages({
                ...pages,
                total: Math.ceil(data.total / LIMIT)
            })
        }

        updateProducts()
    }, [searchParams])

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

    function clearFilters() {
        setSearchParams({})
    }

    function handleCategoryChange(value) {
        handleFilterChange("category", value)
        handleFilterChange("page", null)
        setCurrentPage(1)
    }

    const setCurrentPage = function (newPage) {
        handleFilterChange("page", newPage === 1 ? null : newPage)

        setPages(prevPages => ({
            ...prevPages,
            currentPage: newPage
        }))
    }

    // Display stars based on rating
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

    const categoryOptions = categories.map(category => (<label
        key={[category, "option"].join("-")}
        className="checkboxOption" htmlFor={category}>
        <input
            type="radio"
            name="categoryFilter"
            id={category}
            value={category}
            checked={categoryFilter === category}
            onChange={() => handleCategoryChange(category)} />
        {firstLetterToUpperCase(category)}
    </label>
    ))

    return (
        <main className='vh-container products'>
            <div className="filters">
                <div className={`filter ${categoryFilter && "active"}`}>
                    <span className="filterTitle">Categories<ExpandMoreIcon /></span>
                    <div className="filterOptions">
                        <span className="clear-filter " onClick={() => {
                            if (!categoryFilter) { return }
                            handleCategoryChange(null)
                        }}>Clear categories</span>
                        <div className="options">{categoryOptions}</div>
                    </div>
                </div>
                <div className="filter">
                    <span className="filterTitle">Sort by<ExpandMoreIcon /></span>
                    <div className="filterOptions not-implemented">
                    </div>
                </div>
                <div className="filter">
                    <span className="filterTitle">Price Range<ExpandMoreIcon /></span>
                    <div className="filterOptions not-implemented">
                    </div>
                </div>
                {categoryFilter && <span className="clear-all" onClick={() => setSearchParams({})}>Reset filters</span>}
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