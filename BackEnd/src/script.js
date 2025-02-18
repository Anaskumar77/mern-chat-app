import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import ConnectDB from "./lib/db.js";
import UserModel from "./models/user.model.js";
dotenv.config();
const app = express();

app.use("api/routes", AuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT:${process.env.PORT}`);
  ConnectDB();
});
