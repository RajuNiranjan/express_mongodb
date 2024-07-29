import { UserModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(401).json({ message: "All fields are required" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({ message: "email already existed" });
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = UserModel({ userName, email, password: hashPassword });

    await newUser.save();

    const userResponse = {
      id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
    };

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
