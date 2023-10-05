import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

export function useShopContext() {
    const context = useContext(ShopContext)
    if(!context) {
        throw Error('useShopContext must be used within ShopContextProvider')
    }

    return context
}