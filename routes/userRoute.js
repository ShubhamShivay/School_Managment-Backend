import expres from "express";
import { userLogin, userRegistration } from "../controllers/userCtrl.js";
const userRoute = expres.Router();

userRoute.post("/register", userRegistration);
userRoute.post("/login", userLogin);

export default userRoute;
