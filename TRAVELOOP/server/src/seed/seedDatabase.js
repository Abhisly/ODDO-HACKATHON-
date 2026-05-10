const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

const destinationsFile = require('../datasets/destinations.json');
const famousPlacesFile = require('../datasets/famousPlaces.json');
const activitiesFile = require('../datasets/activities.json');

dotenv.config();

const importData = async () => {
  try {
    await prisma.$connect();
    
    // Clear existing data safely due to relations
    await prisma.activity.deleteMany();
    await prisma.place.deleteMany();
    await prisma.city.deleteMany();
    await prisma.trip.deleteMany();

    // Insert Cities
    const cities = destinationsFile.destinations || [];
    for (const city of cities) {
      await prisma.city.create({
        data: {
          id: city.id,
          city: city.city,
          country: city.country,
          continent: city.continent,
          description: city.description,
          heroImage: city.heroImage,
          galleryImages: city.galleryImages || [],
          coordinates: city.coordinates || {},
          timezone: city.timezone,
          averageBudgetPerDay: city.averageBudgetPerDay,
          luxuryBudgetPerDay: city.luxuryBudgetPerDay,
          recommendedTripDays: city.recommendedTripDays,
          climate: city.climate,
          bestSeason: city.bestSeason,
          tags: city.tags || [],
          popularityScore: city.popularityScore,
          famousFor: city.famousFor || [],
          transportationOptions: city.transportationOptions || [],
          safetyScore: city.safetyScore
        }
      });
    }

    // Insert Places
    const places = famousPlacesFile.famousPlaces || [];
    for (const place of places) {
      await prisma.place.create({
        data: {
          id: place.id,
          name: place.name,
          city: place.city,
          country: place.country,
          description: place.description,
          category: place.category,
          images: place.images || [],
          estimatedCost: place.estimatedCost,
          durationHours: place.durationHours,
          rating: place.rating,
          bestTimeToVisit: place.bestTimeToVisit,
          openingHours: place.openingHours,
          coordinates: place.coordinates || {},
          tips: place.tips || []
        }
      });
    }

    // Insert Activities
    const activities = activitiesFile.activities || [];
    for (const activity of activities) {
      await prisma.activity.create({
        data: {
          id: activity.id,
          title: activity.title,
          city: activity.city,
          country: activity.country,
          category: activity.category,
          durationHours: activity.durationHours,
          estimatedPrice: activity.estimatedPrice,
          images: activity.images || [],
          description: activity.description,
          rating: activity.rating,
          suitableFor: activity.suitableFor || [],
          difficultyLevel: activity.difficultyLevel
        }
      });
    }

    console.log('Data Imported successfully into PostgreSQL!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

importData();
