export function fetchAddressbyid(id) {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(`http://localhost:8080/addresses?id=${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAddresses(addressData) {
  return new Promise(async (resolve) => {
    const email = addressData.email;
    const check = await fetch(`http://localhost:8080/addresses?email=${email}`);
    const dataAd = await check.json();
    if (dataAd.length === 0) {
      const response = await fetch("http://localhost:8080/addresses", {
        method: "POST",
        body: JSON.stringify(addressData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    } else {
      resolve({ dataAd });
    }
  });
}

export function addressUpdate(update) {
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
