import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_Connect = async () => {
  try {
    const db_uri = process.env.DB_URI;
    await mongoose
      .connect(db_uri)
      .then(() => console.log("server connected database"))
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
DB_Connect();
