import {protectRoute} from "../middleware/auth.middleware.js"
import express from "express";
import { getTruck, getTrucks, createMake, createModel, createTruck, getMakes, getModels } from "../controllers/truck.controller.js";

const router = new express.Router();

// READ
router.get("/", protectRoute, getTrucks);
router.get("/:id", protectRoute, getTruck);
router.get("/make", protectRoute, getMakes);
router.get("/model", protectRoute, getModels);

// CREATE
router.post("/make", protectRoute, createMake);
router.post("/model", protectRoute, createModel);
router.post("/truck", protectRoute, createTruck);

export default router;