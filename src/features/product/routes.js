import express from "express";
import { productController } from "./controller.js";
import jwtAuth from "../../middlewares/jwtAuth.js";

const router = express.Router();
const controller = new productController();
// get routes
router.route("/").post((req, res, next) => {
  controller.addProduct(req, res);
});
router.route("/filter").get(jwtAuth, (req, res, next) => {
  controller.filterProducts(req, res);
});
router.route("/").get(jwtAuth, (req, res, next) => {
  controller.getAllProducts(req, res);
});
router.route("/rate").post(jwtAuth, (req, res, next) => {
  controller.rateProduct(req, res);
});
router.get("/averagePrice", (req, res, next) => {
  controller.averagePrice(req, res);
});
router.route("/:id").get(controller.getOneProduct);

export default router;
