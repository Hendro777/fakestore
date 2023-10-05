import { createContext, useState } from "react";

export const ShopContext = createContext(null);

export function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = useState(new Map())

  const addToCart = (productId, quantity) => {
    quantity = Number(quantity)

    const currentQuantity = cartItems.get(productId) || 0
    setItemQuantity(productId, currentQuantity + quantity)
  }

  const setItemQuantity = (productId, quantity) => {
    quantity = Number(quantity)

    setCartItems(prevCartItems => {
      const newCartItems = new Map(prevCartItems)
      newCartItems.set(productId, quantity)

      console.log("quantity", newCartItems.get(productId))
      return newCartItems
    })
  }

  const deleteFromCart = (productId) => {
    setCartItems(prevCartItems => {
      const newCartItems = new Map(prevCartItems)
      newCartItems.delete(productId)

      return newCartItems
    })
  }

  return <ShopContext.Provider value={{cartItems, addToCart, setItemQuantity, deleteFromCart}}>{children}</ShopContext.Provider>;
}
