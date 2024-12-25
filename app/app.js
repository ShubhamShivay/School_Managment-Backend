import "dotenv/config";
import express from "express";
import connectDB from "../config/dbConnect.js";
import userRoute from "../routes/userRoute.js";
import {
  globalErrorHandler,
  notFound,
} from "../middleware/globalErrorHandler.js";
import studentRoute from "../routes/studentRoute.js";

const app = express();

connectDB();

//! Pass incoming data to JSON
app.use(express.json());

//! Routes
app.use("/api/users", userRoute);
app.use("/api/students", studentRoute);

//! Error handler
app.use(notFound);
app.use(globalErrorHandler);

export default app;
