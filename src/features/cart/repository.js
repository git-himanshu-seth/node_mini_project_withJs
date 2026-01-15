import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

export class cartRepository {
  constructor() {
    this.collectionName = "cart";
  }
  getCartItems = async (userId) => {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return result;
    } catch (err) {
      throw new ApplicationError("Invalid userDetails.", 400);
    }
  };
  addToCart = async (cartItem) => {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.updateOne(
        { userId: cartItem.userId, productId: cartItem.productId },
        { $inc: { quantity: cartItem.quantity } },
        { upsert: true }
      );
      return result;
    } catch (err) {
      throw new ApplicationError("Invalid cart Info.", 400);
    }
  };

  deleteCartItem = async (cartDetails) => {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartDetails.itemId),
        userId: new ObjectId(cartDetails.userId),
      });
      return result;
    } catch (err) {
      throw new ApplicationError("Item not found.", 400);
    }
  };
}
