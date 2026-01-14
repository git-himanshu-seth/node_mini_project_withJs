import bcrypt from "bcrypt";
import { getDB } from "../../../config/mongodb.js";
import { ApplicationError } from "../../../errorHandler/applicationError.js";
import jwt from "jsonwebtoken";
export class UserRepository {
  constructor() {
    this.collectionName = "user";
  }
  userSingIn = async ({ email, password, name, phoneNumber, type } = user) => {
    try {
      const db = getDB();
      const userCollection = db.collection(this.collectionName);

      const userExist = await userCollection.findOne({
        email: email,
      });
      if (userExist) {
        return;
      }
      // Use async/await for bcrypt methods
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        email: email,
        password: hashedPassword,
        name: name,
        phoneNumber: phoneNumber,
        type: type,
      };
      await userCollection.insertOne(user);

      return user;
    } catch (err) {
      throw new ApplicationError("Error in user sign in", 400);
    }
  };

  userSingUp = async (email, password) => {
    try {
      const db = getDB();
      const userCollection = db.collection(this.collectionName);
      const user = await userCollection.findOne({ email: email });
      console.log("user", user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { userId: user._id, userEmail: user.email },
          "149336e1b8f56ea04cf10bca3af5e72d",
          { expiresIn: "1h" }
        );
        return token;
      }
    } catch (err) {
      throw new ApplicationError("invalid credentials.", 400);
    }
  };
}
