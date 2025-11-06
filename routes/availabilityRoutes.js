import express from "express";
import { addAvailability } from "../controllers/availabilityController.js";

const router = express.Router();

router.post("/add", addAvailability,);

export default router;