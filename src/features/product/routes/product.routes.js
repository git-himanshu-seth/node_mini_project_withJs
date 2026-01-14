import express from "express";
import { productController } from "../controller/product.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.js";

const router = express.Router();
const controller = new productController();
// get routes
// router.route("/").get(authorizer, getAllProducts);
router.route("/").get(jwtAuth, controller.getAllProducts);
// router.route("/:id").get(getOneProduct);

// // post routes
router.route("/").post(controller.addProduct);
// router.route("/rateproduct").post(rateProduct);

export default router;
