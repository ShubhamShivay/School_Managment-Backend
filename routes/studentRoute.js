import express from "express";
import {
  studentRegistration,
  studentLogin,
  getAllStudents,
  updateStudent,
} from "../controllers/studentCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const studentRoute = express.Router();

studentRoute.post("/register", isLoggedIn, isAdmin, studentRegistration);
studentRoute.post("/login", studentLogin);
studentRoute.get("/all", isLoggedIn, isAdmin, getAllStudents);
studentRoute.put("/update-by-admin", isLoggedIn, isAdmin, updateStudent);

export default studentRoute;
