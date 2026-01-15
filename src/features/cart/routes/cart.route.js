import express from "express";
import { cartController } from "../controller/cart.controller.js";
import jwtAuth from "../../../middlewares/jwtAuth.js";
const router = express.Router();
const cartControllers = new cartController();
router.route("/").get(jwtAuth, cartControllers.getCartItemsController);
router.route("/").post(jwtAuth, cartControllers.addToCartController);
router
  .route("/:itemId")
  .delete(jwtAuth, cartControllers.removeFromCartController);

export default router;
