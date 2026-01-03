// Please don't change the pre-written code
// Import the necessary modules here

import { addToCart, removeFromCart } from "../model/cart.model.js";

export const addToCartController = (req, res) => {
  // Write your code here
  const userId = req.userId;
  const { productId, quantity } = req.query;

  if (productId && quantity) {
    const result = addToCart(
      Number(userId),
      Number(productId),
      Number(quantity)
    );
    return res.status(200).json(result);
  } else {
    return res
      .status(400)
      .json({ success: false, meg: "operation not allowed" });
  }
};

export const removeFromCartController = (req, res) => {
  // Write your code here
  const userId = req.userId;
  const cartItemId = req.params.itemId;
  if (cartItemId) {
    return res.status(200).json(removeFromCart(userId, Number(cartItemId)));
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "operation not allowed" });
  }
};
