import express from "express";
import AuthRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import ConnectDB from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import MessageRoutes from "./routes/message.routes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT:${process.env.PORT}`);
  ConnectDB();
});
