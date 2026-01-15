// Please don't change the pre-written code
// Import the necessary modules here

import { cartModel } from "../model/cart.model.js";
import { cartRepository } from "../repository/cart.repository.js";

export class cartController {
  constructor() {
    this.repository = new cartRepository();
  }

  getCartItemsController = async (req, res) => {
    const userId = req.userId;
    console.log("userId", userId);
    const result = await this.repository.getCartItems(userId);
    res.status(200).json({ status: "success", items: result });
  };

  addToCartController = async (req, res) => {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const cartItem = new cartModel(userId, productId, quantity);
    await this.repository.addToCart(cartItem);
    return res.status(201).send("Cart updated successfully.");
  };

  removeFromCartController = async (req, res) => {
    // Write your code here
    const userId = req.userId;
    const itemId = req.params.itemId;
    await this.repository.deleteCartItem({ userId, itemId });
    return res.status(200).send("Item Deleted successfully.");
  };
}
