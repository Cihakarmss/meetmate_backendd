import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  startTime: String,
  endTime: String,
  isBooked: { type: Boolean, default: false }
});

export default mongoose.model("Availability", availabilitySchema);
