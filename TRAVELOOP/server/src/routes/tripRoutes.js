const express = require('express');
const {
  getMyTrips,
  getTrip,
  createTrip,
  updateTrip,
  deleteTrip
} = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All trip routes are protected

router.route('/')
  .get(getMyTrips)
  .post(createTrip);

router.route('/:id')
  .get(getTrip)
  .put(updateTrip)
  .delete(deleteTrip);

module.exports = router;
