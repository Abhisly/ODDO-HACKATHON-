const { prisma } = require('../config/db');

class BudgetSystem {
  static async calculate(destinations) {
    let budgetSummary = {
      totalEstimated: 0,
      accommodation: 0,
      food: 0,
      transport: 0,
      activities: 0
    };

    for (const dest of destinations) {
      const cityData = await prisma.city.findUnique({ where: { cityName: dest.city } });
      
      if (cityData) {
        const days = dest.duration;
        const accommodation = (cityData.averageHotelCost || 100) * days;
        const food = (cityData.averageMealCost || 30) * 3 * days;
        const transport = (cityData.transportCost || 10) * days;
        // Mock activities cost
        const activities = 50 * days;

        budgetSummary.accommodation += accommodation;
        budgetSummary.food += food;
        budgetSummary.transport += transport;
        budgetSummary.activities += activities;
      }
    }

    budgetSummary.totalEstimated = 
      budgetSummary.accommodation + 
      budgetSummary.food + 
      budgetSummary.transport + 
      budgetSummary.activities;

    return budgetSummary;
  }
}

module.exports = BudgetSystem;
