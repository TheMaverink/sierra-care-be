import Clinic from "@models/Clinic";

const getClinicById = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id).populate("logs").lean();

    if (clinic) {
      res.status(200).json({ ...clinic });
    } else {
      return res.status(404).json({ message: "Clinic not found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getClinicById;
