const prisma = require('../config/prisma');

// @desc    Get all journals for a trip
// @route   GET /api/journals/trip/:tripId
// @access  Private
exports.getTripJournals = async (req, res) => {
  try {
    const journals = await prisma.journal.findMany({
      where: { tripId: req.params.tripId, userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({
      success: true,
      count: journals.length,
      data: journals
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create journal entry
// @route   POST /api/journals
// @access  Private
exports.createJournal = async (req, res) => {
  try {
    const { tripId, title, content, images } = req.body;

    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip || trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const journal = await prisma.journal.create({
      data: {
        tripId,
        userId: req.user.id,
        title,
        content,
        images: images || []
      }
    });

    res.status(201).json({
      success: true,
      data: journal
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journals/:id
// @access  Private
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await prisma.journal.findUnique({ where: { id: req.params.id } });

    if (!journal || journal.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await prisma.journal.delete({ where: { id: req.params.id } });

    res.status(200).json({
      success: true,
      message: 'Journal entry deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
