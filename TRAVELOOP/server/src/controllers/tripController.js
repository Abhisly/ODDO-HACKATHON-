const prisma = require('../config/prisma');

// @desc    Get all trips for logged in user
// @route   GET /api/trips
// @access  Private
exports.getMyTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { ownerId: req.user.id },
      include: {
        budget: true,
        _count: {
          select: { packingList: true, journals: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      count: trips.length,
      data: trips
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single trip details
// @route   GET /api/trips/:id
// @access  Private
exports.getTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: req.params.id },
      include: {
        budget: true,
        packingList: true,
        journals: true
      }
    });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    // Check ownership
    if (trip.ownerId !== req.user.id && trip.visibility !== 'public') {
      return res.status(403).json({ success: false, message: 'Not authorized to view this trip' });
    }

    res.status(200).json({
      success: true,
      data: trip
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new trip
// @route   POST /api/trips
// @access  Private
exports.createTrip = async (req, res) => {
  try {
    const { 
      title, 
      description, 
      startDate, 
      endDate, 
      travelersCount, 
      estimatedBudget,
      visibility 
    } = req.body;

    const trip = await prisma.trip.create({
      data: {
        title,
        description,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        travelersCount: parseInt(travelersCount) || 1,
        estimatedBudget: parseFloat(estimatedBudget) || 0,
        visibility: visibility || 'private',
        ownerId: req.user.id,
        budget: {
          create: {
            totalCost: parseFloat(estimatedBudget) || 0
          }
        }
      },
      include: {
        budget: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update trip
// @route   PUT /api/trips/:id
// @access  Private
exports.updateTrip = async (req, res) => {
  try {
    let trip = await prisma.trip.findUnique({ where: { id: req.params.id } });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this trip' });
    }

    const updatedTrip = await prisma.trip.update({
      where: { id: req.params.id },
      data: req.body
    });

    res.status(200).json({
      success: true,
      message: 'Trip updated',
      data: updatedTrip
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete trip
// @route   DELETE /api/trips/:id
// @access  Private
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({ where: { id: req.params.id } });

    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }

    if (trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this trip' });
    }

    await prisma.trip.delete({ where: { id: req.params.id } });

    res.status(200).json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
