const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  category: String,
  duration: String,
  estimatedPrice: Number,
  images: [String],
  description: String,
  rating: Number
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
