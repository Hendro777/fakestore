import { useState, useEffect } from "react"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

import PageNavigation from "../components/PageNavigation";
import { NavLink, useLoaderData, useSearchParams } from "react-router-dom";
import { getProductsPaginated } from "../api";

const LIMIT = 6

export async function loader({ request, params }) {
    const currentPage = new URL(request.url).searchParams.get("page") || 1

    console.log(currentPage)

    const data = await getProductsPaginated(LIMIT, currentPage)
    const products = data.products
    const pages = {
        currentPage,
        total: data.total
    }

    return { products, pages }
}

export default function Products() {
    const loaderData = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()

    const [pages, setPages] = useState(loaderData.pages)
    const [products, setProducts] = useState(loaderData.products)

    useEffect(() => {
        async function updateProducts() {
            setSearchParams(prevParams => {
                prevParams.set("page", pages.currentPage)
                return prevParams
            })
            
            const data = await getProductsPaginated(LIMIT, pages.currentPage)

            setProducts(data.products)
        }

        updateProducts()
    }, [pages])

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

    const setCurrentPage = function (newPage) {
        setPages(prevPages => ({
            ...prevPages,
            currentPage: newPage
        }))
    }

    return (
        <main className='products'>
            <div className="filters">
                <span className="filter">Categories<ExpandMoreIcon /></span>
                <span className="filter">Sort by<ExpandMoreIcon /></span>
                <span className="filter">Price Range<ExpandMoreIcon /></span>
            </div>
            <div className="products-list">
                {productItems}
            </div>
            {pages && <PageNavigation
                currentPage={pages.currentPage}
                totalPages={pages.total}
                setCurrentPage={setCurrentPage}
                offset={2} />}
        </main>
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