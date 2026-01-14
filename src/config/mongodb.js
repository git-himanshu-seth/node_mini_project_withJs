import { MongoClient } from "mongodb";
import { ApplicationError } from "../errorHandler/applicationError.js";

const url = "mongodb://localhost:27017/ecomdb";
let client = null;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      console.log("Connected to MongoDB");
      client = clientInstance;
      // You can perform database operations here
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
