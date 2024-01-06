import { useSelector } from "react-redux";
import { selectOrderDetail } from "./orderSlice";
import { useEffect, useState } from "react";
import { selectCartItems } from "../cart/cartSlice";

function OrdersDetail() {
  const ordersDetail = useSelector(selectOrderDetail);
  const check = true;
  const objectLength = ordersDetail.length;

  
 

  return (
    <>
      {/* <div>hello order detail</div> */}
      {check && (
        <div className="mx-auto mt-10 max-w-7xl px-12 sm:px-6 lg:px-12">
          <h2 className="text-3xl text-start font-semibold">Order History</h2>
          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {ordersDetail.map((detail, index) => (
                    <>
                    <div className="text-2xl text-start font-semibold">Order# {index+1}  </div>
                  <li key={detail.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={detail.productdetail.thumbnail}
                        alt={detail.productdetail.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col mb-4">
                      <div>
                        <div className="flex justify-between text-base font-semibold text-gray-900">
                          <h3>
                            <a href="">{detail.productdetail.title}</a>
                          </h3>
                          <p className="font-semibold ml-4">
                            Total Cost: £
                            {detail.productdetail.price *
                              detail.productdetail.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {detail.productdetail.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {/* <div className="text-gray-500">
                        Qty
                        <select onChange={(e) => handleQty(e, product)}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </select>
                      </div> */}

                        <div className="flex">
                          {/* <button
                          onClick={() => handleDelete(product.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button> */}
                        </div>
                      </div>
                    </div>
                  </li>
                  </>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p className="font-bold"> Subtotal</p>
            {products.length > 0 ? (
              <p className="font-semibold">
                £{products.reduce((sum, prod) => sum + prod.price, 0) * qty}
              </p>
            ) : (
              <p>£0</p>
            )}
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div> */}
        </div>
      )}
    </>
  );
}

export default OrdersDetail;
