import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productListSlice'
import authReducer from '../features/auth/AuthSlice';
import cartSlice from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartSlice,
  },
});
