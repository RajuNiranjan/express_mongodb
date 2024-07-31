import { UserModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";

export const updateUser = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res
        .status(401)
        .json({ message: "you can't change others profiles info" });
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 12);
    }

    const updateUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "user not found" });
    }

    const userResponse = {
      id: updateUser._id,
      userName: updateUser.userName,
      email: updateUser.email,
      avatar: updateUser.avatar,
    };

    return res.status(200).json({
      message: "user updated successfully",
      updatedUser: userResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export const deleteAccount = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res
        .status(401)
        .json({ message: "You can't delete other's account" });
    }
    const user = await UserModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Account Deleted Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
