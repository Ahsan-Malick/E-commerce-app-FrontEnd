import React from "react";

export function PostCartItems(cartData) {
  return new Promise(async (resolve) => {
    const user = await checkIfCartItemExists(cartData)
    if(!user){
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  } else {
    resolve();
  }
  });
}




async function checkIfCartItemExists(cartData) {
  try {
    if(cartData){
    const response = await fetch("http://localhost:8080/cart");
    const cartItems = await response.json();

    // Check if cartData already exists in the cartItems array
    const existingCartItem = cartItems.find((item) => item.id === cartData.id);

    return existingCartItem;
    }
  } catch (error) {
    console.error("Error checking existing cart items:", error);
    throw error;
  }
}

export function cartByUser(id){
  return new Promise (async(resolve)=>{
    const response = await fetch(`http://localhost:8080/cart?user=${id}`)
    const data = await response.json();
    resolve({data})
  })
}

export function CartUpdate(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function CartDelete(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    resolve({ data: { itemid: id } });
  });
}
