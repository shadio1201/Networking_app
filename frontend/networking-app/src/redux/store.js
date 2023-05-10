import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import colorReducer from './colormode'


export default configureStore({
    reducer: {
        user: userReducer,
        colormode: colorReducer
    }
})