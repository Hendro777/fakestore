import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useParams } from "react-router-dom"
import ProductRating from "../../components/ProductRating"

import { CircularProgress } from "@mui/material"
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const ProductDetails = function () {
    const params = useParams()

    const [product, setProduct] = useState()
    const [deliveryDate, setDeliveryDate] = useState()
    const [displayedImage, setDisplayedImage] = useState()

    useEffect(() => {
        async function fetchProduct() {
            const apiEndpoint = `https://dummyjson.com/products/${params.id}`
            const response = await fetch(apiEndpoint)
            const data = await response.json()

            console.log(data)

            setProduct(data)
        }

        fetchProduct()
    }, [])

    useEffect(() => {
        let date = new Date(Date.now())
        date.setDate(date.getDate() + 3)

        setDeliveryDate(date)
    }, [])

    useEffect(() => {
        setDisplayedImage(product?.images[0])
    }, [product])

    function getProductImages() {
        const imageItems = []
        for(let image of product.images) {
            imageItems.push(
                <img 
                    src={image} 
                    className={displayedImage == image ? "active" : ""}
                    onClick={() => setDisplayedImage(image)
                    }/>
            )
        }

        return imageItems
    }

    return (
        <main className="product-details">
            {product ? (
                <>
                    <h1 className="title">{product.title}</h1>
                    <div className="rating">
                        <ProductRating rating={product.rating} />
                        <Link className="navlink">{13} Product Ratings</Link>
                    </div>
                    <section className="info">
                        <div className="thumbnails">
                            {getProductImages()}
                        </div>
                        <img className="image-display" src={displayedImage}></img>
                        <div className="order">
                            <span className="price">{
                                Number(product.price * ((100 - product.discountPercentage) / 100)).toFixed(0)
                            }€</span>
                            <span className="rrp">
                                <span className="value">
                                    {product.price}€
                                </span>
                                <div className="discount">
                                    Save {Number(product.discountPercentage).toFixed(1)}%
                                </div>
                            </span>
                            {
                                product.stock <= 0 ?
                                    <span className="stock out-of-stock">out of stock</span> :
                                    <span className="stock in-stock">in stock</span>
                            }
                            <span className="delivery"><span className="bold">Free delivery</span> until {deliveryDate?.toLocaleDateString('en-EN')}</span>
                            <form className="buy-form">
                                <div className="quantity-container">
                                    <label for="quantity-select">{1}</label>
                                    <select className="amount-select">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                    <UnfoldMoreIcon
                                        className="dropdown-icon" />
                                </div>
                                <button type="button" className="buy-button">Add to cart</button>
                            </form>
                            <div className="actions">
                                <span className="action remember"><span className="icon"><FavoriteBorderIcon /></span>Remember</span>
                                <span className="action share"><span className="icon"><ShareIcon /></span>Share</span>
                            </div>
                        </div>
                    </section>
                    <nav className="product-nav">
                        <NavLink end to="" className="navlink">Description</NavLink>
                        <NavLink end to="specifications" className="navlink"> Specifications</NavLink>
                        <NavLink end to="reviews" className="navlink">Reviews</NavLink>
                    </nav>
                    <Outlet context={product}/>
                </>
            ) :
                <CircularProgress />
            }
        </main>
    )
}

export default ProductDetails