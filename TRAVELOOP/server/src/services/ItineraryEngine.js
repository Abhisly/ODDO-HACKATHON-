const City = require('../models/City');
const Place = require('../models/Place');
const Activity = require('../models/Activity');

class ItineraryEngine {
  static async generate(destinations) {
    let itinerary = [];
    let currentDay = 1;
    let totalDuration = 0;

    for (const dest of destinations) {
      const cityData = await City.findOne({ cityName: dest.city });
      const places = await Place.find({ city: dest.city }).limit(dest.duration * 2);
      const activities = await Activity.find({ city: dest.city }).limit(dest.duration);

      for (let i = 0; i < dest.duration; i++) {
        itinerary.push({
          day: currentDay,
          city: dest.city,
          places: places.slice(i * 2, (i + 1) * 2).map(p => p._id),
          activities: activities.slice(i, i + 1).map(a => a._id)
        });
        currentDay++;
        totalDuration++;
      }
    }

    return { itinerary, totalDuration };
  }
}

module.exports = ItineraryEngine;
