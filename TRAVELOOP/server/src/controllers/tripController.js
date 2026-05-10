const Trip = require('../models/Trip');
const ItineraryEngine = require('../services/ItineraryEngine');
const BudgetSystem = require('../services/BudgetSystem');

exports.createTrip = async (req, res) => {
  try {
    const { tripName, destinations, travelersCount } = req.body;

    const { itinerary, totalDuration } = await ItineraryEngine.generate(destinations);
    const budgetSummary = await BudgetSystem.calculate(destinations);

    const newTrip = new Trip({
      tripName,
      destinations,
      totalDuration,
      itinerary,
      budgetSummary,
      travelersCount,
      userId: req.user ? req.user.id : 'mock-user-123'
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user ? req.user.id : 'mock-user-123' });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('itinerary.places')
      .populate('itinerary.activities');
      
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addChecklistItem = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    trip.packingChecklist.push({ item: req.body.item, packed: false });
    await trip.save();
    res.status(200).json(trip.packingChecklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
