export const MOCK_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
    category: 'Cultural',
    priceLevel: '$$$',
    description: 'Ancient temples, traditional tea houses, and sublime gardens.',
  },
  {
    id: 'dest-2',
    name: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop',
    category: 'Coastal Luxury',
    priceLevel: '$$$$',
    description: 'Dramatic cliffs, pastel villages, and the deep blue Mediterranean.',
  },
  {
    id: 'dest-3',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop',
    category: 'Romantic',
    priceLevel: '$$$',
    description: 'Whitewashed cubiform houses clinging to cliffs above an underwater caldera.',
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7785a649c258?q=80&w=2000&auto=format&fit=crop',
    category: 'Nature & Adventure',
    priceLevel: '$$$$',
    description: 'Majestic peaks, luxury ski resorts, and pristine alpine lakes.',
  }
];

export const MOCK_TRIPS = [
  {
    id: 'trip-1',
    destination: MOCK_DESTINATIONS[0],
    startDate: '2045-10-12',
    endDate: '2045-10-25',
    status: 'Upcoming',
    budget: 8500,
    travelers: 2,
    itinerary: [
      {
        day: 1,
        date: '2045-10-12',
        activities: [
          { id: 'act-1', time: '10:00 AM', title: 'Arrival at KIX', type: 'Flight' },
          { id: 'act-2', time: '02:00 PM', title: 'Check-in at Ryokan', type: 'Accommodation' },
          { id: 'act-3', time: '06:00 PM', title: 'Traditional Kaiseki Dinner', type: 'Dining' }
        ]
      },
      {
        day: 2,
        date: '2045-10-13',
        activities: [
          { id: 'act-4', time: '08:00 AM', title: 'Fushimi Inari Shrine', type: 'Sightseeing' },
          { id: 'act-5', time: '01:00 PM', title: 'Nishiki Market Tour', type: 'Experience' },
        ]
      }
    ]
  },
  {
    id: 'trip-2',
    destination: MOCK_DESTINATIONS[1],
    startDate: '2045-12-05',
    endDate: '2045-12-18',
    status: 'Planning',
    budget: 12000,
    travelers: 2,
    itinerary: []
  }
];

export const MOCK_BUDGET_EXPENSES = [
  { id: 'exp-1', category: 'Flights', amount: 2400, date: '2045-08-01' },
  { id: 'exp-2', category: 'Accommodation', amount: 3500, date: '2045-08-15' },
  { id: 'exp-3', category: 'Dining', amount: 1200, date: '2045-10-12' },
  { id: 'exp-4', category: 'Activities', amount: 800, date: '2045-10-13' },
];

export const MOCK_PACKING_LIST = [
  { id: 'pack-1', category: 'Clothing', name: 'Light Jackets (2)', packed: false },
  { id: 'pack-2', category: 'Clothing', name: 'Walking Shoes', packed: true },
  { id: 'pack-3', category: 'Electronics', name: 'Universal Adapter', packed: false },
  { id: 'pack-4', category: 'Documents', name: 'Passport & Visas', packed: true },
];

export const MOCK_NOTES = [
  { id: 'note-1', title: 'Kyoto Restaurant Ideas', content: 'Must try the matcha fondue at Jouvencelle and the tofu at Junsei.', date: '2045-09-01' },
  { id: 'note-2', title: 'Packing Reminder', content: 'Do not forget the JR Pass exchange orders!', date: '2045-09-15' }
];
