import express from "express";
import { addAvilability } from "../controllers/availabilityController.js";

const router = express.Router();

router.post("/add", addAvilability);

export default router;