const { prisma } = require('../config/db');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await prisma.city.findMany();
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCityDetails = async (req, res) => {
  try {
    const cityData = await prisma.city.findUnique({
      where: { city: req.params.cityName },
      include: {
        places: true,
        activities: true
      }
    });
    
    if (!cityData) return res.status(404).json({ message: 'City not found' });

    res.status(200).json({
      city: cityData,
      famousPlaces: cityData.places,
      activities: cityData.activities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
