const roadmap = require("../data/roadmapData");
const events = require("../data/eventData");
const users = require("../data/userData");

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
 * @returns {Object[]} Matching peer profiles
 */
function getPeers(interests) {
  return users.filter((user) =>
    user.interests.some((i) => interests.includes(i))
  );
}

module.exports = {
  getLevel,
  getRoadmap,
  getEvents,
  getPeers,
};
