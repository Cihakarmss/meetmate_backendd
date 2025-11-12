import Booking from "../models/Booking.js";
import Availability from "../models/Availability.js";

export const createBooking = async (req, res) => {
  try {
    const guestId = req.userId;
    const { availabilityId } = req.body;

    const availability = await Availability.findById(availabilityId).populate("user", "name email");
    if (!availability) {
      return res.status(404).json({ message: "Availability not found" });
    }

    if (availability.isBooked) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

   
    const booking = new Booking({
      hostId: availability.user._id,
      guestId,
      availabilityId,
      status: "confirmed",
    });
    await booking.save();

   
    availability.isBooked = true;
    availability.guest = guestId;
    await availability.save();

    res.status(201).json({
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Failed to create booking" });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const userId = req.userId;
    const { bookingId } = req.params;

    
    const booking = await Booking.findOne({
      $or: [{ _id: bookingId }, { availabilityId: bookingId }],
      $or: [{ guestId: userId }, { hostId: userId }],
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

   
    const availability = await Availability.findById(booking.availabilityId);
    if (availability) {
      availability.isBooked = false;
      availability.guest = null;
      await availability.save();
    }

    booking.status = "cancelled";
    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("❌ Cancel error:", error);
    res.status(500).json({ message: "Failed to cancel booking" });
  }
};


export const getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({
      $or: [{ guestId: userId }, { hostId: userId }],
    })
      .populate("availabilityId")
      .populate("hostId", "name email")
      .populate("guestId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("❌ getUserBookings error:", error);
    res.status(500).json({ message: "Failed to retrieve bookings" });
  }
};
