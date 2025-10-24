import express from "express";
import {updateProfile} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/update-profile", protectRoute, updateProfile);

export default router