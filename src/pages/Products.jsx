import { useState, useEffect } from "react"

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

import PageNavigation from "../components/PageNavigation";


const Products = function () {
    const LIMIT = 6
    const [pages, setPages] = useState(undefined)
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchPageLength() {
            const apiEndpoint = 'https://dummyjson.com/products?limit=1'
            const response = await fetch(apiEndpoint)
            const data = await response.json()
            const pageCount = Math.ceil(data.total / LIMIT)

            setPages({
                currentPage: 1,
                pageCount: pageCount
            })
        }

        fetchPageLength()
    }, [])

    useEffect(() => {
        async function fetchProducts() {
            const apiEndpoint = `https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * (pages?.currentPage - 1)}`
            console.log(apiEndpoint)
            const response = await fetch(apiEndpoint)
            const data = await response.json()
            const products = data.products

            setProducts(products)
        }

        if (pages != undefined) {
            console.log(pages.currentPage)
            fetchProducts()
        }
    }, [pages])

    const getStarIcons = function(rating) {
        const starIcons = []

        const float = parseFloat(rating)

        const intPrecision = parseInt(float, 10)
        const floatPrecision = float - parseInt(float, 10)

        for(let i = 0; i < intPrecision; i++) {
            starIcons.push(<StarIcon />)
        }

        if(floatPrecision < .25) {
            starIcons.push(<StarOutlineIcon />)
        } else if(floatPrecision >= .75) {
            starIcons.push(<StarIcon />)
        } else {
            starIcons.push(<StarHalfIcon />)
        }

        for(let i = starIcons.length; i < 5; i++) {
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

    const setCurrentPage = function(newPage) {
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
                pageCount={pages.pageCount}
                setCurrentPage={setCurrentPage}
                offset={2} />}
        </main>
    )
}

const ProductItem = function (props) {
    return (
        <div className="product">
            <div className="thumbnail-container">
                <img className='thumbnail' src={props.item.thumbnail} />
            </div>
            <div className="info">
                <h3 className="title">{props.item.title}</h3>
                <p className="brand">{props.item.brand}</p>
                <div className="rating">
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
                {props.item.stock > 0 && 
                    <button type="button" className="addToCart">Add to cart</button>}
            </div>
        </div>
    )
}

export default Products
