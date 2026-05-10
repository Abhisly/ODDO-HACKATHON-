const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  cityName: { type: String, required: true },
  country: { type: String, required: true },
  heroImage: String,
  galleryImages: [String],
  averageBudget: Number,
  averageHotelCost: Number,
  averageMealCost: Number,
  transportCost: Number,
  weatherType: String,
  tags: [String],
  recommendedDays: Number
}, { timestamps: true });

module.exports = mongoose.model('City', citySchema);
