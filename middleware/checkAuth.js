import jwt from "jsonwebtoken";

const checkAuth = (req, res, next) => {
  try {
    const tokenFromCookie = req.cookies?.token;
    const tokenFromHeader = (req.headers.authorization || "").replace(
      /Bearer\s?/,
      ""
    );
    const token = tokenFromCookie || tokenFromHeader;

    if (!token) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId || decoded._id;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default checkAuth;
