import { City, Country } from 'country-state-city';
import { getDistance } from 'geolib';

export type LocationOption = {
  value: string;
  label: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};

// We will fetch major cities (or all cities) and format them for react-select
export const getGlobalCities = (): LocationOption[] => {
  // country-state-city has ~150,000 cities. That might be too heavy for a simple dropdown if not optimized.
  // We'll map them lazily or provide a subset if needed, but react-select can handle a lot if we use react-select-async-paginate,
  // or we can just filter top cities. For this prototype, let's load a large subset.
  // To prevent memory crash on the frontend, let's just get cities from top tourist countries or limit the array size.
  
  const allCities = City.getAllCities();
  
  return allCities.map(city => ({
    value: `${city.name}-${city.countryCode}`,
    label: `${city.name}, ${city.countryCode}`,
    countryCode: city.countryCode,
    latitude: city.latitude || '0',
    longitude: city.longitude || '0'
  }));
};

export const searchCities = (query: string): LocationOption[] => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const allCities = City.getAllCities();
  
  // Filter and take top 50 to avoid massive rendering lags in react-select
  const filtered = allCities
    .filter(city => city.name.toLowerCase().includes(lowerQuery))
    .slice(0, 50);

  return filtered.map(city => ({
    value: `${city.name}-${city.countryCode}-${city.stateCode}`,
    label: `${city.name}, ${city.stateCode ? city.stateCode + ', ' : ''}${city.countryCode}`,
    countryCode: city.countryCode,
    latitude: city.latitude || '0',
    longitude: city.longitude || '0'
  }));
};

export const calculateDistanceKm = (originLat: string, originLng: string, destLat: string, destLng: string): number => {
  const origin = { latitude: parseFloat(originLat), longitude: parseFloat(originLng) };
  const dest = { latitude: parseFloat(destLat), longitude: parseFloat(destLng) };
  
  if (isNaN(origin.latitude) || isNaN(dest.latitude)) return 0;

  const distanceMeters = getDistance(origin, dest);
  return Math.round(distanceMeters / 1000); // Convert to KM
};

// Transport speeds in km/h
const TRANSPORT_SPEEDS = {
  Flight: 850,
  Train: 120,
  Car: 80
};

export const calculateDurationHours = (distanceKm: number, transport: 'Flight' | 'Train' | 'Car'): string => {
  if (distanceKm === 0) return '0h';
  
  const speed = TRANSPORT_SPEEDS[transport];
  const hours = distanceKm / speed;
  
  // Add base overhead (airport security, boarding, etc.)
  const overhead = transport === 'Flight' ? 3 : transport === 'Train' ? 1 : 0.5;
  const totalHours = hours + overhead;
  
  const h = Math.floor(totalHours);
  const m = Math.round((totalHours - h) * 60);
  
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
};

export const generateMockConnectingStations = (distanceKm: number, transport: string): string[] => {
  if (transport === 'Flight') {
    if (distanceKm > 8000) return ['Dubai (DXB)', 'Doha (DOH)'];
    if (distanceKm > 4000) return ['London (LHR)'];
    return ['Direct Flight'];
  }
  
  if (transport === 'Train') {
    if (distanceKm > 1000) return ['Paris Gare du Nord', 'Frankfurt Hbf'];
    if (distanceKm > 500) return ['Regional Hub Station'];
    return ['Direct Train'];
  }
  
  return []; // Car
};
