/**
 * AI Response Caching Service
 * ────────────────────────────
 * Caches Gemini API responses to reduce API calls and stay within limits.
 * Uses in-memory cache with TTL (Time To Live) expiration.
 */

class AICache {
  constructor() {
    this.cache = new Map();
    this.enabled = process.env.AI_CACHE_ENABLED === 'true';
    this.ttlMinutes = parseInt(process.env.AI_CACHE_TTL_MINUTES) || 60;
  }

  /**
   * Generate cache key from prompt and parameters
   */
  generateKey(prompt, params = {}) {
    const keyData = { prompt, ...params };
    return Buffer.from(JSON.stringify(keyData)).toString('base64');
  }

  /**
   * Check if cache entry is expired
   */
  isExpired(entry) {
    const now = Date.now();
    const ttlMs = this.ttlMinutes * 60 * 1000;
    return (now - entry.timestamp) > ttlMs;
  }

  /**
   * Get cached response if available and not expired
   */
  get(prompt, params = {}) {
    if (!this.enabled) return null;

    const key = this.generateKey(prompt, params);
    const entry = this.cache.get(key);

    if (!entry) {
      console.log(`   Cache miss for prompt: ${prompt.substring(0, 50)}...`);
      return null;
    }

    if (this.isExpired(entry)) {
      console.log(`   Cache expired for prompt: ${prompt.substring(0, 50)}...`);
      this.cache.delete(key);
      return null;
    }

    console.log(`   Cache hit for prompt: ${prompt.substring(0, 50)}...`);
    return entry.response;
  }

  /**
   * Store response in cache
   */
  set(prompt, params = {}, response) {
    if (!this.enabled) return;

    const key = this.generateKey(prompt, params);
    const entry = {
      response,
      timestamp: Date.now(),
      prompt: prompt.substring(0, 100) + '...' // Store truncated prompt for debugging
    };

    this.cache.set(key, entry);
    console.log(`   Cached response for prompt: ${prompt.substring(0, 50)}...`);
  }

  /**
   * Clear all cached entries
   */
  clear() {
    this.cache.clear();
    console.log('   AI cache cleared');
  }

  /**
   * Get cache statistics
   */
  getStats() {
    let totalEntries = 0;
    let expiredEntries = 0;
    const now = Date.now();
    const ttlMs = this.ttlMinutes * 60 * 1000;

    for (const [key, entry] of this.cache.entries()) {
      totalEntries++;
      if ((now - entry.timestamp) > ttlMs) {
        expiredEntries++;
      }
    }

    return {
      enabled: this.enabled,
      totalEntries,
      expiredEntries,
      activeEntries: totalEntries - expiredEntries,
      ttlMinutes: this.ttlMinutes
    };
  }

  /**
   * Clean up expired entries
   */
  cleanup() {
    const now = Date.now();
    const ttlMs = this.ttlMinutes * 60 * 1000;
    let removed = 0;

    for (const [key, entry] of this.cache.entries()) {
      if ((now - entry.timestamp) > ttlMs) {
        this.cache.delete(key);
        removed++;
      }
    }

    if (removed > 0) {
      console.log(`   Cleaned up ${removed} expired cache entries`);
    }
  }
}

// Create singleton instance
const aiCache = new AICache();

// Periodic cleanup every 10 minutes
setInterval(() => {
  aiCache.cleanup();
}, 10 * 60 * 1000);

module.exports = { aiCache };