import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema(
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
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "Teacher",
    },
    School: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "Admin",
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", classSchema);
export default Teacher;
