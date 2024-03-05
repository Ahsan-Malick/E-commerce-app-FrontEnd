import React, { useContext, useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetail from "./features/product/components/ProductDetail";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedUsers } from "./features/auth/AuthSlice";
import { fetchCartByUserAsync } from "./features/cart/cartSlice";
import {
  fetchaddressebyidAsync,
  saveaddressesAsync,
  selectAddresses,
} from "./features/stacklist/stacklistSlice";
import OrderPage from "./features/order/order";
import NotFound from "./pages/NotFound";
import OrdersDetail from "./features/order/orderDetail";
import {
  getorderdetailAsync,
  getorderdetailbyuserAsync,
} from "./features/order/orderSlice";

import UserProfile from "./features/profile/profile";
import Logout from "./pages/Logout";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "SignIn",
    element: <Login></Login>,
  },
  {
    path: "SignUp",
    element: <SignUp></SignUp>,
  },
  {
    path: "cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },

  {
    path: "/productdetail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/order",
    element: (
      <Protected>
        <OrderPage></OrderPage>
      </Protected>
    ),
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "/ordersdetail",
    element: <OrdersDetail></OrdersDetail>,
  },
  {
    path: "/profile",
    element: <UserProfile></UserProfile>,
  },
  {
    path: "/logout",
    element: (
      <Protected>
        <Logout></Logout>
      </Protected>
    ),
  },
]);

function App() {
  // const orderData = useContext()

  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUsers);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartByUserAsync(user.id));
      dispatch(fetchaddressebyidAsync(user.id));
      dispatch(getorderdetailbyuserAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
