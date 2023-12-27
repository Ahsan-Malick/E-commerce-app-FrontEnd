import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productListSlice'
import authReducer from '../features/auth/AuthSlice';
import cartReducer from '../features/cart/cartSlice';
import stacklistReducer from '../features/stacklist/stacklistSlice';
import orderReducer from '../features/order/orderSlice';


export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    addresses: stacklistReducer,
    order: orderReducer,
  },
});
