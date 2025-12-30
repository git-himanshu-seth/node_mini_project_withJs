import { UserModal } from "./user.modal.js";
import jsonwebtoken from "jsonwebtoken";
const secretKey = "JITcV1LvnRJf3GD6EwkxjbIc4ZKeXoqLrkSWY2gbn8D";
export class UserController {
  registerUser(req, res) {
    const { name, email, typeOfUser } = req.body;
    const newUser = UserModal.addUser(name, email, typeOfUser);
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  }
  loginUser(req, res) {
    const { email, password } = req.body;
    const user = UserModal.verifyUser(email, password);

    if (user) {
      const token = jsonwebtoken.sign(
        { id: user.id, email: user.email },
        secretKey,
        {
          expiresIn: "1d",
        }
      );
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          typeOfUser: user.typeOfUser,
        },
        token: token,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  }
}
