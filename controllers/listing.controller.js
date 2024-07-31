import { ListingModel } from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const newListings = ListingModel(req.body)
    await newListings.save()
    return res
      .status(201)
      .json({ message: "listing created successfully", listing: newListings });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
