import express from "express";
import { userController } from "./controller.js";

const controller = new userController();

const router = express.Router();

router.route("/register").post((req, res) => {
  controller.registerUser(req, res);
});
router.route("/login").post((req, res) => {
  controller.loginUser(req, res);
});

export default router;
