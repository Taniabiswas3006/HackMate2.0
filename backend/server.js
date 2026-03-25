const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

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

// Health-check endpoint
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

// ── Database Initialization ────────────────────────────
async function initializeDatabase() {
  console.log("\n════════════════════════════════════════════════════════");
  console.log("🔧 INITIALIZING DATABASE");
  console.log("════════════════════════════════════════════════════════\n");

  const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log("🔌 Connecting to Supabase PostgreSQL...");
    const client = await connection.connect();
    console.log("✓ Connected to Supabase\n");

    // Using IF NOT EXISTS to persist data

    // Create Users table
    console.log("📝 Creating users table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        gender VARCHAR(20),
        branch VARCHAR(50) NOT NULL,
        department VARCHAR(50),
        year VARCHAR(20) NOT NULL,
        interests JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✓ Users table created\n");

    // Create Events table
    console.log("📝 Creating events table...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        domain VARCHAR(100) NOT NULL,
        level VARCHAR(50) NOT NULL,
        location VARCHAR(100) NOT NULL
      )
    `);
    console.log("✓ Events table created\n");

    const userCountResult = await client.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(userCountResult.rows[0].count);

    if (userCount === 0) {
      // Seed Users Data
      console.log("🌱 Seeding users data...");
    const usersData = [
      ["Amit",    "CSE",  1, ["AI", "Web Development"]],
      ["Sneha",   "CSE",  3, ["AI", "Data Science"]],
      ["Ananya",  "CSE",  2, ["Web Development", "Mobile"]],
      ["Rohit",   "CSE",  4, ["AI", "Cybersecurity"]],
      ["Riya",    "IT",   2, ["Web Development", "AI"]],
      ["Vikram",  "IT",   4, ["Data Science", "AI"]],
      ["Neha",    "IT",   1, ["Web Development", "UI/UX"]],
      ["Raj",     "ECE",  2, ["IoT", "Embedded Systems"]],
      ["Meera",   "ECE",  3, ["AI", "Robotics"]],
      ["Arjun",   "ECE",  1, ["Web Development", "AI"]],
      ["Karan",   "ME",   3, ["AI", "Robotics"]],
      ["Deepak",  "ME",   2, ["Data Science", "AI"]],
      ["Priya",   "AIML", 1, ["AI", "Data Science"]],
      ["Ishaan",  "AIML", 3, ["AI", "Machine Learning"]],
      ["Tanvi",   "AIML", 2, ["AI", "Web Development"]],
      ["Suresh",  "CE",   2, ["Web Development", "AI"]],
      ["Kavita",  "CE",   3, ["Data Science", "AI"]],
      ["Arun",    "EE",   2, ["IoT", "AI"]],
      ["Pooja",   "EE",   3, ["AI", "Embedded Systems"]],
    ];

    const defaultPassword = "$2a$10$w0pYdE60E5mE7GvCqGz9Tu0hA.7kTkI9L6H8pG8x9G8x9G8x9G8x9";
    for (const [name, branch, year, interests] of usersData) {
      const email = `${name.toLowerCase()}@example.com`;
      const yearStr = `${year}${year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year`;
      await client.query(
        `INSERT INTO users (name, email, password, branch, department, year, interests) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [name, email, defaultPassword, branch, branch, yearStr, JSON.stringify(interests)]
      );
    }
    console.log(`✓ Seeded ${usersData.length} users\n`);

    // Seed Demo User
    const demoEmail = process.env.DEMO_EMAIL || "demo@hackmate.com";
    const demoPassword = process.env.DEMO_PASSWORD || "demopassword";
    const demoHashedPassword = await bcrypt.hash(demoPassword, 10);

    console.log("🎯 Seeding demo user...");
    await client.query(
      `INSERT INTO users (name, email, password, phone, gender, branch, department, year, interests) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        "Demo User",
        demoEmail,
        demoHashedPassword,
        "0000000000",
        "Other",
        "CSE",
        "CSE",
        "1st Year",
        JSON.stringify(["AI", "Web Development"]),
      ]
    );
    console.log(`✓ Demo user created: ${demoEmail}\n`);

    // Seed Events Data
    console.log("🌱 Seeding events data...");
    const eventsData = [
      ["Hack4India AI Sprint",       "AI",                    "Beginner",     "Online"],
      ["AI Bootcamp Week",           "AI",                    "Beginner",     "Online"],
      ["Deep Learning Hackathon",    "AI",                    "Advanced",     "Online"],
      ["ML Model Challenge",         "AI",                    "Intermediate", "Bangalore"],
      ["Kolkata Web Dev Fest",       "WebDevelopment",        "Beginner",     "Kolkata"],
      ["Full Stack Hackathon",       "WebDevelopment",        "Intermediate", "Bangalore"],
      ["React India Challenge",      "WebDevelopment",        "Advanced",     "Mumbai"],
      ["CyberShield CTF",            "CyberSecurity",         "Beginner",     "Online"],
      ["Bug Bounty Bootcamp",        "CyberSecurity",         "Intermediate", "Online"],
      ["HackSecure Advanced CTF",    "CyberSecurity",         "Advanced",     "Delhi"],
      ["Data Viz Challenge",         "DataAnalysis",          "Beginner",     "Online"],
      ["Analytics Hackathon",        "DataAnalysis",          "Intermediate", "Hyderabad"],
      ["DataScience Summit",         "DataScience",           "Intermediate", "Bangalore"],
      ["Web3 Buildathon",            "Blockchain",            "Beginner",     "Online"],
      ["Smart Contract Hackathon",   "Blockchain",            "Intermediate", "Online"],
      ["DeFi Innovation Challenge",  "Blockchain",            "Advanced",     "Bangalore"],
      ["Hardware Design Challenge",  "Core",                  "Beginner",     "Online"],
      ["Circuit Innovators",         "Core",                  "Intermediate", "Chennai"],
      ["Embedded Systems Workshop",  "EmbeddedSystems",       "Beginner",     "Online"],
      ["Microcontroller Challenge",  "EmbeddedSystems",       "Intermediate", "Pune"],
      ["IoT Innovation Sprint",      "IoT",                   "Beginner",     "Online"],
      ["Smart City IoT Hackathon",   "IoT",                   "Intermediate", "Delhi"],
      ["RoboWars Beginner League",   "Robotics",              "Beginner",     "Kolkata"],
      ["Autonomous Bot Challenge",   "Robotics",              "Advanced",     "Bangalore"],
      ["Code Craft Challenge",       "SoftwareEngineering",   "Beginner",     "Online"],
      ["System Design Hackathon",    "SoftwareEngineering",   "Advanced",     "Hyderabad"],
      ["Vision AI Hackathon",        "ComputerVision",        "Intermediate", "Online"],
      ["NLP Text Challenge",         "NLP",                   "Intermediate", "Online"],
      ["Smart Grid Innovation",      "PowerSystems",          "Intermediate", "Chennai"],
      ["Green Energy Hackathon",     "RenewableEnergy",       "Beginner",     "Online"],
      ["Bridge Design Challenge",    "StructuralEngineering", "Beginner",     "Online"],
      ["Sustainability Hackathon",   "EnvironmentalEngineering","Intermediate","Delhi"],
    ];

    for (const [name, domain, level, location] of eventsData) {
      await client.query(
        `INSERT INTO events (name, domain, level, location) VALUES ($1, $2, $3, $4)`,
        [name, domain, level, location]
      );
    }
    console.log(`✓ Seeded ${eventsData.length} events\n`);
    } else {
      console.log(`✓ Database already seeded with ${userCount} users. Skipping seeding.\n`);
    }

    // Summary
    console.log("════════════════════════════════════════════════════════");
    console.log("✅ DATABASE INITIALIZATION COMPLETED");
    console.log("════════════════════════════════════════════════════════");
    console.log(`   Database  : Supabase PostgreSQL`);
    console.log(`   Tables    : users, events`);
    const demoEmailDisp = process.env.DEMO_EMAIL || "demo@hackmate.com";
    console.log(`   Users     : Ready`);
    console.log(`   Events    : Ready`);
    console.log(`   Demo user : ${demoEmailDisp}`);
    console.log("════════════════════════════════════════════════════════\n");

    client.release();
    await connection.end();
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    await connection.end();
    throw error;
  }
}

// ── Start Server ──────────────────────────────────────
async function startServer() {
  try {
    console.log("🔧 HACKMATE BACKEND STARTUP");
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log("🚀 STARTING SERVER");
      console.log("════════════════════════════════════════════════════════");
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log(`   POST http://localhost:${PORT}/auth/login`);
      console.log(`   POST http://localhost:${PORT}/recommend`);
      console.log(`   POST http://localhost:${PORT}/ai/explain`);
      console.log(`   GET  http://localhost:${PORT}/api/health`);
      console.log("════════════════════════════════════════════════════════\n");
      console.log("Ready to accept requests!\n");
    });
  } catch (error) {
    console.error("❌ Startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
