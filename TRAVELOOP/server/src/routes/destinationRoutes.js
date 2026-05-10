const express = require('express');
const router = express.Router();
const { getAllCities, getCityDetails } = require('../controllers/destinationController');

router.get('/cities', getAllCities);
router.get('/cities/:cityName', getCityDetails);

module.exports = router;
