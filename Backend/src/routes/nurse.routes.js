import { Router } from "express";
import{
    addnurse
}from "../controllers/nurse.controller.js"
const router = Router();

router.post("/Add-Nurse",addnurse);
export default router;