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
const adminRoute = expres.Router();

adminRoute.post("/register", adminRegistration);
adminRoute.post("/login", adminLogin);
adminRoute.get("/profile", isLoggedIn, getAdmin);
adminRoute.put("/update", isLoggedIn, updateAdmin);
adminRoute.post("/logout", isLoggedIn, adminLogout);
adminRoute.delete("/delete", isLoggedIn, deleteAdmin);
adminRoute.get("/teachers", isLoggedIn, getAllTeachers);
adminRoute.get("/students", isLoggedIn, isAdmin, getAllStudents);
adminRoute.get("/classes", isLoggedIn, isAdmin, getAllClasses);

export default adminRoute;
