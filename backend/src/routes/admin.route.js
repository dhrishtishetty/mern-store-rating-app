import express from "express";
import authenticate from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";

import {
    dashboard,
    createUser,
    createStore,
    getUsers,
    getStores,
    getUserDetails
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/dashboard", dashboard);

router.post("/users", createUser);

router.post("/stores", createStore);

router.get("/users", getUsers);

router.get("/stores", getStores);

router.get("/users/:id", getUserDetails);

export default router;