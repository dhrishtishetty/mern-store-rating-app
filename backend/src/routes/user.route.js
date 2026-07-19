import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
    getStores,
    rateStore,
    getProfile
} from "../controllers/user.controller.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("USER"));

router.get("/stores", getStores);

router.post("/stores/:storeId/rate", rateStore);

router.get("/profile", getProfile);

export default router;