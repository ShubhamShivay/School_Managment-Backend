import User from "../models/User.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//! @desc Create User
//! @route POST /api/users
//! @access Private

export const userRegistration = expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, password, isAdmin, role } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fname: fname.toLowerCase(),
    lname: lname.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    isAdmin,
    role,
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

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  res.json({
    status: "success",
    message: "User logged in successfully",
    user,
    token: generateToken({ _id: user._id, role: user.role }),
  });
});

//! @desc Get User
//! @route GET /api/users/:id
//! @access Private

export const getUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.userAuthId?._id);
  console.log("userId", req.userAuthId._id);
  if (!user) { 
    res.status(400);
    throw new Error("User not found");
  }

  res.json({
    status: "success",
    message: "User fetched successfully",
    user,
  });
});
