import express from "express";
import dotenv from "dotenv";
import "./db.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routers/auth.router.js";
import { listingRouter } from "./routers/listing.route.js";
import { UserRouter } from "./routers/user.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser())

app.listen(PORT, () => console.log(`server connected to port number ${PORT}`));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to express_mongodb" });
});

app.use("/api/auth", authRouter);
app.use("/api/listings", listingRouter);
app.use('/api/user', UserRouter)