import express from "express";
import { addAvailability } from "../controllers/availabilityController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/add", checkAuth, addAvailability);

export default router;
