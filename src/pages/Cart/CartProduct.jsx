import DeleteIcon from '@mui/icons-material/Delete';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useQuery } from "@tanstack/react-query"

export default function CartProduct(props) {

    const { data: product, isSuccess } = useQuery({
        queryKey: ['cartProduct', props.item.id],
        queryFn: () => fetch(`https://dummyjson.com/products/${props.item.id}`).then(res => res.json())
    })

    const item = {
        id: 45,
        title: "Malai Maxi Dress",
        price: 50,
        quantity: 1,
        total: 50,
        discountPercentage: 5.07,
        discountedPrice: 47
    }

    const productx = {
        id: 45,
        title: "Malai Maxi Dress",
        description: "Ready to wear, Unique design according to modern standard fashion, Best fitting ,Imported stuff",
        price: 50,
        discountPercentage: 5.07,
        rating: 4.67,
        stock: 96,
        brand: "IELGY",
        category: "womens-dresses",
        thumbnail: "https://i.dummyjson.com/data/products/45/thumbnail.jpg",
        images: [
            "https://i.dummyjson.com/data/products/45/1.jpg",
            "https://i.dummyjson.com/data/products/45/2.webp",
            "https://i.dummyjson.com/data/products/45/3.jpg",
            "https://i.dummyjson.com/data/products/45/4.jpg",
            "https://i.dummyjson.com/data/products/45/thumbnail.jpg"
        ]
    }

    if (isSuccess) {
        return (
            <div className="cartProduct" >
                <div className="thumbnail-container">
                    <img src={product.thumbnail} className="thumbnail" />
                </div>
                <div className="info">
                    <h3 className="title">{product.title}</h3>
                    <p className="brand">{product.brand}</p>
                    <div className="pricing">
                        <span className="price">{
                            Number(product.price * ((100 - product.discountPercentage) / 100)).toFixed(0)
                        }€ per</span>
                        <span className="rrp">RRP: <span className="value">{product.price}€</span></span>
                    </div>

                </div>
                <div className="orderDetails">
                    <div>
                        <div className='delete' onClick={props.deleteFromCart}>
                            <DeleteIcon fontSize='inherit' />
                        </div>
                        <div className="quantity-container">
                            <label for="quantity-select">{props.item.quantity}</label>
                            <select className="quantity-select" value={props.item.quantity} onChange={(e) => props.handleChange(e.target.value)}>
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
                    </div>

                    <span className="total">{Number(product.price * ((100 - product.discountPercentage) / 100)).toFixed(0) *
                        props.item.quantity}€</span>
                </div>

            </div>
        )
    }
}