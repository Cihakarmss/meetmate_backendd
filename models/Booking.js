import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  availabilityId: { type: mongoose.Schema.Types.ObjectId, ref: "Availability" },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Booking", bookingSchema);
