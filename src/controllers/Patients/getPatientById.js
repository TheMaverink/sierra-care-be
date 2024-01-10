import Patient from "@models/Patient";

const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id).lean();

    if (patient) {
      res.status(200).json({ ...patient });
    } else {
      return res.status(404).json({ message: "Patient not found" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getPatientById;
