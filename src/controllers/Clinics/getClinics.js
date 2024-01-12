import Clinic from "@models/Clinic";

const getClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.find();

    res.json({
      ...clinics,
    });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getClinics;
