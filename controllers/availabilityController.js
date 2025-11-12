import Availability from "../models/Availability.js";

export const getAvailabilities = async (req, res) => {
  try {
    const userId = req.userId;
    const availabilities = await Availability.find({ user: userId })
      .populate("user", "name email")
      .populate("guest", "name email"); 
    res.json(availabilities);
  } catch (error) {
    console.error("❌ getAvailabilities error:", error.message);
    res.status(500).json({ message: "Failed to fetch availabilities" });
  }
};

export const getUserAvailabilities = async (req, res) => {
  try {
    const { id } = req.params;
    const availabilities = await Availability.find({ user: id })
      .populate("user", "name email")
      .populate("guest", "name email"); 

    if (!availabilities || availabilities.length === 0) {
      return res.json([]);
    }

    res.json(availabilities);
  } catch (error) {
    console.error("❌ getUserAvailabilities error:", error.message);
    res.status(500).json({ message: "Failed to fetch user availabilities" });
  }
};

export const addAvailability = async (req, res) => {
  try {
    const { date, timeSlots } = req.body;
    const userId = req.userId;

    const availability = new Availability({
      user: userId,
      date,
      timeSlots,
      isBooked: false,
    });

    await availability.save();
    res.status(201).json({ message: "Availability added successfully" });
  } catch (error) {
    console.error("❌ addAvailability error:", error.message);
    res.status(500).json({ message: "Failed to add availability" });
  }
};
