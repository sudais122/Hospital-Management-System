import {Router} from "express"
import { RegisterPatient } from "../controllers/auth.controller.js";

const router = Router();

router.post('/RegisterPatient' ,RegisterPatient);

export default router


