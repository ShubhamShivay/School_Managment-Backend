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
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
    userId: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    fatherName: {
      type: String,
    },
    motherName: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
