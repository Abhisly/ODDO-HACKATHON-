export const MOCK_DESTINATIONS = [
  {
    id: 'dest-1',
    name: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
    category: 'Cultural',
    region: 'Asia',
    priceLevel: '$$$',
    description: 'Ancient temples, traditional tea houses, and sublime gardens.',
    weather: { temp: 22, condition: 'Clear', icon: 'Sun' }
  },
  {
    id: 'dest-2',
    name: 'Amalfi Coast, Italy',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop',
    category: 'Coastal Luxury',
    region: 'Europe',
    priceLevel: '$$$$',
    description: 'Dramatic cliffs, pastel villages, and the deep blue Mediterranean.',
    weather: { temp: 26, condition: 'Sunny', icon: 'Sun' }
  },
  {
    id: 'dest-3',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2000&auto=format&fit=crop',
    category: 'Romantic',
    region: 'Europe',
    priceLevel: '$$$',
    description: 'Whitewashed cubiform houses clinging to cliffs above an underwater caldera.',
    weather: { temp: 28, condition: 'Clear', icon: 'Sun' }
  },
  {
    id: 'dest-4',
    name: 'Swiss Alps, Switzerland',
    image: 'https://images.unsplash.com/photo-1531366936337-7785a649c258?q=80&w=2000&auto=format&fit=crop',
    category: 'Nature & Adventure',
    region: 'Europe',
    priceLevel: '$$$$',
    description: 'Majestic peaks, luxury ski resorts, and pristine alpine lakes.',
    weather: { temp: -2, condition: 'Snow', icon: 'Snowflake' }
  },
  {
    id: 'dest-5',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2000&auto=format&fit=crop',
    category: 'Coastal Luxury',
    region: 'Asia',
    priceLevel: '$$$$',
    description: 'Private overwater bungalows surrounded by crystal clear turquoise waters.',
    weather: { temp: 31, condition: 'Sunny', icon: 'Sun' }
  },
  {
    id: 'dest-6',
    name: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2000&auto=format&fit=crop',
    category: 'Cultural',
    region: 'Africa',
    priceLevel: '$$',
    description: 'Bustling souks, intricate riads, and vibrant desert culture.',
    weather: { temp: 35, condition: 'Hot', icon: 'Sun' }
  },
  {
    id: 'dest-7',
    name: 'Patagonia, Chile',
    image: 'https://images.unsplash.com/photo-1518182170546-076616fd4aa6?q=80&w=2000&auto=format&fit=crop',
    category: 'Nature & Adventure',
    region: 'South America',
    priceLevel: '$$$',
    description: 'Dramatic glaciers, towering granite peaks, and untamed wilderness.',
    weather: { temp: 12, condition: 'Cloudy', icon: 'Cloud' }
  },
  {
    id: 'dest-8',
    name: 'New York City, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2000&auto=format&fit=crop',
    category: 'Urban',
    region: 'North America',
    priceLevel: '$$$$',
    description: 'The city that never sleeps. World-class dining, Broadway, and iconic skylines.',
    weather: { temp: 18, condition: 'Rain', icon: 'CloudRain' }
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
  },
  {
    id: 'trip-3',
    destination: MOCK_DESTINATIONS[3],
    startDate: '2044-01-15',
    endDate: '2044-01-22',
    status: 'Completed',
    budget: 9500,
    travelers: 4,
    itinerary: []
  }
];

export const MOCK_ACTIVITY_FEED = [
  { id: 'af-1', type: 'booking', text: 'Tawaraya Ryokan confirmed for Day 1.', time: '2 hours ago', icon: 'Bed' },
  { id: 'af-2', type: 'alert', text: 'Flight prices to Naples dropped by 15%.', time: '5 hours ago', icon: 'Plane' },
  { id: 'af-3', type: 'ai', text: 'AI updated your Kyoto itinerary to avoid rain.', time: '1 day ago', icon: 'Sparkles' },
  { id: 'af-4', type: 'budget', text: 'You are 5% under budget for the upcoming trip.', time: '2 days ago', icon: 'Wallet' },
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
