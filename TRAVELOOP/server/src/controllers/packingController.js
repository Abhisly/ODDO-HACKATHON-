const prisma = require('../config/prisma');

// @desc    Get packing list for a trip
// @route   GET /api/packing/trip/:tripId
// @access  Private
exports.getPackingList = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({ where: { id: req.params.tripId } });
    if (!trip || trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const checklist = await prisma.packingChecklist.findMany({
      where: { tripId: req.params.tripId }
    });

    res.status(200).json({
      success: true,
      data: checklist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add item to packing list
// @route   POST /api/packing
// @access  Private
exports.addItem = async (req, res) => {
  try {
    const { tripId, itemName, category } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const item = await prisma.packingChecklist.create({
      data: { tripId, itemName, category }
    });

    res.status(201).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Toggle item packed status
// @route   PUT /api/packing/:id/toggle
// @access  Private
exports.toggleItem = async (req, res) => {
  try {
    const item = await prisma.packingChecklist.findUnique({
      where: { id: req.params.id },
      include: { trip: true }
    });

    if (!item || item.trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const updatedItem = await prisma.packingChecklist.update({
      where: { id: req.params.id },
      data: { isPacked: !item.isPacked }
    });

    res.status(200).json({
      success: true,
      data: updatedItem
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/packing/:id
// @access  Private
exports.deleteItem = async (req, res) => {
  try {
    const item = await prisma.packingChecklist.findUnique({
      where: { id: req.params.id },
      include: { trip: true }
    });

    if (!item || item.trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await prisma.packingChecklist.delete({ where: { id: req.params.id } });

    res.status(200).json({
      success: true,
      message: 'Item removed'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
