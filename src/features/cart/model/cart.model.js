// Please don't change the pre-written code
// Import the necessary modules here

import { fetchAllProducts } from "../../product/model/product.model.js";

let cartId = 0;
export class cartModel {
  constructor(userId, productId, quantity) {
    this.id = ++cartId;
    this.userId = userId;
    this.productId = productId;
    this.quantity = Number(quantity);
  }
}
const cartItems = [new cartModel(1, 2, 5), new cartModel(3, 3, 10)];

export const addToCart = (userId, productId, quantity) => {
  // Write your code here
  const cartItemIndex = cartItems.findIndex(
    (item) => item.userId === userId && item.productId === productId
  );
  if (cartItemIndex !== -1) {
    cartItems[cartItemIndex].quantity += Number(quantity);
    const userItems = cartItems.filter((item) => item.userId === userId);
    return { success: true, item: userItems };
  } else {
    const newCartItem = new cartModel(userId, productId, quantity);
    cartItems.push(newCartItem);
    const userItems = cartItems.filter((item) => item.userId === userId);
    return { success: true, item: userItems };
  }
};

export const removeFromCart = (userId, cartItemId) => {
  // Write your code here
  const itemIndex = cartItems.findIndex(
    (item) => item.userId === userId && item.id == cartItemId
  );
  if (itemIndex !== -1) {
    const removedItem = cartItems.splice(itemIndex, 1);
    return {
      success: true,
      deletedCartItem: removedItem,
    };
  } else {
    return {
      success: false,
      msg: "operation not allowed",
    };
  }
};
