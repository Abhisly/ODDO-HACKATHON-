const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  description: String,
  images: [String],
  timings: String,
  estimatedCost: Number,
  category: String,
  ratings: Number,
  location: String,
  bestTimeToVisit: String
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
