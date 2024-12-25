import Student from "../models/Student.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

//! @desc Create Student
//! @route POST /api/students
//! @access Private

export const studentRegistration = expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, password } = req.body;

  // Check if user already exists
  const studentExists = await Student.findOne({ email: email.toLowerCase() });
  if (studentExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    fname: fname.toLowerCase(),
    lname: lname.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
  });
  res.json({
    status: "success",
    message: "User created successfully",
    student,
  });
});

//! @desc Login Student
//! @route POST /api/students/login
//! @access Private

export const studentLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const student = await Student.findOne({ email: email.toLowerCase() });

  if (!student) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, student.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    status: "success",
    message: "User logged in successfully",
    student,
    token: generateToken({
      _id: student._id,
      role: student.role,
    }),
  });
});

//! @desc Get Student
//! @route GET /api/students/:id
//! @access Private/Admin

export const getStudent = expressAsyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);
  
  res.json({
    status: "success",
    message: "Student fetched successfully",
    student,
  });
});

//! @desc Get All Students
//! @route GET /api/students
//! @access Private/Admin

export const getAllStudents = expressAsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json({
    status: "success",
    message: "Students fetched successfully",
    students,
  });
});

//! @desc Logout Student
//! @route POST /api/students/logout
//! @access Private

export const studentLogout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    status: "success",
    message: "User logged out successfully",
  });
});
