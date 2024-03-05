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
import { getUserAsync, selectLoggedUsers } from "./features/auth/AuthSlice";
import {
  fetchCartByUserAsync,
  selectCartItems,
  storeCartTotal,
} from "./features/cart/cartSlice";
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
import OrderHistoryPage from "./pages/OrderHistoryPage";
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
  {
    path: "/OrderHistory",
    element: <OrderHistoryPage></OrderHistoryPage>,
  },
]);

function App() {
  const products = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedUsers);
  const subTotal = products.reduce((acc, curr) => acc + curr.totalPrice, 0);

  // console.log({products});
  // console.log({subTotal})

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          await Promise.all([
            dispatch(fetchCartByUserAsync()),
            dispatch(getUserAsync()),
            dispatch(getorderdetailbyuserAsync()),
          ]);
          dispatch(storeCartTotal(subTotal));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
  
    fetchData();
  }, [dispatch, user, subTotal]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
