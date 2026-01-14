import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../errorHandler/applicationError.js";

export class productRepository {
  constructor() {
    this.collectionName = "products";
  }
  addProducts = async ({ name, desc, price, size, category } = product) => {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const product = await collection.insertOne({
        name,
        desc,
        price,
        size,
        category,
      });
      return product;
    } catch (err) {
      throw new ApplicationError("Invalid user", 400);
    }
  };
  async getAllProducts() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.find().toArray();
      return result;
    } catch (err) {
      throw new ApplicationError("Invalid user", 400);
    }
  }
  async getOneProduct(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const result = await collection.findOne(new ObjectId(id));
      return result;
    } catch (err) {
      throw new ApplicationError("Invalid key or invalid user type", 400);
    }
  }
}
