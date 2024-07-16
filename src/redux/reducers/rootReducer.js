import {combineReducers} from 'redux'
import authReducer from './authReducer'
import cartReducer from './cartReducer'

import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer
})


export default persistReducer(persistConfig, rootReducer)