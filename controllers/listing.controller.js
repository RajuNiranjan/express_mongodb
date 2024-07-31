import { ListingModel } from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    if (req.user.id === req.body.user) {
      const newListings = new ListingModel(req.body);
      await newListings.save();
      return res
        .status(201)
        .json({ message: "listing created successfully", listing: newListings });
    }
    return res.status(401).json({ message: "You can add from your account only" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
