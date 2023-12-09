import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productListSlice'
import authReducer from '../features/auth/AuthSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,

  },
});
