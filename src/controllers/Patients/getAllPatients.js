import Patient from "@models/Patient";

const getAllPatients = async (req, res, next) => {
  try {
    const allPatients = await Patient.find({});

    res.json(allPatients);
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default getAllPatients;
