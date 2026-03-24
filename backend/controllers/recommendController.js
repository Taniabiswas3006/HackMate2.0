const {
  getLevel,
  getRoadmap,
  getEvents,
  getPeers,
} = require("../services/logicService");

/**
 * POST /recommend
 *
 * Body: { branch: string, year: number, interests: string[] }
 * Response: { level, roadmap, events, peers }
 */
async function recommend(req, res) {
  try {
    const { branch, year, interests } = req.body;

    // ── Input validation ──────────────────────────────────
    if (!branch || !year || !interests) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: branch, year, and interests are all required.",
      });
    }

    if (!Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({
        success: false,
        message: "interests must be a non-empty array.",
      });
    }

    if (typeof year !== "number" || year < 1 || year > 4) {
      return res.status(400).json({
        success: false,
        message: "year must be a number between 1 and 4.",
      });
    }

    // ── Core logic ────────────────────────────────────────
    const level = getLevel(year);
    const roadmap = getRoadmap(branch, interests, level);
    const events = getEvents(interests, level);
    const peers = getPeers(interests);

    return res.status(200).json({
      success: true,
      level,
      roadmap,
      events,
      peers,
    });
  } catch (error) {
    console.error("❌ Error in /recommend:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
}

module.exports = { recommend };
