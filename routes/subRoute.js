import { createSubject } from "../controllers/subCtrl.js";
import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

const subRoute = express.Router();

subRoute.post("/create", isLoggedIn, isAdmin, createSubject);

export default subRoute;
