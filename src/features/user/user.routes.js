import express from "express";
import { UserController } from "./user.controller.js";

const userController = new UserController();
const userRouter = express.Router();
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
