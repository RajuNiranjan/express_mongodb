import express from "express";
import { logIn, logOut, register } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
authRouter.get('/logout', logOut)
