const { prisma } = require('../config/db');
const ItineraryEngine = require('../services/ItineraryEngine');
const BudgetSystem = require('../services/BudgetSystem');

exports.createTrip = async (req, res) => {
  try {
    const { tripName, destinations, travelersCount } = req.body;

    const { itinerary, totalDuration } = await ItineraryEngine.generate(destinations);
    const budgetSummary = await BudgetSystem.calculate(destinations);

    const newTrip = await prisma.trip.create({
      data: {
        tripName,
        totalDuration,
        travelersCount: travelersCount || 1,
        userId: req.user ? req.user.id : 'mock-user-123',
        destinations: {
          create: destinations.map(d => ({ city: d.city, duration: d.duration }))
        },
        budgetSummary: {
          create: budgetSummary
        },
        itinerary: {
          create: itinerary.map(day => ({
            day: day.day,
            city: day.city,
            places: { create: day.places },
            activities: { create: day.activities }
          }))
        }
      },
      include: {
        destinations: true,
        budgetSummary: true,
        itinerary: {
          include: {
            places: { include: { place: true } },
            activities: { include: { activity: true } }
          }
        }
      }
    });

    res.status(201).json(newTrip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user ? req.user.id : 'mock-user-123' },
      include: { destinations: true, budgetSummary: true }
    });
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await prisma.trip.findUnique({
      where: { id: req.params.id },
      include: {
        destinations: true,
        budgetSummary: true,
        packingChecklist: true,
        itinerary: {
          include: {
            places: { include: { place: true } },
            activities: { include: { activity: true } }
          }
        }
      }
    });
      
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addChecklistItem = async (req, res) => {
  try {
    const item = await prisma.checklistItem.create({
      data: {
        tripId: req.params.id,
        item: req.body.item,
        packed: false
      }
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
