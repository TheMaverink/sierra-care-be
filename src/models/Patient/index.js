import mongoose, { Schema } from "mongoose";
// import mongooseLeanGetters from "mongoose-lean-getters";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import { getObjectSignedUrl } from "utils/s3";

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
    patientImage: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
    },
    sex: {
      type: String,
      required: true,
      default: "unknown",
    },
    englishSpeakingLevel: {
      type: Number,
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
    location: {
      postcode: {
        type: String,
      },
      formattedAddress: {
        type: String,
      },
    },
    geometry: {
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
      type: Number,
    },
    job: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    appointments: {},
    logs: {},
    //for later...
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobilePhone: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordCode: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// patientSchema.virtual("patientImageUrl").get(async function () {
//   const signedUrl = await getObjectSignedUrl(this.patientImage);
//   return signedUrl;
// });

patientSchema.virtual("doesHaveProfileImage").get(function () {
  return !!this.profileImage;
});

patientSchema.methods.getPatient = function () {
  const patient = this;
  const patientObj = patient.toObject();
  delete patientObj.password;
  delete patientObj.tokens;
  return patientObj;
};

//for later..

patientSchema.methods.generateJwtToken = async function () {
  const patient = this;
  const token = jwt.sign(
    { _id: patient.id.toString() },
    process.env.JWT_SECRET
  );

  patient.tokens = user.patient.concat({ token });
  await patient.save();
  return token;
};

patientSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
