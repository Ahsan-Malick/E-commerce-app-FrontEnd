const orderSum=[];
export const calculateProductGroupSubtotal = (productGroup) => {
  let sum = productGroup.productdetail.reduce(
    (subtotal, prod) => subtotal + prod.price * prod.quantity,
    0,
  );
  orderSum.push(sum);
  return sum;
  };
  
  // Function to calculate subtotal for all products
  export const calculateTotalSubtotal = (allProducts) => {
    let totalSum = allProducts.reduce(
      (totalSubtotal, productGroup) =>
        totalSubtotal + calculateProductGroupSubtotal(productGroup),
      0,
    );
    return totalSum;
  };

  export const getOrderSum = (prod) => {
    calculateTotalSubtotal(prod);
    return orderSum;}