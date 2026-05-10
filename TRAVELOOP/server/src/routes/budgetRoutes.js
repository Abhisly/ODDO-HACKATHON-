const express = require('express');
const {
  getTripBudget,
  updateBudget
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/trip/:tripId', getTripBudget);
router.put('/:id', updateBudget);

module.exports = router;
