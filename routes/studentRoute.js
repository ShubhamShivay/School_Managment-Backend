import express from "express";
import {
  studentLogin,
  studentRegistration,
  studentLogout,
  getStudent,
} from "../controllers/studentCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const studentRoute = express.Router();

studentRoute.post("/register", studentRegistration);
studentRoute.post("/login", studentLogin);
studentRoute.get("/profile", isLoggedIn, getStudent);
studentRoute.post("/logout", studentLogout);

export default studentRoute;
