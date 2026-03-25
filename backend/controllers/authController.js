const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey_hackmate";

// Helper function to format the user document
const formatUser = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    gender: user.gender || "",
    branch: user.branch,
    department: user.department || user.branch,
    year: user.year,
    interests: user.interests || [],
  };
};

/**
 * POST /auth/signup
 */
async function signup(req, res) {
  try {
    const { name, email, password, phone, gender, department, year, interests } = req.body;

    if (!name || !email || !password || !department || !year) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Check if user exists
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const branch = department;
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password, phone, gender, branch, department, year, interests) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, gender, branch, department, year, JSON.stringify(interests || [])]
    );

    const newUserId = result.insertId;

    // Get the newly created user
    const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [newUserId]);
    const user = userRows[0];

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      token,
      user: formatUser(user),
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, message: "Server error during signup." });
  }
}

/**
 * POST /auth/login
 */
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    const DEMO_EMAIL = process.env.DEMO_EMAIL || "demo@hackmate.com";
    const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "demopassword";
    const isDemoCredentials = email === DEMO_EMAIL && password === DEMO_PASSWORD;

    // Search user in database
    const [userRows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (userRows.length === 0) {
      if (isDemoCredentials) {
        const demoUser = {
          id: 0,
          name: "Demo User",
          email: DEMO_EMAIL,
          phone: "0000000000",
          gender: "Other",
          branch: "CSE",
          department: "CSE",
          year: "1st Year",
          interests: ["AI", "Web Development"],
        };
        const token = jwt.sign({ userId: demoUser.id, email: demoUser.email }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({ success: true, token, user: demoUser });
      }
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const user = userRows[0];

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      token,
      user: formatUser(user),
    });
  } catch (error) {
    const DEMO_EMAIL = process.env.DEMO_EMAIL || "demo@hackmate.com";
    const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "demopassword";
    const { email, password } = req.body || {};

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demoUser = {
        id: 0,
        name: "Demo User",
        email: DEMO_EMAIL,
        phone: "0000000000",
        gender: "Other",
        branch: "CSE",
        department: "CSE",
        year: "1st Year",
        interests: ["AI", "Web Development"],
      };
      const token = jwt.sign({ userId: demoUser.id, email: demoUser.email }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).json({ success: true, token, user: demoUser });
    }

    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Server error during login." });
  }
}

/**
 * GET /auth/me
 */
async function me(req, res) {
  try {
    // Expected token in header: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided." });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.userId]);
    if (userRows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      user: formatUser(userRows[0]),
    });
  } catch (error) {
    console.error("Auth Me Error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token." });
  }
}

/**
 * PUT /auth/profile
 */
async function updateProfile(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided." });
        }
        
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        const { name, branch, year, interests } = req.body;
        const department = branch;
        
        await pool.query(
            "UPDATE users SET name = ?, branch = ?, department = ?, year = ?, interests = ? WHERE id = ?",
            [name, branch, department, year, JSON.stringify(interests || []), decoded.userId]
        );

        const [userRows] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.userId]);
        
        res.status(200).json({
            success: true,
            user: formatUser(userRows[0])
        });

    } catch (error) {
        console.error("Update Profile Error:", error.message);
        res.status(500).json({ success: false, message: "Failed to update profile." });
    }
}


module.exports = { signup, login, me, updateProfile };
