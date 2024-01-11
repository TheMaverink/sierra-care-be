import Patient from "@models/Patient";
import Log from "@models/Log";

const createPatientLog = async (req, res, next) => {
  try {
    const { title, description, type, patientId } = req.body;

    const patient = await Patient.findById(patientId);
    const { volunteer } = req;

    const createdLog = await new Log({
      title: title,
      description: description,
      type: type,
      patient: patientId,
      createdBy: volunteer,
    });

    await createdLog.save();

    await patient.logs.push(createdLog);
    await volunteer.logs.push(createdLog);

    await patient.save();
    await volunteer.save();

    // const updatedPatient = await patient.populate("logs").lean()

    const updatedPatient = await Patient.findById(patientId)
      .populate("logs")
      .lean();

    console.log("updatedPatient");
    console.log(updatedPatient);

    res.status(200).json({ ...updatedPatient });
  } catch (error) {
    res.status(500).send("Server Error");
    console.log(error.message);
  }
};

export default createPatientLog;
