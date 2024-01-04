import { Router } from "express";
import patientsControllers from "@controllers/Patients";

const router = Router();

const { getAllPatients ,getPatientById} = patientsControllers;

router.get("/all", getAllPatients);
router.get("/:id", getPatientById);

export default router;
