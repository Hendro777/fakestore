import { NavLink } from "react-router-dom"
import { useShopContext } from "../../hooks/useShopContext"

export default function ProductItem(props) {
    const { addToCart } = useShopContext()


    {
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
                    <button onClick={() => addToCart(props.item.id, 1)} type="button" className="btn-addToCart">Add to cart</button>}
            </div >
        )
    }
}