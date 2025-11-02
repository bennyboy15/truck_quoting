import express from "express";
import {updateProfile, getTechnicians} from "../controllers/user.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.post("/update-profile", protectRoute, updateProfile);
router.get("/technicians", protectRoute, getTechnicians);

export default router