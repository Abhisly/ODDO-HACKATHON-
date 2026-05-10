const mongoose = require('mongoose');

const checklistItemSchema = new mongoose.Schema({
  item: String,
  packed: { type: Boolean, default: false }
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: { type: Date, default: Date.now }
});

const tripSchema = new mongoose.Schema({
  tripName: { type: String, required: true },
  destinations: [{
    city: String,
    duration: Number // in days
  }],
  totalDuration: Number,
  itinerary: [{
    day: Number,
    city: String,
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
    places: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
  }],
  budgetSummary: {
    totalEstimated: Number,
    accommodation: Number,
    food: Number,
    transport: Number,
    activities: Number
  },
  travelersCount: { type: Number, default: 1 },
  tripImages: [String],
  packingChecklist: [checklistItemSchema],
  notes: [noteSchema],
  userId: { type: String, default: 'mock-user-123' },
  isPublic: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
