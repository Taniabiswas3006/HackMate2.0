/**
 * Database Initialisation Script
 * ──────────────────────────────
 * Creates the `hackmate` database (if it doesn't exist),
 * then creates the `users` and `events` tables and seeds
 * them with sample data.
 *
 * Usage:  node scripts/initDB.js
 */

const mysql = require("mysql2/promise");
require("dotenv").config();

async function initDB() {
  // Connect WITHOUT specifying a database so we can CREATE it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    port: process.env.DB_PORT || 3306,
  });

  const DB_NAME = process.env.DB_NAME || "hackmate";

  console.log("🔧 Creating database if not exists…");
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``
  );
  await connection.query(`USE \`${DB_NAME}\``);

  // ── Users table ──────────────────────────────────────
  console.log("🔧 Creating users table…");
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      branch VARCHAR(50) NOT NULL,
      year INT NOT NULL
    )
  `);

  // ── Events table ─────────────────────────────────────
  console.log("🔧 Creating events table…");
  await connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      domain VARCHAR(100) NOT NULL,
      level VARCHAR(50) NOT NULL,
      location VARCHAR(100) NOT NULL
    )
  `);

  // ── Seed data ────────────────────────────────────────
  console.log("🌱 Seeding users…");
  const usersData = [
    ["Amit",    "CSE",  1],
    ["Sneha",   "CSE",  3],
    ["Ananya",  "CSE",  2],
    ["Rohit",   "CSE",  4],
    ["Riya",    "IT",   2],
    ["Vikram",  "IT",   4],
    ["Neha",    "IT",   1],
    ["Raj",     "ECE",  2],
    ["Meera",   "ECE",  3],
    ["Arjun",   "ECE",  1],
    ["Karan",   "ME",   3],
    ["Deepak",  "ME",   2],
    ["Priya",   "AIML", 1],
    ["Ishaan",  "AIML", 3],
    ["Tanvi",   "AIML", 2],
    ["Suresh",  "CE",   2],
    ["Kavita",  "CE",   3],
    ["Arun",    "EE",   2],
    ["Pooja",   "EE",   3],
  ];

  await connection.query("DELETE FROM users");
  for (const [name, branch, year] of usersData) {
    await connection.query(
      "INSERT INTO users (name, branch, year) VALUES (?, ?, ?)",
      [name, branch, year]
    );
  }

  console.log("🌱 Seeding events…");
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

  await connection.query("DELETE FROM events");
  for (const [name, domain, level, location] of eventsData) {
    await connection.query(
      "INSERT INTO events (name, domain, level, location) VALUES (?, ?, ?, ?)",
      [name, domain, level, location]
    );
  }

  console.log(`\n✅ Database initialised successfully!`);
  console.log(`   Database : ${DB_NAME}`);
  console.log(`   Tables   : users, events`);
  console.log(`   Users    : ${usersData.length} rows`);
  console.log(`   Events   : ${eventsData.length} rows\n`);

  await connection.end();
}

initDB().catch((err) => {
  console.error("❌ Database initialisation failed:", err.message);
  process.exit(1);
});
