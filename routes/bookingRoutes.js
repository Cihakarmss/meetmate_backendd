import express from "express";
import {
  createBooking,
  cancelBooking,
  getUserBookings,
} from "../controllers/bookingController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/create", checkAuth, createBooking);
router.put("/cancel/:bookingId", checkAuth, cancelBooking);
router.get("/user", checkAuth, getUserBookings);
export default router;
