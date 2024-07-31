import express from "express";
import { createListing } from "../controllers/listing.controller.js";


export const listingRouter = express.Router();

listingRouter.post("/createlisting", createListing);
