import express, { json, Router, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/user.routes.js"
const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//routes
app.use("/api/user",router);
export default app;
