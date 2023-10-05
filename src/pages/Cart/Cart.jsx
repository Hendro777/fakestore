import { useQuery } from "@tanstack/react-query";
import { useShopContext } from "../../hooks/useShopContext";
import CartProduct from "./CartProduct";
import { getProductsByCategory } from "../../utils/api";

export default function Cart() {
  const { cartItems, setQuantity, setItemQuantity, deleteFromCart } = useShopContext();

  // const { products, total, discountedTotal, totalProducts, totalQuantity } = data

  const productItems = [];
  cartItems.forEach((value, key, map) => {
    productItems.push(
      <CartProduct
        key={["product-", key].join("-")}
        item={{ id: key, quantity: value }}
        handleChange={(quantity) => setItemQuantity(key, quantity)}
        deleteFromCart={() => deleteFromCart(key)}
      />
    );
  });

  return (
    <div className="vh-container cart">
      <div className="cartProducts">{productItems}</div>
      <div className="cartSummary">
        <h2>Zwischensumme</h2>
      </div>
    </div>
  );
}
