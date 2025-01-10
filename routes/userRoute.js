import expres from "express";
import {
  userLogin,
  userRegistration,
  getUser,
} from "../controllers/userCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const userRoute = expres.Router();

userRoute.post("/register", userRegistration);
userRoute.post("/login", userLogin);
userRoute.get("/profile", isLoggedIn, getUser);

export default userRoute;
