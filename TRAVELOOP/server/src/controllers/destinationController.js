const City = require('../models/City');
const Place = require('../models/Place');
const Activity = require('../models/Activity');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find({});
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCityDetails = async (req, res) => {
  try {
    const city = await City.findOne({ cityName: req.params.cityName });
    if (!city) return res.status(404).json({ message: 'City not found' });

    const places = await Place.find({ city: city.cityName });
    const activities = await Activity.find({ city: city.cityName });

    res.status(200).json({
      city,
      famousPlaces: places,
      activities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
