import express from "express";
import { getSections, createSection, createHeading, getHeadings, getOptions, createOption } from "../controllers/worksheet.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

// GET
router.get("/section", protectRoute, getSections);
router.get("/heading", protectRoute, getHeadings);
router.get('/options', getOptions);

// POST
router.post("/section", protectRoute, createSection);
router.post("/heading", protectRoute, createHeading);
router.post('/options', createOption);

export default router;