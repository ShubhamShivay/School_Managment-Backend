import express from "express";
import {
  studentRegistration,
  studentLogin,
  getAllStudents,
  updateStudent,
  updateExamResult,
  updateWrongEntry,
} from "../controllers/studentCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const studentRoute = express.Router();

studentRoute.post("/register", isLoggedIn, isAdmin, studentRegistration);
studentRoute.post("/login", studentLogin);
studentRoute.get("/all", isLoggedIn, isAdmin, getAllStudents);
studentRoute.put("/update-by-admin", isLoggedIn, isAdmin, updateStudent);
studentRoute.put(
  "/update-exam-result/:identifier",
  isLoggedIn,
  isAdmin,
  updateExamResult
);
studentRoute.put(
  "/update-wrong-entry/:identifier",
  isLoggedIn,
  isAdmin,
  updateWrongEntry
);

export default studentRoute;
