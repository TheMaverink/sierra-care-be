import jwt from "jsonwebtoken";
import Volunteer from "@models/Volunteer";

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const auth = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const volunteer = await Volunteer.findOne({
      _id: decoded._id,
      "tokens.token": token,
    }); //populate i needed

    if (!volunteer) {
      console.log("no volunteerfound");
      throw new Error();
    }

    req.token = token;

    if (volunteer) {
      req.volunteer = volunteer;
    }

    next();
  } catch (error) {
    console.log("NOT AUTHORIZED");
    console.log(error);
    res.status(401).send({ error: "Please Authenticate" });
  }
};

export default auth;
