import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import { ownerDashboard } from "../controllers/owner.controller.js";

const router = express.Router();

router.use(authenticate);

router.use(authorize("OWNER"));

router.get("/dashboard", ownerDashboard);

export default router;