import bcrypt from "bcrypt";
import Volunteer from "@models/Volunteer";

const loginVolunteer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res
        .status(400)
        .json({ msg: "No Volunteer registered with this email." });
    }

    const isMatch = await bcrypt.compare(password, volunteer.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = await volunteer.generateJwtToken();

    res.status(200).send({ ...volunteer.getVolunteerPublicData(), token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

export default loginVolunteer;
