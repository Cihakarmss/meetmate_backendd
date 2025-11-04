import express from "express";
import { getMe } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/me", checkAuth, getMe);

export default router;
