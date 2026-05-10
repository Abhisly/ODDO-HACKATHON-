const express = require('express');
const router = express.Router();
const { createTrip, getTrips, getTripById, addChecklistItem } = require('../controllers/tripController');

router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/:id/checklist', addChecklistItem);

module.exports = router;
