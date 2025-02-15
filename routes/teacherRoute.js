import express from "express";
import {
  createTeacher,
  teacherLogin,
  getAllTeachers,
  getTeacher,
} from "../controllers/teacherCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
const teacherRoute = express.Router();

teacherRoute.post("/create", isLoggedIn, isAdmin, createTeacher);
teacherRoute.post("/login", teacherLogin);
teacherRoute.get("/all", isLoggedIn, isAdmin, getAllTeachers);
teacherRoute.get("/get", isLoggedIn, getTeacher);

export default teacherRoute;
