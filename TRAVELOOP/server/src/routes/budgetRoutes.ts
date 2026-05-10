import express from 'express';
import { addExpense, getBudgetSummary } from '../controllers/budgetController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/:tripId/expenses', protect, addExpense);
router.get('/:tripId/summary', protect, getBudgetSummary);

export default router;
