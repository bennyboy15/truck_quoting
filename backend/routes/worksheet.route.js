import express from "express";
import { getSections, createSection } from "../controllers/worksheet.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/section", protectRoute, getSections);
router.post("/section", protectRoute, createSection);

export default router;