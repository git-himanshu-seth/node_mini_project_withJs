import express from "express";
import { userController } from "../controller/user.controller.js";

const { registerUser, loginUser } = new userController();

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
