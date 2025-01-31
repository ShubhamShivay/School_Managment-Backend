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
      // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;