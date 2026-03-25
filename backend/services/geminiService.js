const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// ── Use gemini-2.5-flash-lite for best free-tier limits (1000 RPD, 15 RPM) ──
const GEMINI_MODEL = "gemini-2.5-flash-lite";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// ── Retry configuration with aggressive backoff for rate limiting ──
const MAX_RETRIES = 5;
const BASE_DELAY_MS = 2000; // 2s → 4s → 8s → 16s → 32s
const RATE_LIMIT_DELAY_MS = 5000; // 5s minimum wait for 429 errors

// ── Request queue to prevent concurrent requests from hitting rate limits ──
let requestQueue = [];
let isProcessing = false;
const QUEUE_DELAY_MS = 1200; // Enforce at least 1.2s between requests (allows ~50 RPM)

/**
 * Sleep helper
 * @param {number} ms
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Process request queue to prevent rate limiting
 */
async function processQueue() {
  if (isProcessing || requestQueue.length === 0) {
    return;
  }

  isProcessing = true;

  while (requestQueue.length > 0) {
    const { fn, resolve, reject } = requestQueue.shift();

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    }

    // Add delay between requests to respect rate limits
    if (requestQueue.length > 0) {
      await sleep(QUEUE_DELAY_MS);
    }
  }

  isProcessing = false;
}

/**
 * Queue a Gemini request to respect rate limits
 * @param {Function} fn - The async function to execute
 * @returns {Promise} The result of the function
 */
function queueGeminiRequest(fn) {
  return new Promise((resolve, reject) => {
    requestQueue.push({ fn, resolve, reject });
    processQueue();
  });
}

/**
 * Send a prompt to Google Gemini and return the generated text.
 * Includes request queuing and automatic retry with aggressive exponential back-off
 * for rate-limit errors (HTTP 429).
 *
 * @param {string} prompt - The prompt to send
 * @returns {Promise<string>} The generated text
 */
async function askGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables.");
  }

  // Queue the request to prevent hitting rate limits
  return queueGeminiRequest(async () => {
    let lastError;
    let lastRateLimitTime = 0;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // Calculate delay based on whether we've hit rate limits
        if (attempt > 1) {
          const timeSinceLastRateLimit = Date.now() - lastRateLimitTime;
          let delay;

          if (lastError?.response?.status === 429) {
            // Aggressive backoff for 429 errors
            delay = Math.max(
              RATE_LIMIT_DELAY_MS * Math.pow(2, attempt - 2),
              RATE_LIMIT_DELAY_MS
            );
          } else {
            // Standard exponential backoff for other errors
            delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
          }

          console.log(
            `   ⏳ Attempt ${attempt}/${MAX_RETRIES} — waiting ${delay}ms before retry...`
          );
          await sleep(delay);
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
            timeout: 30000, // 30 s timeout (Gemini can be slow under load)
          }
        );

        const text =
          response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error("Empty response from Gemini API.");
        }

        console.log(`   ✅ Gemini request succeeded on attempt ${attempt}`);
        return text.trim();
      } catch (err) {
        lastError = err;

        const status = err.response?.status;
        const apiMessage =
          err.response?.data?.error?.message || err.message;

        // Track when we hit rate limit errors
        if (status === 429) {
          lastRateLimitTime = Date.now();
        }

        console.warn(
          `⚠️  Gemini attempt ${attempt}/${MAX_RETRIES} failed — ` +
            `status ${status || "N/A"}: ${apiMessage}`
        );

        // Only retry on transient / rate-limit errors
        const isRetryable = [429, 500, 502, 503].includes(status);

        if (!isRetryable || attempt === MAX_RETRIES) {
          const finalError =
            status === 429
              ? `Gemini rate limit exceeded (${status}). Please try again in 1-2 minutes.`
              : `Gemini API error (${status || "network"}): ${apiMessage}`;
          throw new Error(finalError);
        }
      }
    }

    // Should never reach here, but just in case
    throw lastError;
  });
}

module.exports = { askGemini };
