import express from "express";
import productControllers from "./product.controller.js";
import { fileUploadMiddleware } from "../../middlewares/fileUpload.middleware.js";
const productsRoutes = express.Router();

const controllers = new productControllers();
productsRoutes.get("/filter", controllers.filterProducts);

productsRoutes.get("/", controllers.getAllProducts);
productsRoutes.get("/rating", controllers.rateProduct);

productsRoutes.post(
  "/",
  fileUploadMiddleware.single("imageUrl"),
  controllers.addProduct
);

productsRoutes.get("/:id", controllers.getSingleProduct);

export default productsRoutes;
