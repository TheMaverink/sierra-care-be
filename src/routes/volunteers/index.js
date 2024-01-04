import { Router } from "express";
import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const { createVolunteer } = volunteersControllers;

router.post("/create", createVolunteer);

export default router;
