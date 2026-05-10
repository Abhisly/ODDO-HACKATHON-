import { Request, Response } from 'express';
import { prisma } from '../utils/db';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { amount, category, description } = req.body;
    const { tripId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Verify trip belongs to user
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
    });

    if (!trip || trip.userId !== req.user.id) {
      return res.status(404).json({ message: 'Trip not found or unauthorized' });
    }

    const expense = await prisma.expense.create({
      data: {
        amount: parseFloat(amount),
        category,
        description,
        tripId,
      },
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getBudgetSummary = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { expenses: true },
    });

    if (!trip || trip.userId !== req.user.id) {
      return res.status(404).json({ message: 'Trip not found or unauthorized' });
    }

    const totalExpenses = trip.expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const remainingBudget = trip.budgetLimit - totalExpenses;

    res.json({
      tripId: trip.id,
      budgetLimit: trip.budgetLimit,
      totalExpenses,
      remainingBudget,
      expenses: trip.expenses,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
