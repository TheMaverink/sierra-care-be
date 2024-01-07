import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const { createVolunteer, loginVolunteer, isVolunteerLoggedIn } =
  volunteersControllers;

router.post("/create", createVolunteer);
router.post("/login", loginVolunteer);
router.get("/isVolunteerLoggedIn", authMiddleware, isVolunteerLoggedIn);

export default router;
