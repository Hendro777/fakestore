import { useQueries, useQuery } from "@tanstack/react-query";
import { useShopContext } from "../../hooks/useShopContext";
import CartProduct from "./CartProduct";
import { getProductById } from "../../utils/api";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, setQuantity, setItemQuantity, deleteFromCart } =
    useShopContext();

  // load corresponding product data to each cartItem
  const queries = [];
  cartItems.forEach((quantity, productId, map) => {
    queries.push({
      queryKey: ["products", productId],
      queryFn: () => getProductById(Number(productId)),
    });
  });

  const cartProducts = useQueries({
    queries: queries,
  });

  const isLoading = cartProducts.some((product) => product.isLoading);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  // Calculate total, discounted total etc.
  // make product elements ready to render
  let total = 0;
  let discountedTotal = 0;

  const productItems = [];
  cartItems.forEach((quantity, productId, map) => {
    const product = cartProducts.find(
      (product) => product.data.id === productId
    ).data;

    total += quantity * product.price;
    discountedTotal +=
      quantity * product.price * ((100 - product.discountPercentage) / 100);

    productItems.push(
      <CartProduct
        key={["product-", productId].join("-")}
        item={{
          id: productId,
          quantity: quantity,
          product: product,
        }}
        handleChange={(quantity) => setItemQuantity(productId, quantity)}
        deleteFromCart={() => deleteFromCart(productId)}
      />
    );
  });

  return (
    <main className="vh-container cart">
      {cartItems.size > 0 && (
        <div className="container">
          <div className="cart-products">{productItems}</div>
          <div className="cart-summary">
            <h2>Subtotal</h2>
            <p className="cart-summary__rrp">
              <span>{total}</span>€
            </p>
            <p className="cart-summary__total">{discountedTotal.toFixed(0)}€</p>
            <button type="button" className="btn btn--primary cart-summary__checkout">
              Checkout
            </button>
          </div>
        </div>
      )}
      {cartItems.size === 0 && <div className="container emptyCart">
        <h1>Your cart is empty.</h1>
        <Link to="/products">Go and shop a little bit</Link>  
      </div>}
    </main>
  );
}
