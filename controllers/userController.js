import User from "../models/User.js";
export const getMe = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-passwordHash");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: "Failed to retrieve user data", error: error.message});
    }


};
