const mongoose = require("mongoose");

const ShortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  ShortenUrl: { type: String, required: true, unique: true },
});

const ShortUrlModel = mongoose.model("url", ShortUrlSchema);

module.exports = { ShortUrlModel };
