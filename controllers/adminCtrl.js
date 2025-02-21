import Admin from "../models/Admin.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";
import Subject from "../models/Subject.js";
import Student from "../models/Student.js";
import generateToken from "../utils/generateToken.js";

//corrected documentations , note to fix other places to
//? @desc Create Admin
//? @route POST /api/admins - wrong,  /api/admins/register - correct path
//? @access Private

export const adminRegistration = expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, password, schoolName } = req.body;

  // Check if user already exists
  const adminExists = await Admin.findOne({ email: email.toLowerCase() });
  if (adminExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if School Name already exists
  const schoolNameExists = await Admin.findOne({ schoolName });
  if (schoolNameExists) {
    res.status(400);
    throw new Error("School Name already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await Admin.create({
    fname: fname.toLowerCase(),
    lname: lname.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    schoolName: schoolName.toLowerCase(),
  });
  res.json({
    status: "success",
    message: "Admin created successfully",
    admin,
  });
});

//! @desc Login Admin
//! @route GET /api/admins/login
//! @access Private/Admin

export const adminLogin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.toLowerCase() });

  if (!admin) {
    return next({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  console.log(admin);

  //   Check if password is correct
  const isPasswordMatch = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  //! Capitalize First Letter
  admin.fname = admin.fname.charAt(0).toUpperCase() + admin.fname.slice(1);
  admin.lname = admin.lname.charAt(0).toUpperCase() + admin.lname.slice(1);
  admin.schoolName =
    admin.schoolName.charAt(0).toUpperCase() + admin.schoolName.slice(1);
  admin.role = admin.role.charAt(0).toUpperCase() + admin.role.slice(1);

  res.json({
    status: "success",
    message: "User logged in successfully",
    admin,
    token: generateToken({
      _id: admin?._id,
      role: admin?.role,
      schoolName: admin?.schoolName,
    }),
  });
});

//? @desc Get Admin
//? @route GET /api/admins/profile
//? @access Private/Admin

export const getAdmin = expressAsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.user?._id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }
  //! Capitalize First Letter
  admin.fname = admin.fname.charAt(0).toUpperCase() + admin.fname.slice(1);
  admin.lname = admin.lname.charAt(0).toUpperCase() + admin.lname.slice(1);
  admin.schoolName =
    admin.schoolName.charAt(0).toUpperCase() + admin.schoolName.slice(1);
  admin.role = admin.role.charAt(0).toUpperCase() + admin.role.slice(1);

  res.json({
    status: "success",
    message: "User logged in successfully",
    admin,
  });
});

//? @desc Update Admin
//? @route PUT /api/admins/:id
//? @access Private/Admin

export const updateAdmin = expressAsyncHandler(async (req, res) => {
  const updatedAdmin = await Admin.findByIdAndUpdate(req.user?._id, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    message: "Admin updated successfully",
    updatedAdmin,
  });
});

//? @desc Delete Admin
//? @route DELETE /api/admins/:id
//? @access Private/Admin

export const deleteAdmin = expressAsyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuthId?._id);

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  await Admin.findByIdAndDelete(req.userAuthId?._id);

  res.json({
    status: "success",
    message: "Admin deleted successfully",
  });
});

//? @desc Logout Admin
//? @route GET /api/admins/logout
//? @access Private/Admin

export const adminLogout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    status: "success",
    message: "User logged out successfully",
  });
});
