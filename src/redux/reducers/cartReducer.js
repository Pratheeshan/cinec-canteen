const INITIAL_STATE = {
    cart: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_TO_CART": return {
            ...state,
            cart: [...INITIAL_STATE, action.payload]
        }

        default: return state
    }
}

export default cartReducer