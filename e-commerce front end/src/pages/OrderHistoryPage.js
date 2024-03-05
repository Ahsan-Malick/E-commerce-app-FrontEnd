import React from 'react';
import OrderHistory from '../features/order/orderHistory';
import NavBar from '../features/product/NavBar';

export default function OrderHistoryPage() {
  return (
    <div>
      <NavBar></NavBar>
      <OrderHistory></OrderHistory>
    </div>
  )
}
