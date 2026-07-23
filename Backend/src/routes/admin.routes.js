import { Router } from "express";
import {
  getAllDoctor,
  getAllNurses,
  getAllAppointments,
  adminLogin
} from "../controllers/admin.controller.js";
const router = Router();

router.get("/getAllDoctor", getAllDoctor);
router.get("/getAllNurses", getAllNurses);
router.post("/login", adminLogin);
router.get("/getAllAppointments", getAllAppointments);
export default router;
