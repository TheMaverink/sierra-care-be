import mongoose from "mongoose";
// import mongooseLeanGetters from "mongoose-lean-getters";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import { getObjectSignedUrl } from "utils/s3";

import {
  GENDERS,
  PATIENTS_ENGLISH_SPEAKING_LEVELS,
  PATIENTS_MARITAL_STATUS,
} from "@consts";

dotenv.config({ path: ".env" });

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    middleName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    patientImages: {
      type: [String],
      required: false,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: Number,
      enum: Object.values(GENDERS),
      default: GENDERS.UNKNOWN,
    },
    englishSpeakingLevel: {
      type: String,
      enum: Object.values(PATIENTS_ENGLISH_SPEAKING_LEVELS),
      default: PATIENTS_ENGLISH_SPEAKING_LEVELS.UNKNOWN,
    },
    height: {},
    healthRisk: {},
    bloodType: {},
    pregnant: {
      type: Boolean,
      required: true,
      default: false,
    },
    conceivingDate: {
      type: Date,
    },
    noOfChildren: {
      type: Number,
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
    income: {
      type: String,
    },
    job: {
      type: String,
    },
    maritalStatus: {
      type: String,
      enum: Object.values(PATIENTS_MARITAL_STATUS),
      default: PATIENTS_MARITAL_STATUS.UNKNOWN,
    },
    appointments: {},
    logs: {},
    jotformFormId: {
      type: String,
    },
    ownsMobilePhone: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },
  },
  { timestamps: true }
);

// patientSchema.virtual("patientImageUrl").get(async function () {
//   const signedUrl = await getObjectSignedUrl(this.patientImage);
//   return signedUrl;
// });

// patientSchema.virtual("doesHaveProfileImage").get(function () {
//   return !!this.profileImage;
// });

patientSchema.methods.getPatientPublicData = function () {
  const patient = this;
  const patientObj = patient.toObject();
  delete patientObj.password;
  delete patientObj.tokens;
  return patientObj;
};

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
