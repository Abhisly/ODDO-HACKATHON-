const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const tripRoutes = require('./routes/tripRoutes');
const destinationRoutes = require('./routes/destinationRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Traveloop Offline Dataset API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
