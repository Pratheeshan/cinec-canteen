const INITIAL_STATE = {
    cart: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART": return {
            ...state,
            cart: [...state.cart, action.payload]
        }

        case "REMOVE_FROM_CART" : return {
            ...state,
            cart: state.cart.filter(i => i.item.name !== action.payload.name)
        }

        default: return state
    }
}

export default cartReducer