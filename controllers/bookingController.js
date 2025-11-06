import Booking from "../models/Booking.js";
export const createBooking = async (req, res) => {
    try {
        const userId = req.userId;
        const { availabilityId } = req.body;
        const booking = new Booking({
            user: userId,
            availability: availabilityId,
            status: "confirmed",
        });
        await booking.save();
        res.status(201).json({ message: "Booking created successfully" });

        
    } catch (error) {
        res.status(500).json({ message: "Failed to create booking", error: error.message });
        
    }
    
};
export const cancelBooking = async (req, res) => {
    try {
        const userId = req.userId;
        const { bookingId } = req.params;

        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        booking.status = "cancelled";
        await booking.save();
        res.status(200).json({ message: "Booking canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to cancel booking", error: error.message });
    }

};