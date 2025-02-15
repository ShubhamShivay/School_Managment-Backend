import "dotenv/config";
import express from "express";
import connectDB from "../config/dbConnect.js";
import {
  globalErrorHandler,
  notFound,
} from "../middleware/globalErrorHandler.js";
import studentRoute from "../routes/studentRoute.js";
import bookRoute from "../routes/booksRoute.js";
import adminRoute from "../routes/adminRoute.js";
import classRoute from "../routes/classRoute.js";
import subRoute from "../routes/subRoute.js";
import teacherRoute from "../routes/teacherRoute.js";

const app = express();

connectDB();

//! Pass incoming data to JSON
app.use(express.json()); // Middleware to parse incoming JSON data

//! Routes
app.use("/api/admins", adminRoute);
app.use("/api/students", studentRoute);
app.use("/api/books", bookRoute);
app.use("/api/classes", classRoute);
app.use("/api/subjects", subRoute);
app.use("/api/teachers", teacherRoute);

//! Error handler
app.use(notFound);
app.use(globalErrorHandler);

export default app;
