import { Router } from "express";
import patientsControllers from "@controllers/Patients";

const router = Router();

const { getAllPatients } = patientsControllers;

router.get("/all", getAllPatients);

export default router;
