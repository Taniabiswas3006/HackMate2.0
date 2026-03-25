const express = require("express");
const router = express.Router();
const { recommend } = require("../controllers/recommendController");
const { authenticateToken } = require("../middleware/auth");

// POST /recommend
router.post("/", authenticateToken, recommend);

module.exports = router;
