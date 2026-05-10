const express = require('express');
const {
  getPackingList,
  addItem,
  toggleItem,
  deleteItem
} = require('../controllers/packingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/trip/:tripId', getPackingList);
router.post('/', addItem);
router.put('/:id/toggle', toggleItem);
router.delete('/:id', deleteItem);

module.exports = router;
