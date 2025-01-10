import express from "express";
import { createBook } from "../controllers/booksCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";
const bookRoute = express.Router();

bookRoute.post("/create", isLoggedIn, isAdmin, createBook);

export default bookRoute;
