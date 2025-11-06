import express from "express";
import {createBooking,cancelBooking} from "../controllers/bookingController.js";
const router = express.Router();

router.post("/create", createBooking);
router.put("/cancel/:bookingId", cancelBooking);  
export default router;