import Class from "../models/Class.js";
import expressAsyncHandler from "express-async-handler";

//! @desc Create Class
//! @route POST /api/classes
//! @access Private

export const createClass = expressAsyncHandler(async (req, res) => {
  const { className, school } = req.body;

  //   const classs = await Class.create({
  //     className: className.toLowerCase(),
  //     school: school,
  //   });

  res.json({
    status: "success",
    message: "Class created successfully",
    // classs,
  });
});

//! @desc Get Class
//! @route GET /api/classes/:id
//! @access Private/Admin

export const getClass = expressAsyncHandler(async (req, res) => {
  const classs = await Class.findById(req.params.id);

  if (!classs) {
    res.status(404);
    throw new Error("Class not found");
  }

  res.json({
    status: "success",
    message: "Class found successfully",
    classs,
  });
});

//! @desc Update Class
//! @route PUT /api/classes/:id
//! @access Private/Admin

export const updateClass = expressAsyncHandler(async (req, res) => {
  const classs = await Class.findById(req.params.id);

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
