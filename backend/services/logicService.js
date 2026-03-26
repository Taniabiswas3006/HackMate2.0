const roadmap = require("../data/roadmapData");
const events = require("../data/eventData");
const { pool } = require("../config/db");

/**
 * Determine skill level based on academic year.
 *   Year 1–2 → Beginner
 *   Year 3   → Intermediate
 *   Year 4   → Advanced
 *
 * @param {number} year - Student's current academic year (1–4)
 * @returns {string} Level string
 */
function getLevel(year) {
  if (year <= 2) return "Beginner";
  if (year === 3) return "Intermediate";
  return "Advanced";
}

/**
 * Build a personalised roadmap for every interest the student listed.
 * Falls back gracefully when a branch/interest/level combination is missing.
 *
 * @param {string}   branch    - e.g. "CSE"
 * @param {string[]} interests - e.g. ["AI", "Web"]
 * @param {string}   level     - "Beginner" | "Intermediate" | "Advanced"
 * @returns {Object[]} Array of { interest, steps } objects
 */
function getRoadmap(branch, interests, level) {
  const result = [];

  for (const interest of interests) {
    const steps =
      roadmap?.[branch]?.[interest]?.[level] ?? [];

    result.push({
      interest,
      level,
      steps,
    });
  }

  return result;
}

/**
 * Filter events whose domain matches ANY of the student's interests
 * and whose level matches the student's computed level.
 *
 * @param {string[]} interests - e.g. ["AI"]
 * @param {string}   level     - "Beginner" | "Intermediate" | "Advanced"
 * @returns {Object[]} Matching events
 */
function getEvents(interests, level) {
  return events.filter(
    (event) =>
      interests.includes(event.domain) && event.level === level
  );
}

/**
 * Find peers who share at least one interest with the requesting student.
 *
 * @param {string[]} interests - The requesting student's interests
 * @param {number} currentUserId - The ID of the current user to exclude
 * @returns {Promise<Object[]>} Matching peer profiles
 */
async function getPeers(interests, currentUserId) {
  try {
    let query
    let params

    if (!Array.isArray(interests) || interests.length === 0) {
      query = `
        SELECT id, name, email, phone, gender, branch, department, year, interests
        FROM users
        WHERE id != $1
        ORDER BY id
        LIMIT 50
      `
      params = [currentUserId]
    } else {
      // Normalize interests: lowercase and trimmed for generalized, robust matching across all departments.
      const normalizedInterests = interests
        .filter(Boolean)
        .map((interest) => interest.toString().trim().toLowerCase());

      // Only show peers who have at least one shared interest with the current user
      // No other peers should be shown.
      query = `
        SELECT id, name, email, phone, gender, branch, department, year, interests
        FROM users
        WHERE id != $1 AND EXISTS (
          SELECT 1 FROM jsonb_array_elements_text(interests) AS t(interest)
          WHERE lower(trim(t.interest)) = ANY($2::text[])
        )
      `
      params = [currentUserId, normalizedInterests]
    }

    const result = await pool.query(query, params);

    return result.rows.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      gender: user.gender || "",
      branch: user.branch,
      department: user.department || user.branch,
      year: user.year,
      interests: user.interests || [],
    }));
  } catch (error) {
    console.error("Error fetching peers:", error);
    return [];
  }
}

module.exports = {
  getLevel,
  getRoadmap,
  getEvents,
  getPeers,
};
