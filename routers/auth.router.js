import express from "express";
import { logIn, register } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", logIn);
