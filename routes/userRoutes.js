import express from "express";
import { getMe, searchUsers, getUserById } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();


router.get("/me", checkAuth, getMe);


router.get("/search", checkAuth, searchUsers);


router.get("/:id", checkAuth, getUserById);

export default router;
