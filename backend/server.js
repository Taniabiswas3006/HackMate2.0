const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { testConnection } = require("./config/db");
const recommendRoutes = require("./routes/recommend");
const interestsRoutes = require("./routes/interests");
const aiRoutes = require("./routes/ai");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ── Routes ────────────────────────────────────────────
app.use("/recommend", recommendRoutes);
app.use("/interests", interestsRoutes);
app.use("/ai", aiRoutes);
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);

// Health-check endpoint (moved to /api/health so index.html is served at /)
app.get("/api/health", (req, res) => {
  res.json({
    message: "HackMate API is running",
    version: "1.0.0",
    endpoints: {
      recommend: "POST /recommend",
      interests: "GET /interests?branch=CSE",
      aiExplain: "POST /ai/explain",
      aiGuidance: "POST /ai/guidance",
    },
  });
});

// ── Start Server ──────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\nHackMate server running on http://localhost:${PORT}`);
  console.log(`   POST http://localhost:${PORT}/recommend`);
  console.log(`   POST http://localhost:${PORT}/ai/explain`);
  console.log(`   POST http://localhost:${PORT}/ai/guidance\n`);

  // Test DB connection (non-blocking — server runs even if DB is down)
  await testConnection();
});
