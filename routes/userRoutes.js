import express from "express";
import { getMe } from "../controllers/userController.js";
const router = express.Router();

router.post("/me", getMe);

export default router;