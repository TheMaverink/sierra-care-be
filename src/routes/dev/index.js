import { Router } from "express";
import devControllers from "@controllers/Dev";

const router = Router();

const { addPatientsFromJotform } = devControllers;

router.get("/addPatientsFromJotform", addPatientsFromJotform);

export default router;
