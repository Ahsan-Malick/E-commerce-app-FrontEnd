// A mock function to mimic making an async request for data
export function FetchAllProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({data });
  });
}

export function FetchProductsByFilters(filter, sort, paginate) {
  //filter = {category: ['smartphones', 'laptops']}
  //paginate= ?_page=1&_limit=6
  let query = "";
  for (let key in filter) {
    const arrayValues = filter[key];
    if (arrayValues.length > 0) {
      const lastVal = arrayValues[arrayValues.length - 1];
      query += `${key}=${lastVal}&`;
    }
  }
  for (let key in sort) {
    query += `${key}=${sort[key]}&`;
  }

  for (let key in paginate) {
    query += `${key}=${paginate[key]}&`;}
    
  

  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8080/products?${query}`);
    const data = await response.json();
    const totalItems = 30;
    resolve({data:{products: data, totalItems:totalItems}});
  });
}

export function FetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({data});
  });
}


export function FetchCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/category");
    const data = await response.json();
    resolve({data});
  });
}

export function FetchOneProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`);
    const data = await response.json();
    resolve({data});
  });
}
