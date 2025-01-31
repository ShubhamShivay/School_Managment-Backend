import expres from "express";
import {
  adminRegistration,
  adminLogin,
  getAdmin,
  updateAdmin,
  adminLogout,
  deleteAdmin,
} from "../controllers/adminCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const adminRoute = expres.Router();

adminRoute.post("/register", adminRegistration);
adminRoute.post("/login", adminLogin);
adminRoute.get("/profile", isLoggedIn, getAdmin);
adminRoute.put("/update", isLoggedIn, updateAdmin);
adminRoute.post("/logout", isLoggedIn, adminLogout);
adminRoute.delete("/delete", isLoggedIn, deleteAdmin);

export default adminRoute;
