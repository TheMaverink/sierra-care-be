import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import clinicControllers from "@controllers/Clinics";

const router = Router();

const { createClinic, getClinics ,getClinicById} = clinicControllers;

router.post("/new", authMiddleware, createClinic);
router.get("/", authMiddleware, getClinics);
router.get("/clinic/:id", authMiddleware, getClinicById);


export default router;
