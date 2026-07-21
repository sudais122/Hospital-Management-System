import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import Routes
import authRouter from "./routes/auth.routes.js";
import Doctor from "./routes/doctor.routes.js";
import Nurse from "./routes/nurse.routes.js";
import Appointment from "./routes/doctor.routes.js";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


app.use("/user", authRouter);
app.use("/doctor", Doctor);
app.use("/Nurse", Nurse);
app.use("Appointment",Appointment);

export { app };
