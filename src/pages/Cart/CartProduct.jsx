import DeleteIcon from "@mui/icons-material/Delete";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useQuery } from "@tanstack/react-query";

export default function CartProduct(props) {
  return (
    <div className="cart-product">
      <div className="cart-product__thumbnail-container">
        <img src={props.item.product.thumbnail} className="cart-product__thumbnail" />
      </div>
      <div className="cart-product__info">
        <h3 className="cart-product__title">{props.item.product.title}</h3>
        <p className="cart-product__brand">{props.item.product.brand}</p>
        <div className="cart-product__pricing">
          <span className="cart-product__price">
            {Number(
              props.item.product.price *
                ((100 - props.item.product.discountPercentage) / 100)
            ).toFixed(0)}
            € per
          </span>
          <span className="cart-product__rrp">
            RRP: <span className="cart-product__rrp-value">{props.item.product.price}€</span>
          </span>
        </div>
      </div>
      <div className="cart-product__orderDetails">
          <div className="cart-product__delete" onClick={props.deleteFromCart}>
            <DeleteIcon fontSize="inherit" />
          </div>
          <div className="cart-product__quantity-container">
            <label htmlFor="cart-product__quantity-select">{props.item.quantity}</label>
            <select
              className="cart-product__quantity-select"
              value={props.item.quantity}
              onChange={(e) => props.handleChange(e.target.value)}
            >
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
            <UnfoldMoreIcon className="cart-product__dropdown-icon" />
          </div>
          <span className="cart-product__total">
            {Number(
              props.item.product.price *
                ((100 - props.item.product.discountPercentage) / 100)
            ).toFixed(0) * props.item.quantity}
            €
          </span>
      </div>
    </div>
  );
}
