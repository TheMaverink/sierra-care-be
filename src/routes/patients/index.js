import { Router } from "express";
import patientsControllers from "@controllers/Patients";

const router = Router();

const { getPatients ,getPatientById} = patientsControllers;

router.get("/", getPatients);
router.get("/:id", getPatientById);

export default router;
