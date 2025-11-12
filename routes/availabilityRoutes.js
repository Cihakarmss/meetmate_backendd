import express from "express";
import {
  addAvailability,
  getAvailabilities,
  getUserAvailabilities,
} from "../controllers/availabilityController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/user/:id", checkAuth, getUserAvailabilities);

router.get("/", checkAuth, getAvailabilities);

router.post("/add", checkAuth, addAvailability);

export default router;
