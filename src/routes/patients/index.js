import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import patientsControllers from "@controllers/Patients";

const router = Router();

const { getPatients ,getPatientById} = patientsControllers;

router.get("/", authMiddleware,getPatients);
router.get("/:id", authMiddleware,getPatientById);

export default router;
