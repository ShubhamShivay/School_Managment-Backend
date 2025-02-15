import mongoose from "mongoose";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },

    lname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Class",
    },
    examResult: [
      {
        subName: {
          type: mongoose.Schema.Types.String,
          required: true,
          ref: "Subject",
        },
        subCode: {
          type: mongoose.Schema.Types.String,
          required: true,
          ref: "Subject",
        },
        marksObtained: {
          type: Number,
          default: 0,
        },
        fullMarks: {
          type: Number,
          required: true,
          default: 100,
        },
      },
    ],
    attendance: [
      {
        subName: {
          type: mongoose.Schema.Types.String,
          required: true,
          ref: "Subject",
        },
        subCode: {
          type: mongoose.Schema.Types.String,
          required: true,
          ref: "Subject",
        },
        status: {
          type: String,
          required: true,
          enum: ["Present", "Absent"],
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
