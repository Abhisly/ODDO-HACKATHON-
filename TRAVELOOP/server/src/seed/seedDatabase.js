const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

const City = require('../models/City');
const Place = require('../models/Place');
const Activity = require('../models/Activity');

const citiesData = require('../datasets/cities.json');
const placesData = require('../datasets/places.json');
const activitiesData = require('../datasets/activities.json');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await City.deleteMany();
    await Place.deleteMany();
    await Activity.deleteMany();

    await City.insertMany(citiesData);
    await Place.insertMany(placesData);
    await Activity.insertMany(activitiesData);

    console.log('Data Imported successfully into MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

importData();
