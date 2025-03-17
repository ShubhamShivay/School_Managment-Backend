import expres from "express";
import {
  adminRegistration,
  adminLogin,
  getAdmin,
  updateAdmin,
  adminLogout,
  deleteAdmin,
  getAllTeachers,
  getAllClasses,
} from "../controllers/adminCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { getAllStudents } from "../controllers/studentCtrl.js";
import { studentRegistration } from "../controllers/studentCtrl.js";
import { createTeacher } from "../controllers/teacherCtrl.js";

const adminRoute = expres.Router();

adminRoute.post("/register", adminRegistration);
adminRoute.post("/login", adminLogin);
adminRoute.get("/profile", isLoggedIn, isAdmin, getAdmin);
adminRoute.put("/update", isLoggedIn, isAdmin, updateAdmin);
adminRoute.post("/logout", isLoggedIn, adminLogout);
// adminRoute.delete("/delete", isLoggedIn, isAdmin, deleteAdmin);
adminRoute.get("/teachers", isLoggedIn, isAdmin, getAllTeachers);
adminRoute.post("/add-student", isLoggedIn, isAdmin, studentRegistration);
adminRoute.get("/students", isLoggedIn, isAdmin, getAllStudents);
adminRoute.post("/addteacher", isLoggedIn, isAdmin, createTeacher);
adminRoute.get("/classes", isLoggedIn, isAdmin, getAllClasses);

export default adminRoute;
