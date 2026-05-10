const prisma = require('../config/prisma');

// @desc    Get budget for a trip
// @route   GET /api/budgets/trip/:tripId
// @access  Private
exports.getTripBudget = async (req, res) => {
  try {
    const budget = await prisma.budget.findUnique({
      where: { tripId: req.params.tripId },
      include: {
        trip: true
      }
    });

    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found for this trip' });
    }

    if (budget.trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    res.status(200).json({
      success: true,
      data: budget
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
exports.updateBudget = async (req, res) => {
  try {
    const { accommodationCost, transportCost, foodCost, activityCost, miscellaneousCost } = req.body;

    const budget = await prisma.budget.findUnique({
      where: { id: req.params.id },
      include: { trip: true }
    });

    if (!budget) {
      return res.status(404).json({ success: false, message: 'Budget not found' });
    }

    if (budget.trip.ownerId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    const totalCost = (accommodationCost || budget.accommodationCost) +
                      (transportCost || budget.transportCost) +
                      (foodCost || budget.foodCost) +
                      (activityCost || budget.activityCost) +
                      (miscellaneousCost || budget.miscellaneousCost);

    const updatedBudget = await prisma.budget.update({
      where: { id: req.params.id },
      data: {
        accommodationCost,
        transportCost,
        foodCost,
        activityCost,
        miscellaneousCost,
        totalCost
      }
    });

    res.status(200).json({
      success: true,
      data: updatedBudget
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
