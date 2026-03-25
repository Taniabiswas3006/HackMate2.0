/**
 * Database Initialisation Script for Supabase PostgreSQL
 * ────────────────────────────────────────────────────────
 * Creates the `hackmate` schema and tables with sample data.
 *
 * Usage:  node scripts/initDB.js
 */

const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function initDB() {
  const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log("🔌 Connecting to Supabase PostgreSQL...");
    const client = await connection.connect();
    console.log("✓ Connected to Supabase\n");

    // ── Drop existing tables (if exists) ───────────────────
    console.log("🔄 Dropping existing tables if they exist...");
    await client.query(`DROP TABLE IF EXISTS events CASCADE`);
    await client.query(`DROP TABLE IF EXISTS users CASCADE`);
    console.log("✓ Cleaned up existing tables\n");

    // ── Create Users table ────────────────────────────────
    console.log("📝 Creating users table...");
    await client.query(`
      CREATE TABLE users (
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

    // ── Create Events table ───────────────────────────────
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

    // ── Seed Users Data ───────────────────────────────────
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

    const defaultPassword = "$2a$10$w0pYdE60E5mE7GvCqGz9Tu0hA.7kTkI9L6H8pG8x9G8x9G8x9G8x9"; // Dummy bcrypt
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

    // ── Seed Demo User ─────────────────────────────────────
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

    // ── Seed Events Data ───────────────────────────────────
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

    // ── Summary ────────────────────────────────────────────
    console.log("═══════════════════════════════════════════════════════");
    console.log("✅ Database initialisation completed successfully!");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`   Database  : Supabase PostgreSQL`);
    console.log(`   Tables    : users, events`);
    console.log(`   Users     : ${usersData.length + 1} rows (+ 1 demo)`);
    console.log(`   Events    : ${eventsData.length} rows`);
    console.log(`   Demo user : ${demoEmail}`);
    console.log("═══════════════════════════════════════════════════════\n");

    client.release();
  } catch (error) {
    console.error("❌ Database initialisation failed:", error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

initDB();
