const express = require('express');
const {
  getActivities,
  getActivity
} = require('../controllers/activityController');

const router = express.Router();

router.get('/', getActivities);
router.get('/:id', getActivity);

module.exports = router;
