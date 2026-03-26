const { askGemini } = require("../services/geminiService");

const FALLBACK_MSG = "AI service unavailable, please try again later.";

/**
 * Parse JSON from AI response, extracting first valid JSON object/array
 */
function extractJSON(text) {
  const jsonMatch = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
  return null;
}

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

    const prompt = `Explain "${topic}" for ${level} ${domain} student. Simple, practical, <5 sentences.`;

    const explanation = await askGemini(prompt, { topic, domain, level, type: 'explanation' });

    return res.status(200).json({
      success: true,
      explanation,
    });
  } catch (error) {
    console.error("Error in /ai/explain:", error.message);
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

    const prompt = `${year}yr ${branch} student wants hackathon tips for ${interest}. Give 3 simple steps.`;

    const advice = await askGemini(prompt, { branch, year, interest, type: 'guidance' });

    return res.status(200).json({
      success: true,
      advice,
    });
  } catch (error) {
    console.error("Error in /ai/guidance:", error.message);
    return res.status(503).json({
      success: false,
      message: error.message || FALLBACK_MSG,
    });
  }
}

/**
 * POST /ai/roadmap
 *
 * Body: { skill: string, level: string, branch: string, year: number }
 * Response: { success: true, roadmap: { topics: [], practical: [] } }
 */
async function generateRoadmap(req, res) {
  try {
    const { skill, level, branch, year } = req.body;

    // ── Input validation ──
    if (!skill || !level) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: skill and level are required.",
      });
    }

    const yearInfo = year ? `${year}yr` : "student";
    const branchInfo = branch ? `${branch}` : "student";

    const prompt = `Create learning roadmap for ${yearInfo} ${branchInfo} student in ${skill} (${level}).

Return JSON:
{
  "topics": [
    {"name": "Topic", "subtopics": ["sub1", "sub2"], "resources": ["res1", "res2"]}
  ],
  "practical": [
    {"project": "Project", "difficulty": "Easy|Medium|Hard", "duration": "X weeks", "skills": ["skill1"]}
  ]
}

Include 4 topics, 3-4 practical projects. Valid JSON only.`;

    const response = await askGemini(prompt, { skill, level, branch, year, type: 'roadmap' });
    const roadmap = extractJSON(response);

    if (!roadmap || !roadmap.topics || !roadmap.practical) {
      console.warn("Gemini returned invalid roadmap structure:", response);
      return res.status(503).json({
        success: false,
        message: "Failed to generate valid roadmap structure",
      });
    }

    return res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error("Error in /ai/roadmap:", error.message);
    return res.status(503).json({
      success: false,
      message: error.message || FALLBACK_MSG,
    });
  }
}

module.exports = { explain, guidance, generateRoadmap };
