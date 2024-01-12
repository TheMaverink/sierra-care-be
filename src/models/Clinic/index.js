import mongoose from "mongoose";

const clinicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      formattedAddress: {
        type: String,
      },
    },
    locationCoordinates: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    images: {
      type: [String],
      required: false,
    },
    phoneNumber: {
      type: String,
    },
    managerName: {
      type: String,
    },
    numberMidwives: {
      type: Number,
    },
    approximatedMonthlyNumberPatients: {
      type: Number,
    },
    isPrivateClinic: {
      type: Boolean,
      required: true,
    },
    hasCleanWater: {
      type: Boolean,
      required: true,
    },
    hasSolarEnergy: {
      type: Boolean,
      required: true,
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Log",
      },
    ],
  },
  { timestamps: true }
);

const Clinic = mongoose.model("Clinic", clinicSchema);

export default Clinic;
