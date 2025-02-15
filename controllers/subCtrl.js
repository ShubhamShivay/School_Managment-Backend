import Subject from "../models/Subject.js";
import expressAsyncHandler from "express-async-handler";
import Teacher from "../models/Teacher.js";

//! @desc Create Subject
//! @route POST /api/subjects
//! @access Private/Admin

export const createSubject = expressAsyncHandler(async (req, res) => {
  const { subName, subCode, school, teacher } = req.body;

  // Teacher
  const teacherFound = await Teacher.findOne({
    fname: teacher.toLowerCase(),
  });


  

  // Check if subject already exists
  const subjectExists = await Subject.findOne({
    subName: subName.toLowerCase(),
    subCode: subCode.toLowerCase(),
  });

  if (subjectExists) {
    res.status(400);
    throw new Error("Subject already exists");
  }

  const subject = await Subject.create({
    subName: subName.toLowerCase(),
    subCode: subCode.toLowerCase(),
    teacher: teacherFound._id,
  });
  res.json({
    status: "success",
    message: "Subject created successfully",
    subject,
  });
});
