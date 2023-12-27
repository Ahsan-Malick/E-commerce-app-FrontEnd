import React from "react";

export function PostCartItems(cartData) {
  return new Promise(async (resolve) => {
    const user = await checkIfCartItemExists(cartData.title, cartData.user)
    console.log(cartData.title);
    if(user.length===0){
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


async function checkIfCartItemExists(title, user) {
  try {
    if(title&&user){
    const response = await fetch(`http://localhost:8080/cart?user=${user}&title=${title}`);
    const cartItems = await response.json();
    // console.log(cartData);
    // console.log(cartItems);
    console.log(cartItems);
    return cartItems;
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

export function DeleteCartItems(id, userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({status: "success" });
  });
}

export function CartReset(UserId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?user=${UserId}`);
    const items = await response.json();
    items.forEach(async(element) => {await DeleteCartItems(element.id)})

    // for (let item in items){
    //   await DeleteCartItems(item.user);
    // }
    resolve({data:[]});
  });
}
