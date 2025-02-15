import Class from "../models/Class.js";
import Student from "../models/Student.js";
import expressAsyncHandler from "express-async-handler";

//! @desc Create Class
//! @route POST /api/classes
//! @access Private

export const createClass = expressAsyncHandler(async (req, res) => {
  const { className, school } = req.body;

  // Check if class already exists
  const classExists = await Class.findOne({
    className: className.toLowerCase(),
  });
  if (classExists) {
    res.status(400);
    throw new Error("Class already exists");
  }

  // Create class
  const classs = await Class.create({
    className: className.toLowerCase(),
    // school: school.toLowerCase(),
  });

  res.json({
    status: "success",
    message: "Class created successfully",
    classs,
  });
});

//! @desc Get Class
//! @route GET /api/classes/get
//! @access Private/Admin

export const getClass = expressAsyncHandler(async (req, res) => {
  // Find class by Name
  const classs = await Class.find({
    className: req.body.className.toLowerCase(),
  });

  // console.log("classs", classs);

  if (!classs || classs === null || classs.length === 0) {
    res.status(404);
    throw new Error("Class not found");
  }

  res.json({
    status: "success",
    message: "Class found successfully",
    classs,
  });
});

//! @desc Get All Classes
//! @route GET /api/classes
//! @access Private/Admin

export const getAllClasses = expressAsyncHandler(async (req, res) => {
  // Find class by Name
  const classes = await Class.find();

  if (!classes || classes === null || classes.length === 0) {
    res.status(404);
    throw new Error("Class not found");
  }

  res.json({
    status: "Success",
    message: "All classes found successfully",
    classes,
  });
});

//! @desc Update Class
//! @route PUT /api/classes/:id
//! @access Private/Admin

export const updateClass = expressAsyncHandler(async (req, res) => {
  // Find class by Name
  const classs = await Class.findById(req.body.className.toLowerCase());

  if (!classs) {
    res.status(404);
    throw new Error("Class not found");
  }

  const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json({
    status: "success",
    message: "Class updated successfully",
    updatedClass,
  });
});

//! @desc Delete Class
//! @route DELETE /api/classes/:id
//! @access Private/Admin

export const deleteClass = expressAsyncHandler(async (req, res) => {
  // Find class by Name
  const classs = await Class.findById(req.body.className.toLowerCase());

  if (!classs) {
    res.status(404);
    throw new Error("Class not found");
  }

  // Delete class
  await Class.findByIdAndDelete(classs._id);
  res.json({
    status: "success",
    message: "Class deleted successfully",
  });
});

//! @desc Get all Students in a Class
//! @route GET /api/classes/students
//! @access Private/Admin

export const getClassStudents = expressAsyncHandler(async (req, res) => {
  // Find class by Name
  const classs = await Class.find({
    className: req.body.className.toLowerCase(),
  });

  if (!classs) {
    res.status(404);
    throw new Error("Class not found");
  }

  const students = await Student.find({ class: classs._id });

  res.json({
    status: "success",
    message: "Class found successfully",
    students,
  });
});
