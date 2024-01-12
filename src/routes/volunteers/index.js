import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const { createVolunteer, loginVolunteer, isVolunteerLoggedIn ,getVolunteersOverview} =
  volunteersControllers;

router.post("/new", createVolunteer);
router.post("/login", loginVolunteer);
router.get("/isVolunteerLoggedIn", authMiddleware, isVolunteerLoggedIn);
router.get("/overview", getVolunteersOverview);


export default router;
