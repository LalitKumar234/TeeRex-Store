import { createContext, useContext, useEffect, useReducer } from "react";
import { cartReducer } from "./reducers";

const Cart = createContext();

const Context = ({ children }) => {

    const initialCartItems = () => {
        const cartItems = localStorage.getItem('cartItems')
        return cartItems ? JSON.parse(cartItems) : []
      }

    const [state, dispatch] = useReducer(cartReducer, {
        cart: initialCartItems()
    })
    useEffect(()=>{
        localStorage.setItem('cartItems', JSON.stringify(state.cart))
    },[state.cart])
    return <Cart.Provider value={{ state, dispatch }}>{children}</Cart.Provider>
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}