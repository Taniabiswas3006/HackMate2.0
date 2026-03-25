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

    const yearInfo = year ? `${year} year` : "student";
    const branchInfo = branch ? `${branch} branch` : "student";

    const prompt = `Generate a comprehensive personalized learning roadmap for a ${yearInfo} ${branchInfo} student interested in ${skill} at ${level} level. 

Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, pure JSON):
{
  "topics": [
    {
      "name": "Topic Name",
      "subtopics": ["subtopic1", "subtopic2", "subtopic3"],
      "resources": ["resource1", "resource2", "resource3"]
    }
  ],
  "practical": [
    {
      "project": "Project Name",
      "difficulty": "Easy|Medium|Hard|Expert",
      "duration": "X weeks",
      "skills": ["skill1", "skill2"]
    }
  ]
}

Make sure:
- Include 4 topics for ${level} level
- Each topic has 3-4 subtopics
- Each topic has 2-3 resources
- Include 3-4 practical projects
- Projects have appropriate difficulty for ${level} level
- Difficulties progress from Easy to Hard
- Return valid JSON only, no extra text`;

    const response = await askGemini(prompt);
    const roadmap = extractJSON(response);

    if (!roadmap || !roadmap.topics || !roadmap.practical) {
      console.warn("⚠️  Gemini returned invalid roadmap structure:", response);
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
    console.error("❌ Error in /ai/roadmap:", error.message);
    return res.status(503).json({
      success: false,
      message: error.message || FALLBACK_MSG,
    });
  }
}

module.exports = { explain, guidance, generateRoadmap };
