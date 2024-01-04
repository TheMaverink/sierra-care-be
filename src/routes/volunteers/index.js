import { Router } from "express";
import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const { createVolunteer, loginVolunteer } = volunteersControllers;

router.post("/create", createVolunteer);
router.post("/login", loginVolunteer);

export default router;
