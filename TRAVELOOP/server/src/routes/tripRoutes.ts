import express from 'express';
import { createTrip, getTrips } from '../controllers/tripController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createTrip).get(protect, getTrips);

export default router;
