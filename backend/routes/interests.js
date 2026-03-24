const express = require("express");
const router = express.Router();
const roadmap = require("../data/roadmapData");

/**
 * GET /interests?branch=CSE
 *
 * Returns the list of available interest domains for the given branch.
 * Derived directly from roadmapData keys.
 */
router.get("/", (req, res) => {
  const { branch } = req.query;

  if (!branch) {
    // Return all branches and their interests
    const all = {};
    for (const b of Object.keys(roadmap)) {
      all[b] = Object.keys(roadmap[b]);
    }
    return res.json({ success: true, data: all });
  }

  const branchData = roadmap[branch];
  if (!branchData) {
    return res.status(404).json({
      success: false,
      message: `Branch "${branch}" not found.`,
      availableBranches: Object.keys(roadmap),
    });
  }

  const interests = Object.keys(branchData);
  return res.json({ success: true, branch, interests });
});

module.exports = router;
