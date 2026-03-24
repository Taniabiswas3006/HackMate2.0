const express = require("express");
const router = express.Router();
const { explain, guidance } = require("../controllers/aiController");

// POST /ai/explain
router.post("/explain", explain);

// POST /ai/guidance
router.post("/guidance", guidance);

module.exports = router;
