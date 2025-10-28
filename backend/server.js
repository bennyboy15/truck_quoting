import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import truckRoutes from "./routes/truck.route.js";
import { connectDB } from "./lib/db.js";
import morgan from "morgan";

config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/trucks", truckRoutes);

app.listen(PORT, ()=> {
    console.log("Server running @ Port " + PORT);
    connectDB();
});