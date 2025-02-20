import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import ConnectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT:${process.env.PORT}`);
  ConnectDB();
});
