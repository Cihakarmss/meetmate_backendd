import mongoose from "mongoose";

const AvailabilitySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  date: { type: String, required: true },
  timeSlots: [
    {
      startTime: String,
      endTime: String,
    },
  ],
  isBooked: { type: Boolean, default: false },
});

export default mongoose.model("Availability", AvailabilitySchema);
