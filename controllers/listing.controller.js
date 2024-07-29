import { ListingModel } from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  const { title, description, location, offer_price, regular_price, images } =
    req.body;

  if (
    !title ||
    !description ||
    !location ||
    !offer_price ||
    !regular_price ||
    !images
  ) {
    return res.status(401).json({ message: "all fields are required" });
  }
  try {
    const listing = ListingModel({
      title,
      description,
      location,
      offer_price,
      regular_price,
      images,
    });
    await listing.save();

    return res
      .status(201)
      .json({ message: "listing created successfully", listing: listing });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
