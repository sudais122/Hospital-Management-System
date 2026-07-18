import { Router } from "express";
import {
  RegisterPatient,
  login,
  logout,
  getcurrectuser,
  refreshacesstoken,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/Register-Patient", RegisterPatient);
router.post("/login", login);
router.post("/refreshacesstoken", refreshacesstoken);
router.get("/get-current-user", verifyJWT, getcurrectuser);
router.post("/logout", verifyJWT, logout);

export default router;
