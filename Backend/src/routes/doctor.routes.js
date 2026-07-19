import { Router } from "express";
import {
    adddoctor
} from "../controllers/doctor.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/Add-Doctor",upload.single("avatar"),adddoctor);

export  default router;