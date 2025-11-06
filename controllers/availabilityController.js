import Availability from "../models/Availability.js";

export const addAvailability = async (req, res) => {
  try {
    console.log("Req User ID:", req.userId);
    const userId = req.userId;

    const { date, timeSlots } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    const availability = new Availability({
      user: userId,
      date,
      timeSlots,
      isBooked: false,
    });

    await availability.save();
    res.status(201).json({ message: "Availability added successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add availability",
      error: error.message,
    });
  }
};
