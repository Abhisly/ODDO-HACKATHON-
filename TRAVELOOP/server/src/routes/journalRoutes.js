const express = require('express');
const {
  getTripJournals,
  createJournal,
  deleteJournal
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/trip/:tripId', getTripJournals);
router.post('/', createJournal);
router.delete('/:id', deleteJournal);

module.exports = router;
