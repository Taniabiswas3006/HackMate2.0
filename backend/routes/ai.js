const express = require("express");
const router = express.Router();
const { explain, guidance, generateRoadmap } = require("../controllers/aiController");

// POST /ai/explain
router.post("/explain", explain);

// POST /ai/guidance
router.post("/guidance", guidance);

// POST /ai/roadmap
router.post("/roadmap", generateRoadmap);

module.exports = router;
