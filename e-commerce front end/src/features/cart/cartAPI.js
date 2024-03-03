

export function PostCartItems(cartData) {
  return new Promise(async (resolve, reject) => {
    const user = await checkIfCartItemExists(cartData.product);
    if(!user){
    const response = await fetch("http://localhost:8080/cart",
    {
      method: "POST",
      body: JSON.stringify(cartData),
      headers: { "Content-Type": "application/json" },
    });
    console.log('post done')
    const data = await response.json();
    resolve({ data });
    alert('Item Added Successfully');
  } else {
    alert('Item Already Added!');
    reject();
  }
  });
}




async function checkIfCartItemExists(productId) {
  try {
    if(productId){
    const response = await fetch(`http://localhost:8080/cart?product=${productId}`);
    const cartItems = await response.json();
    return cartItems;
    }
  } catch (error) {
    console.error("Error checking existing cart items:", error);
    throw error;
  }
}

export function cartByUser(){
  return new Promise (async(resolve)=>{
    const response = await fetch(`http://localhost:8080/cart`)
    const data = await response.json();
    resolve({data})
  })
}

export function CartUpdate(product) {
  return new Promise(async (resolve) => {
    console.log(product.price)
    const response = await fetch(`http://localhost:8080/cart?product=${product.product.id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    resolve({ data });
  });
}

export function CartDelete(id) {
  return new Promise(async (resolve) => {
    try{
    const response = await fetch(`http://localhost:8080/cart/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    resolve({ data: { itemid: id } });
  } catch(error){
    console.log({error: error});
  }
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
    const response = await fetch(`http://localhost:8080/cart/reset`);
    const data= await response.json();

    resolve({data});
  });
}
