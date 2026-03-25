const { Pool } = require("pg");
require("dotenv").config();

// Create a connection pool for Supabase PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  }
});

/**
 * Test the database connection
 */
async function testConnection() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log("✓ PostgreSQL (Supabase) connected successfully");
    console.log(`  Current time: ${result.rows[0].now}`);
    client.release();
    return true;
  } catch (error) {
    console.error("✗ PostgreSQL connection failed:", error?.message || error);
    return false;
  }
}

module.exports = { pool, testConnection };
