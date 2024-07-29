import express from "express";
import { register } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
