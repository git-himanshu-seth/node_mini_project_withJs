import express from "express";
import { cartController } from "./controller.js";
import jwtAuth from "../../middlewares/jwtAuth.js";
const router = express.Router();
const cartControllers = new cartController();
router.route("/").get(jwtAuth, (req, res) => {
  cartControllers.getCartItemsController(req, res);
});
router.route("/").post(jwtAuth, (req, res) => {
  cartControllers.addToCartController(req, res);
});
router.route("/:itemId").delete(jwtAuth, (req, res) => {
  cartControllers.removeFromCartController(req, res);
});

export default router;
