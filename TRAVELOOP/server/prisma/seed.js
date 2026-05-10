const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clear existing data (optional but helpful for a clean start)
  await prisma.journal.deleteMany({});
  await prisma.packingChecklist.deleteMany({});
  await prisma.budget.deleteMany({});
  await prisma.activity.deleteMany({});
  await prisma.famousPlace.deleteMany({});
  await prisma.trip.deleteMany({});
  await prisma.destination.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create Demo Accounts
  const userPassword = await bcrypt.hash('PASS@123', 10);
  const adminPassword = await bcrypt.hash('ADMIN@123', 10);

  const demoUser = await prisma.user.create({
    data: {
      fullName: 'Demo User',
      username: 'demouser',
      email: 'user@123',
      password: userPassword,
      role: 'user',
      bio: 'I love traveling and exploring new cultures.',
      travelPreferences: { categories: ['Adventure', 'Nature'], budget: 'Medium' }
    }
  });

  const demoAdmin = await prisma.user.create({
    data: {
      fullName: 'System Admin',
      username: 'admin',
      email: 'admin@123',
      password: adminPassword,
      role: 'admin',
      bio: 'Administrator for Traveloop platform.'
    }
  });

  console.log('Demo accounts created.');

  // 3. Seed Destinations
  const destinationsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../src/datasets/destinations.json'), 'utf-8')
  );

  for (const dest of destinationsData) {
    await prisma.destination.create({
      data: dest
    });
  }

  console.log('Destinations seeded.');

  // 4. Seed Famous Places
  const famousPlacesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../src/datasets/famousPlaces.json'), 'utf-8')
  );

  for (const place of famousPlacesData) {
    const destination = await prisma.destination.findUnique({
      where: { city: place.city }
    });

    if (destination) {
      const { city, ...placeDetails } = place;
      await prisma.famousPlace.create({
        data: {
          ...placeDetails,
          destinationId: destination.id
        }
      });
    }
  }

  console.log('Famous places seeded.');

  // 5. Seed Activities
  const activitiesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../src/datasets/activities.json'), 'utf-8')
  );

  for (const activity of activitiesData) {
    const destination = await prisma.destination.findUnique({
      where: { city: activity.city }
    });

    if (destination) {
      const { city, ...activityDetails } = activity;
      await prisma.activity.create({
        data: {
          ...activityDetails,
          destinationId: destination.id
        }
      });
    }
  }

  console.log('Activities seeded.');

  // 6. Create a Sample Trip for Demo User
  const tokyo = await prisma.destination.findUnique({ where: { city: 'Tokyo' } });
  
  const sampleTrip = await prisma.trip.create({
    data: {
      title: 'Summer in Tokyo',
      description: 'A deep dive into Japanese culture and food.',
      ownerId: demoUser.id,
      startDate: new Date('2026-07-01'),
      endDate: new Date('2026-07-07'),
      travelersCount: 2,
      estimatedBudget: 1500,
      visibility: 'private',
      budget: {
        create: {
          accommodationCost: 500,
          transportCost: 200,
          foodCost: 400,
          activityCost: 300,
          miscellaneousCost: 100,
          totalCost: 1500
        }
      },
      packingList: {
        createMany: {
          data: [
            { itemName: 'Passport', category: 'Essentials' },
            { itemName: 'Universal Adapter', category: 'Tech' },
            { itemName: 'Comfortable Shoes', category: 'Clothing' }
          ]
        }
      }
    }
  });

  console.log('Sample trip created.');

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
