import getPatients from "./getPatients";
import getPatientById from "./getPatientById"
import createPatient from "./createPatient"
import getPatientsOverview from "./getPatientsOverview"
import createPatientLog from "./createPatientLog"

const patientsControllers = {
  getPatients,
  getPatientById,
  createPatient,
  getPatientsOverview,
  createPatientLog
};

export default patientsControllers;
