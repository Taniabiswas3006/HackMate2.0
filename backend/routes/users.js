const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/userController");
const { authenticateToken } = require("../middleware/auth");

// GET /users/:id - Get public user profile
router.get("/:id", authenticateToken, getUserProfile);

module.exports = router;