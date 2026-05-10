const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

export const authApi = {
  login: (credentials: any) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  register: (userData: any) => apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  getMe: () => apiFetch('/auth/me'),
  updateProfile: (data: any) => apiFetch('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export const destinationApi = {
  getAllDestinations: () => apiFetch('/destinations'),
  getDestinationById: (id: string) => apiFetch(`/destinations/${id}`),
};

export const tripApi = {
  createTrip: (tripData: any) => apiFetch('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  }),
  getTrips: () => apiFetch('/trips'),
  getTripById: (id: string) => apiFetch(`/trips/${id}`),
  updateTrip: (id: string, data: any) => apiFetch(`/trips/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  deleteTrip: (id: string) => apiFetch(`/trips/${id}`, {
    method: 'DELETE',
  }),
};

export const journalApi = {
  getTripJournals: (tripId: string) => apiFetch(`/journals/trip/${tripId}`),
  createJournal: (data: any) => apiFetch('/journals', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export const packingApi = {
  getPackingList: (tripId: string) => apiFetch(`/packing/trip/${tripId}`),
  addItem: (data: any) => apiFetch('/packing', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  toggleItem: (id: string) => apiFetch(`/packing/${id}/toggle`, {
    method: 'PUT',
  }),
};
