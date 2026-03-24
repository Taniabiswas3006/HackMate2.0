const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Send a prompt to Google Gemini and return the generated text.
 *
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} The generated text
 */
async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  const response = await axios.post(
    GEMINI_URL,
    {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    },
    {
      headers: { "Content-Type": "application/json" },
      timeout: 15000, // 15s timeout
    }
  );

  const text =
    response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("Empty response from Gemini API.");
  }

  return text.trim();
}

module.exports = { askGemini };
