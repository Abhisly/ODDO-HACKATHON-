import { Request, Response } from 'express';
import { prisma } from '../utils/db';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const createTrip = async (req: AuthRequest, res: Response) => {
  try {
    const { title, destination, startDate, endDate, budgetLimit } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        destination,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budgetLimit: parseFloat(budgetLimit),
        userId: req.user.id,
      },
    });

    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getTrips = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const trips = await prisma.trip.findMany({
      where: { userId: req.user.id },
      include: { expenses: true },
    });

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
