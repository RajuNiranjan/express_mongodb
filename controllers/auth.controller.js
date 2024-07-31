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

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "All fields are required" });
  }
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    const userResponse = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, { httpOnly: true });

    return res
      .status(200)
      .json({ message: "user login successfully", user: userResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ message: "logedOut successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" })
  }
}

