import express from "express";

import { signup, login, changePassword } from "../controllers/auth.controller.js";

import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/change-password", authenticate, changePassword);

export default router;