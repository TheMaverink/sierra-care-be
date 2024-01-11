import mongoose from "mongoose";
// import mongooseLeanGetters from "mongoose-lean-getters";
import jwt from "jsonwebtoken";
import moment from "moment";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import { getObjectSignedUrl } from "utils/s3";

import {
  GENDERS,
  PATIENTS_ENGLISH_SPEAKING_LEVELS,
  PATIENTS_MARITAL_STATUS,
  PATIENTS_HEALTH_RISKS,
  BLOOD_TYPES,
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
    dateOfDeath: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
      default: GENDERS.UNKNOWN,
    },
    englishSpeakingLevel: {
      type: String,
      enum: Object.values(PATIENTS_ENGLISH_SPEAKING_LEVELS),
      default: PATIENTS_ENGLISH_SPEAKING_LEVELS.UNKNOWN,
    },
    height: {},
    healthRisk: {
      type: String,
      enum: Object.values(PATIENTS_HEALTH_RISKS),
      default: PATIENTS_HEALTH_RISKS.UNKNOWN,
    },
    bloodType: {
      type: String,
      enum: Object.values(BLOOD_TYPES),
      default: BLOOD_TYPES.UNKNOWN,
    },
    pregnant: {
      type: Boolean,
      required: false,
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
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Log",
      },
    ],
    jotformFormId: {
      type: String,
    },
    ownsMobilePhone: {
      type: Boolean,
    },
    mobilePhone: {
      type: String,
    },
    email: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteer",
      required: false,
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
  delete patientObj?.password;
  delete patientObj?.tokens;
  return patientObj;
};

patientSchema.virtual("age").get(function () {
  // Calculate the age based on the date of birth
  return moment().diff(this.dob, "years");
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
