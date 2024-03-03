export function fetchOrderDetail(orderdata) {
  return new Promise(async (resolve, reject) => {
    try{
    if (orderdata.Address) {
      const response = await fetch("http://localhost:8080/order", {
        method: "POST",
        body: JSON.stringify(orderdata),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } else {
      reject("error");
    }
  }catch(error){
    console.log({ALERT: error})
  }
});
}

export function fetchOrderDetailByUser() {
  return new Promise(async (resolve, reject) => {
    try{
    
      const response = await fetch(`http://localhost:8080/order`);
      const data = await response.json();
      resolve({ data });
    
    } catch(err){
      console.log({fetchorderbyiderror: err})
    }
  });
}
