export const cartReducer = (state, action) => {
    switch (action.type) {
        case "addToCart":
            return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] }
        case "removeFromCart":
            return {
                ...state, cart: state.cart.filter(prod =>
                    prod.id !== action.payload.id
                )
            }
        case "increment":
            return {
                ...state, cart: state.cart.filter(prod =>
                    prod.id === action.payload.id && prod.quantity > prod.qty ?
                        prod.qty += 1 : prod.qty
                )
            }
        case "decrement":
            return {
                ...state, cart: state.cart.filter(prod =>
                    prod.id === action.payload.id && prod.qty > 0 ?
                        prod.qty -= 1 : prod.qty
                )
            }
        default:
            return state
    }
}
