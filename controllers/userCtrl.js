import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";

//! @desc Create User
//! @route POST /api/users
//! @access Private

export const userRegistration = expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fname,
    lname,
    email,
    password,
  });
  res.json({
    status: "success",
    message: "User created successfully",
    user,
  });
});

//! @desc Login User
//! @route POST /api/users/login
//! @access Private

export const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (user.password !== password) {
    res.status(400);
    throw new Error("Invalid password");
  }

  res.json({
    status: "success",
    message: "User logged in successfully",
    user,
  });
});
