import React from 'react'
import NavBar from '../features/product/NavBar'
import ProductList from '../features/product/ProductList'


export default function Home() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
         {/* ProductList is a Children of NavBar */}
      </NavBar>
    </div>
  )
}

