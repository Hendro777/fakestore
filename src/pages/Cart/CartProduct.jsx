import DeleteIcon from "@mui/icons-material/Delete";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import { useQuery } from "@tanstack/react-query";

export default function CartProduct(props) {

  return (
    <div className="cartProduct">
      <div className="thumbnail-container">
        <img src={props.item.product.thumbnail} className="thumbnail" />
      </div>
      <div className="info">
        <h3 className="title">{props.item.product.title}</h3>
        <p className="brand">{props.item.product.brand}</p>
        <div className="pricing">
          <span className="price">
            {Number(
              props.item.product.price * ((100 - props.item.product.discountPercentage) / 100)
            ).toFixed(0)}
            € per
          </span>
          <span className="rrp">
            RRP: <span className="value">{props.item.product.price}€</span>
          </span>
        </div>
      </div>
      <div className="orderDetails">
        <div>
          <div className="delete" onClick={props.deleteFromCart}>
            <DeleteIcon fontSize="inherit" />
          </div>
          <div className="quantity-container">
            <label htmlFor="quantity-select">{props.item.quantity}</label>
            <select
              className="quantity-select"
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
            <UnfoldMoreIcon className="dropdown-icon" />
          </div>
        </div>

        <span className="total">
          {Number(
            props.item.product.price * ((100 - props.item.product.discountPercentage) / 100)
          ).toFixed(0) * props.item.quantity}
          €
        </span>
      </div>
    </div>
  );
}
