import { Router } from "express";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

import patients from "./patients";
import volunteers from "./volunteers";
import dev from "./dev";
import logs from "./logs";
import clinics from "./clinics";

const router = Router();

router.use("/patients", patients);
router.use("/volunteers", volunteers);
router.use("/logs", logs);
router.use("/clinics", clinics);

if (process.env.ENABLE_DEV_ROUTES == "true") {
  router.use("/dev", dev);
}


export default router;
