import { create } from 'zustand';
import { MOCK_TRIPS, MOCK_DESTINATIONS, MOCK_BUDGET_EXPENSES, MOCK_PACKING_LIST, MOCK_NOTES } from './mockData';

export type Activity = {
  id: string;
  time: string;
  title: string;
  type: string;
};

export type DayPlan = {
  day: number;
  date: string;
  activities: Activity[];
};

export type Trip = {
  id: string;
  destination: any;
  startDate: string;
  endDate: string;
  status: string;
  budget: number;
  travelers: number;
  itinerary: DayPlan[];
};

export type PackingItem = {
  id: string;
  category: string;
  name: string;
  packed: boolean;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  date: string;
};

interface TravelStore {
  destinations: any[];
  trips: Trip[];
  activeTripId: string | null;
  budgetExpenses: any[];
  packingList: PackingItem[];
  notes: Note[];
  
  // Actions
  setActiveTrip: (id: string) => void;
  addTrip: (trip: Trip) => void;
  updateItineraryDay: (tripId: string, dayIndex: number, newActivities: Activity[]) => void;
  togglePackingItem: (id: string) => void;
  addExpense: (expense: any) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  destinations: MOCK_DESTINATIONS,
  trips: MOCK_TRIPS,
  activeTripId: MOCK_TRIPS[0].id,
  budgetExpenses: MOCK_BUDGET_EXPENSES,
  packingList: MOCK_PACKING_LIST,
  notes: MOCK_NOTES,

  setActiveTrip: (id) => set({ activeTripId: id }),
  
  addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
  
  updateItineraryDay: (tripId, dayIndex, newActivities) => set((state) => ({
    trips: state.trips.map(trip => {
      if (trip.id === tripId) {
        const newItinerary = [...trip.itinerary];
        newItinerary[dayIndex] = { ...newItinerary[dayIndex], activities: newActivities };
        return { ...trip, itinerary: newItinerary };
      }
      return trip;
    })
  })),

  togglePackingItem: (id) => set((state) => ({
    packingList: state.packingList.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    )
  })),

  addExpense: (expense) => set((state) => ({
    budgetExpenses: [...state.budgetExpenses, expense]
  })),

  addNote: (note) => set((state) => ({
    notes: [...state.notes, note]
  })),

  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  }))
}));
