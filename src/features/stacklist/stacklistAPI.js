export function fetchAddressbyid(id) {
  return new Promise(async (resolve, reject) => {
    console.log('id')
    try{
    const response = await fetch(`http://localhost:8080/addresses?user=${id}`);
    const data = await response.json();
    resolve({ data });
    } catch (err){
      console.log({error: err})
    }
  });
}

export function fetchAddresses(addressData) {
  return new Promise(async (resolve) => {
    
    // const email = addressData.email;
    // const check = await fetch(`http://localhost:8080/addresses?email=${email}`); 
    // const dataAd = await check.json();
    // if (dataAd.length === 0) {
      //when using with monogodb, stucks here when try to get the response, POST is working. Working fine with JSON server.
      try{
        console.log('Patch')
      const response = await fetch("http://localhost:8080/addresses", {
        method: "PATCH",
        body: JSON.stringify(addressData),
        headers: { "Content-Type": "application/json" },
      });
      console.log('done')
      const data =  response.json();
      resolve({ data });
    } catch(err){
      console.log({message: err.message})
    }
    // } 
    //  else {
    //   console.log('rejected')
    //   resolve();
    // }
  });
}

// export function addressUpdate(update) {
//   return new Promise(async (resolve) => {
//     const response = await fetch(`http://localhost:8080/cart/${update.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await response.json();
//     resolve({ data });
//   });
// }

export function deleteAddress(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/addresses/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    resolve({data:{itemid:id}})
  });
}
