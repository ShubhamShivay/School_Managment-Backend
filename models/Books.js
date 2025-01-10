import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
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
    writer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    rating: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Books", classSchema);
