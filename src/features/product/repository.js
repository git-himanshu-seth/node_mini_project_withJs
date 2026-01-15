import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../errorHandler/applicationError.js";

export class productRepository {
  constructor() {
    this.collectionName = "products";
    this.ratingCollectionName = "ratings";
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

  async filterProducts({ category, desc, maxPrice, minPrice } = filterValues) {
    try {
      console.log(category, desc, maxPrice, minPrice);
      let query = [];
      if (maxPrice) {
        const queryObject = { price: { $lte: parseFloat(maxPrice) } };
        query.push(queryObject);
      }
      if (minPrice) {
        const queryObject = { price: { $gte: parseFloat(minPrice) } };
        query.push(queryObject);
      }
      if (category) {
        let catArray = JSON.parse(category.replace(/'/g, '"'));
        category = catArray;
        const queryObject = { category: { $in: category } };
        query.push(queryObject);
      }
      // Hold for the advance search
      // if (desc) {
      //   query.push({ $text: { $search: desc } });
      // }
      const db = getDB();
      const collect = db.collection(this.collectionName);
      console.log(query);
      const filteredProducts = await collect.find({ $and: query }).toArray();
      return filteredProducts;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with query.", 400);
    }
  }

  async rateProduct(rating) {
    try {
      console.log(rating);
      const db = getDB();
      const collection = db.collection(this.ratingCollectionName);
      await collection.updateOne(
        {
          userId: new ObjectId(rating.userId),
          productId: new ObjectId(rating.productId),
        },
        {
          $set: {
            rating: rating?.rating,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      throw new ApplicationError("Invalid details.", 400);
    }
  }
  async averageProductPricePerCategory() {
    try {
      const db = getDB();
      return await db
        .collection(this.collectionName)
        .aggregate([
          {
            // Stage 1: Get Vaerge price per category
            $group: {
              _id: "$category",
              averagePrice: { $avg: "$price" },
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
}
