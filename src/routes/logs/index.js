import { Router } from "express";
import authMiddleware from "@utils/authMiddleware";

import logsControllers from "@controllers/Logs";

const router = Router();

const { getLogs } = logsControllers;

router.get("/", authMiddleware, getLogs);

export default router;
