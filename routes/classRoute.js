import express from "express";
import {
  createClass,
  getClass,
  getAllClasses,
  updateClass,
} from "../controllers/classCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
const classRoute = express.Router();

classRoute.post("/create", isLoggedIn, isAdmin, createClass);
classRoute.get("/get", isLoggedIn, getClass);
classRoute.get("/all", isLoggedIn, isAdmin, getAllClasses);
classRoute.put("/update", isLoggedIn, isAdmin, updateClass);

export default classRoute;
