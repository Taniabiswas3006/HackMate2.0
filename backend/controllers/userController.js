const { pool } = require("../config/db");

/**
 * GET /users/:id
 * Get public user profile (without sensitive info)
 */
async function getUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id;

    if (parseInt(userId) === currentUserId) {
      return res.status(400).json({ success: false, message: "Cannot view your own profile here" });
    }

    const result = await pool.query(
      "SELECT id, name, branch, department, year, interests FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = result.rows[0];

    // Format user data
    const formattedUser = {
      id: user.id,
      name: user.name,
      branch: user.branch,
      department: user.department || user.branch,
      year: user.year,
      interests: user.interests || [],
    };

    res.status(200).json({
      success: true,
      user: formattedUser,
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

module.exports = {
  getUserProfile,
};