const NodeCache = require('node-cache');

// Cache with 10 minute TTL
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

module.exports = {
  get(key) {
    return cache.get(key);
  },

  set(key, value) {
    cache.set(key, value);
  },

  has(key) {
    return cache.has(key);
  },

  clear() {
    cache.flushAll();
  }
};
