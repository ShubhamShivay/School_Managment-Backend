import express from "express";
import { createClass } from "../controllers/classCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
const classRoute = express.Router();

classRoute.post("/create", isLoggedIn, createClass);

export default classRoute;
