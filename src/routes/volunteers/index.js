import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import volunteersControllers from "@controllers/Volunteers";

const router = Router();

const {
  createVolunteer,
  loginVolunteer,
  isVolunteerLoggedIn,
  getVolunteersOverview,
  getVolunteers,
  getVolunteerById
} = volunteersControllers;

router.post("/new", createVolunteer);
router.post("/login", loginVolunteer);
router.get("/isVolunteerLoggedIn", authMiddleware, isVolunteerLoggedIn);
router.get("/overview", getVolunteersOverview);
router.get("/", getVolunteers);
router.get("/volunteer/:id", authMiddleware, getVolunteerById);

export default router;
