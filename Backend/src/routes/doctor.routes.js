import { Router } from "express";
import {
    adddoctor,
    updatedoctor,
    deletedoctor
} from "../controllers/doctor.controller.js"
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/Add-Doctor",upload.single("avatar"),adddoctor);
router.patch("/Update-Doctor/:id",updatedoctor);
router.delete("/Delete-Doctor/:id",deletedoctor);

export  default router;