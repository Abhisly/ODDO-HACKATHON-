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
    const city = await prisma.city.findUnique({
      where: { cityName: req.params.cityName },
      include: {
        places: true,
        activities: true
      }
    });
    
    if (!city) return res.status(404).json({ message: 'City not found' });

    res.status(200).json({
      city,
      famousPlaces: city.places,
      activities: city.activities
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
