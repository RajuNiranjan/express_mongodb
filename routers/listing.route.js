import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { VerifyToken } from "../middleware/verifyToken.js";


export const listingRouter = express.Router();

listingRouter.post("/createlisting", VerifyToken, createListing);
