import React from 'react'
import NavBar from '../features/product/NavBar'
import ProductDetail from '../features/product/components/ProductDetail'


export default function ProductDetailPage() {
  return (
    <div>
      <NavBar>
        <ProductDetail></ProductDetail>
         {/* ProductList is a Children of NavBar */}
      </NavBar>
    </div>
  )
}
