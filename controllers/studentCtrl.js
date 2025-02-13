import Student from "../models/Student.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import Class from "../models/Class.js";

//! @desc Create Student
//! @route POST /api/students
//! @access Private

export const studentRegistration = expressAsyncHandler(async (req, res) => {
  const { fname, lname, username, email, password, rollNumber } = req.body;

  // Assign Class to student find by class name
  const classExists = await Class.findOne({ className: req.body.className });
  if (!classExists) {
    res.status(400);
    throw new Error("Class not found");
  }

  // Check if roll number already exists with same class
  const studentExists = await Student.findOne({
    rollNumber,
    class: classExists?._id,
  });

  if (studentExists) {
    res.status(400);
    throw new Error("User/Roll Number already exists");
  }

  // Check if user already exists by username
  const usernameExists = await Student.findOne({ username });
  if (usernameExists) {
    res.status(400);
    throw new Error("User/Username already exists");
  }

  console.log(classExists._id);

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const student = await Student.create({
    ...req.body,
    password: hashedPassword,
    school: req.user?._id,
    class: classExists?._id,
  });
  res.json({
    status: "success",
    message: "Student created successfully",
    student,
  });
});

//? @desc Login Student
//? @route GET /api/students/login
//? @access Private

export const studentLogin = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const student = await Student.findOne({ username });

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
      _id: student?._id,
      fname: student?.fname,
      lname: student?.lname,
      email: student?.email,
      role: student?.role,
    }),
  });
});

//? @desc Get all Student
//? @route GET /api/all
//? @access Private & Admin

export const getAllStudents = expressAsyncHandler(async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

//? @desc Update Student
//? @route PUT /api/students/update-by-admin
//? @access Private/Admin

export const updateStudent = expressAsyncHandler(async (req, res) => {
  const updatedFields = req.body;
  const { identifier } = req.params;

  // find student by username/email/rollNumber

  const student = await Student.findOne({
    $or: [{ username }, { email }, { rollNumber }],
  });
  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  // Check if roll number already exists for the given class
  const classExists = await Class.findOne({ className: req.body.className });
  if (classExists) {
    const studentExists = await Student.findOne({
      rollNumber,
      class: classExists?._id,
    });
    if (studentExists) {
      res.status(400);
      throw new Error("User/Roll Number already exists");
    }
  }

  // Update Student details by Admin
  const updatedStudent = await Student.findByIdAndUpdate(
    student._id,
    updatedFields,
    { new: true }
  );
  res.json({
    status: "success",
    message: "Student updated successfully",
    student: updatedStudent,
  });
});
