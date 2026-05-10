const prisma = require('../config/prisma');

// @desc    Get all destinations
// @route   GET /api/destinations
// @access  Public
exports.getDestinations = async (req, res) => {
  try {
    const { city, tags, country } = req.query;
    
    let where = {};
    if (city) where.city = { contains: city, mode: 'insensitive' };
    if (country) where.country = { contains: country, mode: 'insensitive' };
    if (tags) where.tags = { hasSome: tags.split(',') };

    const destinations = await prisma.destination.findMany({
      where,
      include: {
        _count: {
          select: { famousPlaces: true, activities: true }
        }
      },
      orderBy: { popularityScore: 'desc' }
    });

    res.status(200).json({
      success: true,
      count: destinations.length,
      data: destinations
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single destination with places and activities
// @route   GET /api/destinations/:id
// @access  Public
exports.getDestination = async (req, res) => {
  try {
    const destination = await prisma.destination.findUnique({
      where: { id: req.params.id },
      include: {
        famousPlaces: true,
        activities: true
      }
    });

    if (!destination) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }

    res.status(200).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create destination (Admin only)
// @route   POST /api/destinations
// @access  Private/Admin
exports.createDestination = async (req, res) => {
  try {
    const destination = await prisma.destination.create({
      data: req.body
    });

    res.status(201).json({
      success: true,
      data: destination
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
