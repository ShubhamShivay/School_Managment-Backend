import mongoose from "mongoose";

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
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
},{
  timestamps: true,
});

const Subject = mongoose.model("Subject", subjectSchema);

export default Subject;