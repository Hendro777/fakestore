import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

export function ShopContextProvider({ children }) {
  const [cartItems, setCartItems] = localStorage.getItem("cart")
    ? useState(new Map(JSON.parse(localStorage.getItem("cart"))))
    : useState(new Map())

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify([...cartItems]))
  }, [cartItems])

  const addToCart = (productId, quantity) => {
    quantity = Number(quantity)

    const currentQuantity = cartItems.get(productId) || 0
    setItemQuantity(productId, currentQuantity + quantity)
  }

  const setItemQuantity = (productId, quantity) => {
    quantity = Math.min(Number(quantity), 10)

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
