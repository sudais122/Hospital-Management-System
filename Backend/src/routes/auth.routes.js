import { Router } from "express";
import {
  RegisterPatient,
  login,
  refreshacesstoken,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/RegisterPatient", RegisterPatient);
router.post("/login", login);
router.post("/refreshacesstoken", refreshacesstoken);

export default router;
