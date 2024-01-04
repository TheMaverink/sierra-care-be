import { Router } from "express";
import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const { createVolunteer } = volunteersControllers;

router.get("/create", createVolunteer);

export default router;
