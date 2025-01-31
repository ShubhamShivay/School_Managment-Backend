import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    className: {
      type: String,
      required: true,
      unique: true,
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);

export default Class;
