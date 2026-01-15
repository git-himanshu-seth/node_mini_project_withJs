import { MongoClient } from "mongodb";
import { ApplicationError } from "../errorHandler/applicationError.js";

const url = "mongodb://localhost:27017/ecomdb";
let client = null;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongodb is connected");
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};

export const getDB = () => {
  console.log("client", client);
  if (!client) {
    throw new ApplicationError(
      "Database not connected. Call connectToMongoDB first.",
      400
    );
  }
  return client.db();
};

const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  try {
    await db.collection("products").createIndex({ price: 1 });
    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ desc: "text" });
  } catch (err) {
    console.log(err);
  }
  console.log("Indexes are created");
};
