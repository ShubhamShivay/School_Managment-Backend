import Teacher from "../models/Teacher.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Class from "../models/Class.js";

//! @desc Create Teacher
//! @route POST /api/teachers/register
//! @access Private/Admin

export const createTeacher = expressAsyncHandler(async (req, res) => {
  const { fname, lname, email, password, school } = req.body;

  //   Check if user already exists
  const userExists = await Teacher.findOne({ email: email.toLowerCase() });
  if (userExists) {
    res.status(400);
    throw new Error("Teacher already exists");
  }

  //   School Name
  const school_id = req.user._id;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const teacher = await Teacher.create({
    fname: fname.toLowerCase(),
    lname: lname.toLowerCase(),
    email: email.toLowerCase(),
    password: hashedPassword,
    school: school_id,
  });
  res.json({
    status: "success",
    message: "Teacher created successfully",
    teacher,
  });
});

//! @desc Login Teacher
//! @route POST /api/teachers/login
//! @access Private

export const teacherLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email: email.toLowerCase() });

  if (!teacher) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isPasswordMatch = await bcrypt.compare(password, teacher.password);

  if (!isPasswordMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    status: "success",
    message: "User logged in successfully",
    teacher,
    token: generateToken({
      _id: teacher?._id,
      fname: teacher?.fname,
      lname: teacher?.lname,
      email: teacher?.email,
      role: teacher?.role,
    }),
  });
});

//? @desc Get Teacher
//? @route GET /api/teachers/:id
//? @access Private

export const getTeacher = expressAsyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.user?._id);

  if (!teacher) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  res.json({
    status: "success",
    message: "User logged in successfully",
    teacher,
  });
});

//? @desc Get All Teachers
//? @route GET /api/teachers/all
//? @access Private/Admin

export const getAllTeachers = expressAsyncHandler(async (req, res) => {
  const teachers = await Teacher.find();

  if (!teachers || teachers === null || teachers.length === 0) {
    res.status(404);
    throw new Error("Teacher not found");
  }

  res.json({
    status: "Success",
    message: "All teachers found successfully",
    teachers,
  });
});
