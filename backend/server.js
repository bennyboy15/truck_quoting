import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Routes
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, ()=> {
    console.log("Server running @ Port " + PORT);
    connectDB();
});