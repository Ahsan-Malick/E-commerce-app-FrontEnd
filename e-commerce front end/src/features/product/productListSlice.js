import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchAllProducts, FetchProductsByFilters, FetchBrands, FetchCategory, FetchOneProduct} from './productListAPI';
import ProductDetail from './components/ProductDetail';

const initialState = {
  products: [],
  brands: [],
  category:[],
  totalItems: 0,
  status: 'idle',
  ProductDetail:null,
  
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchallproductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await FetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchproductsbyfiltersAsync = createAsyncThunk(
  'product/fetchproductsbyfilter',
  
  async ({filter,sort, paginate}) => {
    const response = await FetchProductsByFilters(filter,sort,paginate);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await FetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  'product/fetchCategory',
  async () => {
    const response = await FetchCategory();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchOneProductAsync = createAsyncThunk(
  'product/fetchOneProduct',
  async (id) => {
    const response = await FetchOneProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);




export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchallproductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchallproductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchproductsbyfiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchproductsbyfiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.brands=action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.category=action.payload;

      })
      .addCase(fetchOneProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOneProductAsync.fulfilled, (state,action) => {
        state.status = 'idle';
        state.ProductDetail = action.payload;

      });
  },
});


export const { increment, decrement, incrementByAmount } = productSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOneProduct = (state) => state.product.ProductDetail;
export const selectAllProducts = (state) => state.product.products;
export const selectItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategory = (state) => state.product.category;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default productSlice.reducer;