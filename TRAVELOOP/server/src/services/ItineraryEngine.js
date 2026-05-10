const { prisma } = require('../config/db');

class ItineraryEngine {
  static async generate(destinations) {
    let itinerary = [];
    let currentDay = 1;
    let totalDuration = 0;

    for (const dest of destinations) {
      const places = await prisma.place.findMany({
        where: { city: dest.city },
        take: dest.duration * 2
      });
      const activities = await prisma.activity.findMany({
        where: { city: dest.city },
        take: dest.duration
      });

      for (let i = 0; i < dest.duration; i++) {
        itinerary.push({
          day: currentDay,
          city: dest.city,
          places: places.slice(i * 2, (i + 1) * 2).map(p => ({ placeId: p.id })),
          activities: activities.slice(i, i + 1).map(a => ({ activityId: a.id }))
        });
        currentDay++;
        totalDuration++;
      }
    }

    return { itinerary, totalDuration };
  }
}

module.exports = ItineraryEngine;
