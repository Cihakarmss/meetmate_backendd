import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, 
  date: { type: String, required: true },
  timeSlots: [
    {
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
    },
  ],
  isBooked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Availability", availabilitySchema);
