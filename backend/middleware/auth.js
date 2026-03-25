const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_hackmate";

/**
 * Middleware to authenticate JWT token
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: "Access token required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);
    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "User not found." });
    }
    req.user = result.rows[0];
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid token." });
  }
};

module.exports = { authenticateToken };