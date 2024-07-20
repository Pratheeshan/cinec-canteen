const INITIAL_STATE = {
    cart: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART": {
            const existingCartItem = state.cart.find(i => i.item.id === action.payload.item.id);
            
            if (existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map(i => 
                        i.item.id === action.payload.item.id
                        ? { ...i, quantity: i.quantity + action.payload.quantity }
                        : i
                    )
                }
            } else {
                return {
                    ...state,
                    cart: [...state.cart, action.payload]
                }
            }
        }

        case "REMOVE_FROM_CART" : return {
            ...state,
            cart: state.cart.filter(i => i.item.id !== action.payload.id)
        }

        default: return state
    }
}

export default cartReducer