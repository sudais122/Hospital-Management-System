import { Router } from "express";
import {
    bookapointment,
    conformedStstus,
    CompletedStstus,
    CancellStstus,
    getmyappointments
} from "../controllers/appointment.controller.js"
const router = Router();

router.post("/Book-Appointment/:id", bookapointment);

router.patch("/Conform/:id",conformedStstus);
router.patch("/Complete/:id",CompletedStstus);
router.patch("/Cancell/:id",CancellStstus);

router.get("/Get-Appointment",getmyappointments);

export default router;
