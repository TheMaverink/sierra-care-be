import { Router } from "express";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import patients from "./patients";
import dev from "./dev";

const router = Router();

router.use("/patients", patients);

if (process.env.ENABLE_DEV_ROUTES == "true") {
  router.use("/dev", dev);
}

export default router;
