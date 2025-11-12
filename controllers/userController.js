import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user data",
      error: error.message,
    });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.json([]);

    const users = await User.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("_id name email createdAt")
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "User search failed",
      error: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("_id name email createdAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve user info",
      error: error.message,
    });
  }
};
