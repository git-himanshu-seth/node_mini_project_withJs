import { ApplicationError } from "../../../errorHandler/applicationError.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repository/user.repository.js";
import { userModal } from "../model/user.model.js";

export class userController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  registerUser = async (req, res) => {
    const { name, email, password, type, phoneNumber } = req.body;
    console.log(req.body);
    const user = new userModal(name, email, password, type, phoneNumber);
    console.log("USER Data:", user);
    const result = await this.userRepository.userSingIn(user);
    if (result) {
      return res.status(201).send("user Created success.");
    } else {
      return res.status(400).send("user already exists");
    }
  };

  loginUser = async (req, res) => {
    const { email, password } = req.body;
    let token = await this.userRepository.userSingUp(email, password);
    res
      .status(201)
      .cookie("jwtToken", token, { maxAge: 900000, httpOnly: false })
      .json({ status: "success", msg: "User login successful.", token });
  };
}
