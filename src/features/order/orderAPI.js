export function fetchOrderDetail(orderdata) {
    return new Promise(async(resolve, reject) =>{
      if (orderdata.Address){
      const response = await fetch ('http://localhost:8080/order',{
        method: "POST",
        body: JSON.stringify(orderdata),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      resolve({data})}
      else{
        reject("error")
      }

    }
      
    );
  }