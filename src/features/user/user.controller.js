import { UserModal } from "./user.modal.js";

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
      res.status(200).json({
        message: "User logged in successfully",
        user: user,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  }
}
