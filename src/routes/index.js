import { Router } from "express";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import patients from "./patients";

const router = Router();

router.use("/patients", patients);

export default router;
