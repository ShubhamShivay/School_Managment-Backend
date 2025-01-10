import mongoose from "mongoose";

const Schema = mongoose.Schema;

const classSchema = new Schema({
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
    timestamps: true,});

export default mongoose.model("Class", classSchema);