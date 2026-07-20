import { Router } from "express";
import {
  addnurse,
  deletenurse,
  updatenurse,
} from "../controllers/nurse.controller.js";

const router = Router();

router.post("/Add-Nurse", addnurse);
router.patch("/Update_Nurse", updatenurse);
router.delete("/Delete-Nurse", deletenurse);

export default router;
