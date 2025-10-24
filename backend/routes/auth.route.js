import express from "express";
import { signup, login, logout, getCurrentUser, adminTest } from "../controllers/auth.controller.js";
import { authorize, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, getCurrentUser);

router.get("/admin", protectRoute, authorize("admin"), adminTest);

export default router;