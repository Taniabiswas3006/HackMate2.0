const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ── Use gemini-2.5-flash-lite for best free-tier limits (1000 RPD, 15 RPM) ──
const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ── Retry configuration ──
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1500; // 1.5 s → 3 s → 6 s

/**
 * Sleep helper
 * @param {number} ms
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Send a prompt to Google Gemini and return the generated text.
 * Includes automatic retry with exponential back-off for transient errors
 * (HTTP 429 / 500 / 503).
 *
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} The generated text
 */
async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
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
          timeout: 30000, // 30 s timeout (Gemini can be slow under load)
        }
      );

      const text =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("Empty response from Gemini API.");
      }

      return text.trim();
    } catch (err) {
      lastError = err;

      const status = err.response?.status;
      const apiMessage =
        err.response?.data?.error?.message || err.message;

      console.warn(
        `⚠️  Gemini attempt ${attempt}/${MAX_RETRIES} failed — ` +
          `status ${status || "N/A"}: ${apiMessage}`
      );

      // Only retry on transient / rate-limit errors
      const isRetryable = [429, 500, 502, 503].includes(status);

      if (!isRetryable || attempt === MAX_RETRIES) {
        throw new Error(
          `Gemini API error (${status || "network"}): ${apiMessage}`
        );
      }

      // Exponential back-off
      const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
      console.log(`   ↳ retrying in ${delay}ms …`);
      await sleep(delay);
    }
  }

  // Should never reach here, but just in case
  throw lastError;
}

module.exports = { askGemini };
