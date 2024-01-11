import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const logSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    logImages: {
      type: [String],
      required: false,
    },
    patient: {//MAybe remove?
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    // createdBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Volunteer",
    //   required: true,
    // },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
