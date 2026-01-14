import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No admin token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not admin" });
    }

    req.admin = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
