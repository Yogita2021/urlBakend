const crypto = require("crypto");

function generateShortUrl(originalUrl) {
  const hash = crypto.createHash("md5").update(originalUrl).digest("Hex");

  const shortUrl = hash.substring(0, 7);
  return shortUrl;
}

module.exports = { generateShortUrl };
