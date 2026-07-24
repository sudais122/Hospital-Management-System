import { Router } from "express";
import {
  getAllDoctor,
  getAllNurses,
  getAllAppointments,
  adminLogin
} from "../controllers/admin.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/getAllDoctor",verifyJWT, getAllDoctor);
router.get("/getAllNurses", verifyJWT,getAllNurses);
router.post("/login", adminLogin);
router.get("/getAllAppointments", verifyJWT,getAllAppointments);
export default router;
