import { create } from 'zustand';
import { tripApi, destinationApi, authApi } from './api';
import { MOCK_DESTINATIONS, MOCK_TRIPS, MOCK_PACKING_LIST, MOCK_BUDGET_EXPENSES, MOCK_NOTES } from './mockData';

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
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  status: string;
  estimatedBudget: number;
  travelersCount: number;
  destination?: any;
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
  user: any | null;
  currency: string;
  maxBudget: number;
  loading: boolean;
  
  // Actions
  setUser: (user: any | null) => void;
  setCurrency: (currency: string) => void;
  setMaxBudget: (budget: number) => void;
  setActiveTrip: (id: string | null) => void;
  fetchTrips: () => Promise<void>;
  fetchDestinations: () => Promise<void>;
  addTrip: (trip: any) => Promise<void>;
  deleteTrip: (id: string) => Promise<void>;
  updateTrip: (id: string, data: any) => Promise<void>;
  
  setDestinations: (destinations: any[]) => void;
  
  // Packing & Notes
  togglePackingItem: (id: string) => void;
  addPackingItem: (item: PackingItem) => void;
  deletePackingItem: (id: string) => void;
  addExpense: (expense: any) => void;
  deleteExpense: (id: string) => void;
  addNote: (note: Note) => void;
  deleteNote: (id: string) => void;
}

export const useTravelStore = create<TravelStore>((set, get) => ({
  destinations: MOCK_DESTINATIONS, // Initialize with mock data for robust demo
  trips: [],
  activeTripId: null,
  budgetExpenses: MOCK_BUDGET_EXPENSES,
  packingList: MOCK_PACKING_LIST,
  notes: MOCK_NOTES,
  user: null,
  currency: 'USD',
  maxBudget: 5000,
  loading: false,

  setUser: (user) => set({ user }),
  setCurrency: (currency) => set({ currency }),
  setMaxBudget: (maxBudget) => set({ maxBudget }),
  setActiveTrip: (id) => set({ activeTripId: id }),
  setDestinations: (destinations) => set({ destinations }),

  fetchDestinations: async () => {
    try {
      const res = await destinationApi.getAllDestinations();
      if (res.data && res.data.length > 0) {
        set({ destinations: res.data });
      }
    } catch (err) {
      console.warn('Using cached destination intelligence.');
    }
  },

  fetchTrips: async () => {
    set({ loading: true });
    try {
      const res = await tripApi.getTrips();
      set({ trips: res.data });
    } catch (err) {
      console.warn('Using local trip portfolio.');
      // Keep empty or use MOCK_TRIPS if absolutely necessary, 
      // but trips are user-specific so empty is safer unless demo account is used.
    } finally {
      set({ loading: false });
    }
  },

  addTrip: async (tripData) => {
    try {
      const res = await tripApi.createTrip(tripData);
      set((state) => ({ trips: [res.data, ...state.trips] }));
    } catch (err) {
      console.error('Failed to add trip:', err);
      // For demo, we still want it to appear in UI
      const mockTrip = { ...tripData, id: Math.random().toString(36).substr(2, 9), status: 'Planning' };
      set((state) => ({ trips: [mockTrip, ...state.trips] }));
    }
  },

  deleteTrip: async (id) => {
    try {
      await tripApi.deleteTrip(id);
      set((state) => ({ trips: state.trips.filter(t => t.id !== id) }));
    } catch (err) {
      set((state) => ({ trips: state.trips.filter(t => t.id !== id) }));
    }
  },

  updateTrip: async (id, data) => {
    try {
      const res = await tripApi.updateTrip(id, data);
      set((state) => ({
        trips: state.trips.map(t => t.id === id ? res.data : t)
      }));
    } catch (err) {
      set((state) => ({
        trips: state.trips.map(t => t.id === id ? { ...t, ...data } : t)
      }));
    }
  },

  togglePackingItem: (id) => set((state) => ({
    packingList: state.packingList.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    )
  })),

  addPackingItem: (item) => set((state) => ({
    packingList: [...state.packingList, item]
  })),

  deletePackingItem: (id) => set((state) => ({
    packingList: state.packingList.filter(item => item.id !== id)
  })),

  addExpense: (expense) => set((state) => ({
    budgetExpenses: [...state.budgetExpenses, expense]
  })),

  deleteExpense: (id) => set((state) => ({
    budgetExpenses: state.budgetExpenses.filter(expense => expense.id !== id)
  })),

  addNote: (note) => set((state) => ({
    notes: [...state.notes, note]
  })),

  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id)
  }))
}));
