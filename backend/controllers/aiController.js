const { askGemini } = require("../services/geminiService");

const FALLBACK_MSG = "AI service unavailable, please try again later.";

/**
 * POST /ai/explain
 *
 * Body: { topic: string, domain: string, level: string }
 * Response: { success: true, explanation: string }
 */
async function explain(req, res) {
  try {
    const { topic, domain, level } = req.body;

    // ── Input validation ──
    if (!topic || !domain || !level) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: topic, domain, and level are all required.",
      });
    }

    const prompt = `Explain the topic "${topic}" for a ${level} level student in ${domain}. Keep it simple, practical, and under 5 sentences.`;

    const explanation = await askGemini(prompt);

    return res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error("❌ Error in /ai/explain:", error.message);
    return res.status(503).json({
      success: false,
      message: error.message || FALLBACK_MSG,
    });
  }
}

/**
 * POST /ai/guidance
 *
 * Body: { branch: string, year: number, interest: string }
 * Response: { success: true, advice: string }
 */
async function guidance(req, res) {
  try {
    const { branch, year, interest } = req.body;

    // ── Input validation ──
    if (!branch || !year || !interest) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: branch, year, and interest are all required.",
      });
    }

    const prompt = `A ${year} year ${branch} student interested in ${interest} wants to participate in hackathons. Give 3 simple steps they should follow.`;

    const advice = await askGemini(prompt);

    return res.status(200).json({
      success: true,
      advice,
    });
  } catch (error) {
    console.error("❌ Error in /ai/guidance:", error.message);
    return res.status(503).json({
      success: false,
      message: error.message || FALLBACK_MSG,
    });
  }
}

module.exports = { explain, guidance };
