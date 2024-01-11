import getPatients from "./getPatients";
import getPatientById from "./getPatientById"
import createPatient from "./createPatient"
import getPatientsOverview from "./getPatientsOverview"

const patientsControllers = {
  getPatients,
  getPatientById,
  createPatient,
  getPatientsOverview
};

export default patientsControllers;
