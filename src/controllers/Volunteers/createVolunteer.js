import Volunteer from "@models/Volunteer";

const createVolunteer = async (req, res, next) => {
  const {
    firstName,
    middleName,
    lastName,
    mobilePhone,
    dob,
    gender,
    coordinates,
    email,
    password,
    job,
    role,
    isExternal,
    worksAt,
  } = req.body;

  try {
    let volunteer = await Volunteer.findOne({ email });
    

    if (volunteer) {
      return res.status(400).json({
        errors: [
          {
            msg: "Sorry, there is a volunteer already registered with this email!",
          },
        ],
      });
    }

    volunteer = new Volunteer({
      firstName,
      middleName,
      lastName,
      mobilePhone,
      dob,
      gender,
      locationCoordinates: { coordinates:[coordinates.longitude,coordinates.latitude] },
      email,
      password,
      job,
      role,
      isExternal,
      worksAt,
    });

    await volunteer.save();

    const token = await volunteer.generateJwtToken();

    res.status(200).send({ ...volunteer.getVolunteerPublicData(), token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default createVolunteer;
