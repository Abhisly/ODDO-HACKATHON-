require('dotenv').config();
const app = require('./src/app');
const prisma = require('./src/config/prisma');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log('Connected to PostgreSQL database');

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
    // If database is not available, still start the server in dev mode so the developer can see the errors
    if (process.env.NODE_ENV === 'development') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (Database disconnected)`);
      });
    } else {
      process.exit(1);
    }
  }
}

startServer();
