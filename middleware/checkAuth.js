import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (!token) {
    return res.status(403).json({ message: "No access" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.userId = decoded.userId; // 👈 düzəldilmiş sətir
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token", error: err.message });
  }
};
