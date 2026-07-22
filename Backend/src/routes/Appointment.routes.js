import { Router } from "express";
import {
    bookAppointment,
    conformedStstus,
    CompletedStstus,
    CancellStstus,
    getmyappointments
} from "../controllers/appointment.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/Book-Appointment",verifyJWT, bookAppointment);

router.patch("/Conform/:id",conformedStstus);
router.patch("/Complete/:id",CompletedStstus);
router.patch("/Cancell/:id",CancellStstus);

router.get("/my-appointments", verifyJWT, getmyappointments);

export default router;
