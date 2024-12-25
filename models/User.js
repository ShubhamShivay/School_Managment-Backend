import e from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    // id: {
    //   type: String,
    //   required: true,
    // },
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
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "teacher", "student"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    image: {
      type: String,
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
    phone: {
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

const User = mongoose.model("User", userSchema);

export default User;
