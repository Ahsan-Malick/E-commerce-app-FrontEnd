import React, { createContext } from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Stacklist from "../features/stacklist/Stacklist";
import { useForm } from "react-hook-form";
import NavBar from "../features/product/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartAsync,
  selectCartItems,
  selectCartSubTotal,
  updateCartAsync,
} from "../features/cart/cartSlice";
import {
  fetchaddressebyidAsync,
  saveaddressesAsync,
  selectAddresses,
} from "../features/stacklist/stacklistSlice";
import { selectLoggedUsers, selectUserInfo } from "../features/auth/AuthSlice";
import { getorderdetailAsync } from "../features/order/orderSlice";
import { fetchAddressbyid } from "../features/stacklist/stacklistAPI";

export const Context = React.createContext();

function Checkout() {
  const dispatch = useDispatch();
  const products = useSelector(selectCartItems);
  const user = useSelector(selectUserInfo);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const subTotal = useSelector(selectCartSubTotal);
  const [errormsg, setErrorMsg] = useState(null);
  const [alertmsg, setAlertMsg] = useState(false);

  const cartProduct = products.map((product) => ({
    ...product.product,
    quantity: product.quantity,
    itemtotal: product.product.price * product.quantity,
  }));

  const totalSum = cartProduct.reduce(
    (acc, current) => acc + current.itemtotal,
    0
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(saveaddressesAsync({ ...data, user: user.id }));
  };

  const [qty, setQty] = useState(1);
  const [payment, setPayment] = useState(false);
  const handleQty = (e, product) => {
    dispatch(updateCartAsync({ ...product, quantity: +e.target.value }));
    setQty(e.target.value);
  };
  const orderData = {
    Address: selectedAddress,
    productdetail: cartProduct,
    payment: payment,
    subtotal: subTotal,
    user: user.id,
  };

  let newQty = 1;
  if (products) {
    newQty = products.map((iter) => iter.quantity);
    console.log(newQty);
  } else {
    newQty = 1;
  }
//  const subTotal = products.reduce((acc, curr)=>acc+curr.totalPrice,0);


  const handleDelete = (id) => {
    dispatch(deleteCartAsync(id));
  };

  const handleSave = (id) => {
    dispatch(fetchaddressebyidAsync(id));
  };

  const handlePayment = (e) => {
    setPayment(e.target.id);
  };

  const handleOrder = () => {
    if (
      Object.keys(selectedAddress).length > 0 &&
      cartProduct.length > 0 &&
      payment
    ) {
      dispatch(getorderdetailAsync(orderData));
    } else {
      alert("failed");
    }
  };

  const showAlert = () => {
    const missingInfo = [];
    if (!Object.keys(selectedAddress).length > 0) {
      missingInfo.push("address");
    }
    if (!products.length > 0) {
      missingInfo.push("items in cart");
    }
    if (!payment) {
      missingInfo.push("payment method");
    }
    setErrorMsg(missingInfo.join());
    let newAlert = !alertmsg;
    setAlertMsg(newAlert);
  };
  useEffect(() => {
    if (errormsg) {
      alert(`You have missing: ${errormsg}`);
    }
    // dispatch(fetchaddressebyidAsync(user.id));
  }, [errormsg, alertmsg]); // will try to move out ALERT of useEffect and move into some handler function

  const handleReset = () => {
    // Reset the entire form
    reset();
  };

  return (
    <>
      <NavBar> </NavBar>
      <div className="text-left grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:col-span-3 bg-slate-300 px-10">
          <div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <form
                className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      {...register("firstname", { require: "Required" })}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      {...register("lastname", { require: "Required" })}
                      id="last-name"
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      {...register("country", { required: "required" })}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>UK</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      {...register("street")}
                      id="street-address"
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      {...register("city", { required: "Required" })}
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      {...register("state")}
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      {...register("postcode", { required: "Required" })}
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={handleSave(user.id)}
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Address
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from existing addresses
              </p>
              <Context.Provider value={[selectedAddress, setSelectedAddress]}>
                <Stacklist></Stacklist>
              </Context.Provider>
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>

                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onClick={(e) => handlePayment(e)}
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        name="payment"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        onClick={(e) => handlePayment(e)}
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-slate-300">
          <div className="mx-auto mt-10 max-w-7xl px-12 sm:px-6 lg:px-12">
            <h2 className="text-3xl font-semibold">Shopping Cart</h2>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {products &&
                    products.map((product) => (
                      <li key={product.product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a
                                  className="font-semibold"
                                  href={product.product.href}
                                >
                                  {product.product.title}
                                </a>
                              </h3>
                              <p className="ml-4 font-semibold">
                                £{product.product.price}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              Qty
                              <select onChange={(e) => handleQty(e, product)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() => handleDelete(product.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                {products && products.length > 0 ? (
                  <p className="font-semibold">
                    £
                    {subTotal}
                  </p>
                ) : (
                  <p>£0</p>
                )}
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                {Object.keys(selectedAddress).length > 0 &&
                products.length > 0 &&
                payment ? (
                  <Link
                    to="/order"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    onClick={() => handleOrder()}
                  >
                    Order Now
                  </Link>
                ) : (
                  <div
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    onClick={() => showAlert()}
                  >
                    Order Now
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
