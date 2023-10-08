import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLoaderData, useParams } from "react-router-dom"
import ProductRating from "../../components/ProductRating"

import { CircularProgress } from "@mui/material"
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { getProductById } from "/src/utils/api";
import { useShopContext } from "../../hooks/useShopContext";
 
export async function loader({ params }) {
    return getProductById(params.id)
}

function ProductDetails() {
    const product = useLoaderData()
    const shopContext = useShopContext()

    const [deliveryDate, setDeliveryDate] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    const [quantity, setQuantity] = useState(1)

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
        let i = 1
        for (let image of product.images) {
            imageItems.push(
                <img
                    key={image}
                    src={image}
                    className={displayedImage == image ? "active" : ""}
                    onClick={() => setDisplayedImage(image)
                    } />
            )
        }

        return imageItems
    }

    function addToCart() {
        shopContext.addToCart(product.id, quantity)
    }

    return (
        <main className=" vh-container section--light">
            <div className="container product-details">
                {product ? (
                    <>
                        <h1 className="title">{product.title}</h1>
                        <div className="rating">
                            <ProductRating rating={product.rating} />
                            <Link className="navlink">{13} Product Ratings</Link>
                        </div>
                        <section className="info">
                            <div className="info__image">
                                <div className="thumbnails">
                                    {getProductImages()}
                                </div>
                                <img className="image-display" src={displayedImage}></img>
                            </div>
                            <div className="info__order">
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
                                        <label htmlFor="quantity-select">{quantity}</label>
                                        <select type="number" value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}className="amount-select">
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                            <option value={6}>6</option>
                                            <option value={7}>7</option>
                                            <option value={8}>8</option>
                                            <option value={9}>9</option>
                                            <option value={10}>10</option>
                                        </select>
                                        <UnfoldMoreIcon
                                            className="dropdown-icon" />
                                    </div>
                                    <button type="button" className="btn btn--primary" onClick={addToCart}>Add to cart</button>
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
                        <Outlet context={product} />
                    </>
                ) :
                    <CircularProgress />
                }
            </div>
        </main>
    )
}

export default ProductDetails