import express from "express";
import { getCustomers, createCustomer } from "../controllers/customer.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", protectRoute, getCustomers);

router.post("/", protectRoute, createCustomer)

export default router;