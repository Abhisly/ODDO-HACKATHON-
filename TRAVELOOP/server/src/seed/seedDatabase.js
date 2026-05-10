const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const dotenv = require('dotenv');

const citiesData = require('../datasets/cities.json');
const placesData = require('../datasets/places.json');
const activitiesData = require('../datasets/activities.json');

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
    for (const city of citiesData) {
      await prisma.city.create({
        data: city
      });
    }

    // Insert Places
    for (const place of placesData) {
      await prisma.place.create({
        data: place
      });
    }

    // Insert Activities
    for (const activity of activitiesData) {
      await prisma.activity.create({
        data: activity
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
