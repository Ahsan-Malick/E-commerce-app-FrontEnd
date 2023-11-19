import React from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetail from './features/product/components/ProductDetail';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home></Home>
    )
  },
  {
    path: "SignIn",
    element: (<Login></Login>),
  },
  {
    path: "SignUp",
    element: (<SignUp></SignUp>),
  },
  {
    path: "cart",
    element: (<CartPage></CartPage>),
  },
  {
    path: "checkout",
    element: (<Checkout></Checkout>),
  },

  {
    path: "/productdetail/:id",
    element: (<ProductDetailPage></ProductDetailPage>),
  },
]);



function App() {
  return (
    <div className="App">
<RouterProvider router={router} />
    </div>
  );
}

export default App;
