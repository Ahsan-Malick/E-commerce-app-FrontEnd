import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderDetail, fetchOrderDetailByUser } from "./orderAPI";

const initialState = {
  orderdetail: [],
  status: "idle",
  orderstate: false,
  error: null,
};

export const getorderdetailAsync = createAsyncThunk(
  "order/getorderdetail",
  async (data) => {
    const response = await fetchOrderDetail(data);
    return response.data;
  }
);

export const getorderdetailbyuserAsync = createAsyncThunk(
  "order/getorderdetailbyuser",
  async (id) => {
    const response = await fetchOrderDetailByUser(id);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "orders",
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
      .addCase(getorderdetailAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getorderdetailAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderdetail = action.payload;
        state.orderstate = true;
      })
      .addCase(getorderdetailAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(getorderdetailbyuserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getorderdetailbyuserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orderdetail = action.payload;
        state.orderstate = true;
      });
  },
});

export const { increment, decrement, incrementByAmount } = orderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectOrderDetail = (state) => state.order.orderdetail;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default orderSlice.reducer;
