import mongoose from "mongoose";
// import mongooseLeanGetters from "mongoose-lean-getters";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import { getObjectSignedUrl } from "utils/s3";
import { VOLUNTEER_ROLES, GENDERS } from "@consts";

dotenv.config({ path: ".env" });

const volunteerSchema = new mongoose.Schema(
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
    volunteerImages: {
      type: [String],
      required: false,
    },
    mobilePhone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    resetPasswordCode: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Object.values(GENDERS),
      default: GENDERS.UNKNOWN,
    },
    address: {
      formattedAddress: {
        type: String,
      },
    },
    // locationCoordinates: {
    //   type: {
    //     type: String,
    //     default: "Point",
    //   },
    //   coordinates: {
    //     type: [Number],
    //     index: "2dsphere",
    //   },
    // },
    job: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(VOLUNTEER_ROLES),
      default: VOLUNTEER_ROLES.NORMAL,
    },
    appointments: {},
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Log",
      },
    ],
    isExternal: {
      //maybe replace with diff role level?
      type: Boolean,
    },
    worksAt: {
      // link to other schema?
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
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

// volunteerSchema.virtual("patientImageUrl").get(async function () {
//   const signedUrl = await getObjectSignedUrl(this.patientImage);
//   return signedUrl;
// });

// volunteerSchema.virtual("doesHaveProfileImage").get(function () {
//   return !!this.profileImage;
// });

volunteerSchema.methods.getVolunteerPublicData = function () {
  const volunteer = this;
  const volunteerObj = volunteer.toObject();
  delete volunteerObj.password;
  delete volunteerObj.tokens;
  return volunteerObj;
};

volunteerSchema.methods.generateJwtToken = async function () {
  const volunteer = this;
  const token = jwt.sign(
    { _id: volunteer.id.toString() },
    process.env.JWT_SECRET
  );
  volunteer.tokens = volunteer.tokens.concat({ token });
  await volunteer.save();
  return token;
};

volunteerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
