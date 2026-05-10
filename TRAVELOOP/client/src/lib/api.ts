const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};

export const destinationApi = {
  getAllCities: () => apiFetch('/destinations/cities'),
  getCityDetails: (cityName: string) => apiFetch(`/destinations/cities/${cityName}`),
};

export const tripApi = {
  createTrip: (tripData: any) => apiFetch('/trips', {
    method: 'POST',
    body: JSON.stringify(tripData),
  }),
  getTrips: () => apiFetch('/trips'),
  getTripById: (id: string) => apiFetch(`/trips/${id}`),
};
