import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import patientsControllers from "@controllers/Patients";

const router = Router();

const { getPatients, getPatientById, createPatient } = patientsControllers;

router.get("/", authMiddleware, getPatients);
router.get("/:id", authMiddleware, getPatientById);
router.post("/new", authMiddleware, createPatient);

export default router;
