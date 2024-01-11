import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import patientsControllers from "@controllers/Patients";

const router = Router();

const {
  getPatients,
  getPatientById,
  createPatient,
  getPatientsOverview,
  createPatientLog,
} = patientsControllers;

router.get("/", authMiddleware, getPatients);
router.get("/patient/:id", authMiddleware, getPatientById);
router.post("/new", authMiddleware, createPatient);
router.get("/overview", getPatientsOverview);
router.post("/log/new", authMiddleware, createPatientLog);

export default router;
