import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  offer_price: {
    type: Number,
    required: true,
  },
  regular_price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

export const ListingModel = mongoose.model("Listing", ListingSchema);
