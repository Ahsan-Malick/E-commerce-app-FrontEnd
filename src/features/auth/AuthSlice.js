import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CheckUser, CreateUser, getUser } from "./AuthAPI";
import { productSliceAPI } from "./AuthAPI";

const initialState = {
  LoggedInUser: null,
  UserInfo: null,
  status: "idle",
  error: null,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (userData) => {
    const response = await CreateUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "users/checkUser",
  async (loginInfo) => {
    const response = await CheckUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getUserAsync = createAsyncThunk("users/getUser", async () => {
  const response = await getUser();
  // The value we return becomes the `fulfilled` action payload
  return response.data;
});
export const userSlice = createSlice({
  name: "user",
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
    LoggedOut: (state, action) => {
      state.LoggedInUser = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.LoggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "fulfilled";
        state.error = action.error;
      })
      .addCase(getUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserInfo = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "fulfilled";
        state.error = action.error;
      });
  },
});

export const { increment, decrement, LoggedOut } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoggedUsers = (state) => state.auth.LoggedInUser;
export const selectUserInfo = (state) => state.auth.UserInfo;
export const selectError = (state) => state.auth.error;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default userSlice.reducer;
