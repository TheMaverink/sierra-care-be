import Clinic from "@models/Clinic";

const createClinic = async (req, res, next) => {
  try {
    const {
      name,
      address,
      locationCoordinates,
      email,
      images,
      phoneNumber,
      managerName,
      numberMidwives,
      approximatedMonthlyNumberPatients,
      isPrivateClinic,
      logs,
    } = req.body;

    let clinic = await Clinic.findOne({
      name,
      email,
      phoneNumber,
    });

    if (clinic) {
      return res.status(400).json({
        errors: [
          {
            msg: "Sorry, this clinic is already registered!",
          },
        ],
      });
    }

    clinic = new Clinic({
      name,
      address,
      locationCoordinates,
      email,
      images,
      phoneNumber,
      managerName,
      numberMidwives,
      approximatedMonthlyNumberPatients,
      isPrivateClinic,
      logs,
    });

    await clinic.save();

    res.status(200).send({ ...clinic });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default createClinic;
