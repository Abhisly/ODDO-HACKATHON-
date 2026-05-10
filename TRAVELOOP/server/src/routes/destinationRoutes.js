const express = require('express');
const {
  getDestinations,
  getDestination,
  createDestination
} = require('../controllers/destinationController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getDestinations)
  .post(protect, authorize('admin'), createDestination);

router.route('/:id')
  .get(getDestination);

module.exports = router;
