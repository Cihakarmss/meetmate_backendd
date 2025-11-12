import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guestId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  availabilityId: { type: mongoose.Schema.Types.ObjectId, ref: "Availability", required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Booking", bookingSchema);
