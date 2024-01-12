import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import clinicControllers from "@controllers/Clinics";

const router = Router();

const { createClinic, getClinics } = clinicControllers;

router.post("/new", authMiddleware, createClinic);
router.get("/", authMiddleware, getClinics);

export default router;
