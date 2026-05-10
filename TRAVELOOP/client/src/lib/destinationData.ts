export type SightseeingSpot = {
  id: string;
  name: string;
  image: string;
  category: 'Landmark' | 'Nature' | 'Food' | 'Culture' | 'Hidden Gem';
  rating: number;
  durationHours: number;
  description: string;
  estimatedCost: number;
};

export type CityDestination = {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  image: string;
  heroImage: string;
  description: string;
  costPerDay: number;
  weather: { temp: number; condition: string; icon: string };
  spots: SightseeingSpot[];
};

export const DESTINATION_DATA: CityDestination[] = [
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    countryCode: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop',
    description: 'A dazzling metropolis where neon-lit skyscrapers meet ancient temples.',
    costPerDay: 180,
    weather: { temp: 22, condition: 'Partly Cloudy', icon: 'Cloud' },
    spots: [
      { id: 'shibuya', name: 'Shibuya Crossing', image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 2, description: 'The world\'s busiest pedestrian crossing.', estimatedCost: 0 },
      { id: 'tokyo-tower', name: 'Tokyo Tower', image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.7, durationHours: 3, description: 'Iconic red and white communications tower.', estimatedCost: 25 },
      { id: 'sensoji', name: 'Sensoji Temple', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 2, description: 'Tokyo\'s oldest Buddhist temple.', estimatedCost: 0 },
    ]
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    countryCode: '🇯🇵',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop',
    description: 'Japan\'s ancient capital — geishas, zen gardens and golden temples.',
    costPerDay: 150,
    weather: { temp: 20, condition: 'Clear', icon: 'Sun' },
    spots: [
      { id: 'fushimi', name: 'Fushimi Inari Shrine', image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.9, durationHours: 3, description: 'Thousands of vermillion torii gates.', estimatedCost: 0 },
      { id: 'arashiyama', name: 'Arashiyama Bamboo Forest', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 2, description: 'Towering grove of bamboo.', estimatedCost: 0 },
    ]
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    countryCode: '🇫🇷',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop',
    description: 'The City of Light — art, fashion, and romance.',
    costPerDay: 220,
    weather: { temp: 18, condition: 'Clear', icon: 'Sun' },
    spots: [
      { id: 'eiffel', name: 'Eiffel Tower', image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 3, description: 'The iron lattice icon of Paris.', estimatedCost: 28 },
      { id: 'louvre', name: 'Louvre Museum', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 5, description: 'The world\'s largest art museum.', estimatedCost: 22 },
    ]
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    countryCode: '🇬🇧',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop',
    description: 'A global city with Roman history and 21st-century skyscrapers.',
    costPerDay: 250,
    weather: { temp: 16, condition: 'Rainy', icon: 'CloudRain' },
    spots: [
      { id: 'big-ben', name: 'Big Ben & Parliament', image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 2, description: 'Iconic clock tower and seat of government.', estimatedCost: 0 },
      { id: 'london-eye', name: 'The London Eye', image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.6, durationHours: 2, description: 'Giant Ferris wheel on the South Bank.', estimatedCost: 35 },
    ]
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    countryCode: '🇮🇹',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=2000&auto=format&fit=crop',
    description: 'The Eternal City — history, ruins, and incredible pasta.',
    costPerDay: 190,
    weather: { temp: 26, condition: 'Sunny', icon: 'Sun' },
    spots: [
      { id: 'colosseum', name: 'The Colosseum', image: 'https://images.unsplash.com/photo-1552432552-06c09885834e?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.9, durationHours: 3, description: 'World\'s largest ancient amphitheatre.', estimatedCost: 16 },
      { id: 'trevi', name: 'Trevi Fountain', image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.7, durationHours: 1, description: 'Baroque masterpiece fountain.', estimatedCost: 0 },
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    countryCode: '🇮🇩',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2000&auto=format&fit=crop',
    description: 'Tropical paradise of rice fields and sea temples.',
    costPerDay: 90,
    weather: { temp: 30, condition: 'Tropical', icon: 'Sun' },
    spots: [
      { id: 'ubud', name: 'Ubud Monkey Forest', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.6, durationHours: 3, description: 'Sacred forest sanctuary.', estimatedCost: 5 },
      { id: 'tanah-lot', name: 'Tanah Lot', image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 3, description: 'Ancient sea temple.', estimatedCost: 8 },
    ]
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    countryCode: '🇺🇸',
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=2000&auto=format&fit=crop',
    description: 'The city that never sleeps — skyscrapers and Broadway.',
    costPerDay: 300,
    weather: { temp: 19, condition: 'Partly Cloudy', icon: 'Cloud' },
    spots: [
      { id: 'central-park', name: 'Central Park', image: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 4, description: '840-acre urban oasis.', estimatedCost: 0 },
      { id: 'times-square', name: 'Times Square', image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.5, durationHours: 2, description: 'Electric crossroads of the world.', estimatedCost: 0 },
    ]
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    countryCode: '🇦🇺',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=2000&auto=format&fit=crop',
    description: 'Harbor city with world-class beaches and the iconic Opera House.',
    costPerDay: 240,
    weather: { temp: 23, condition: 'Sunny', icon: 'Sun' },
    spots: [
      { id: 'opera-house', name: 'Sydney Opera House', image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.9, durationHours: 2, description: '20th-century architectural masterpiece.', estimatedCost: 40 },
      { id: 'bondi', name: 'Bondi Beach', image: 'https://images.unsplash.com/photo-1552562784-30d0577e3848?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.7, durationHours: 4, description: 'Famous surf beach and coastal walk.', estimatedCost: 0 },
    ]
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    countryCode: '🇦🇪',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2000&auto=format&fit=crop',
    description: 'Futuristic oasis with the world\'s tallest tower.',
    costPerDay: 350,
    weather: { temp: 35, condition: 'Hot', icon: 'Sun' },
    spots: [
      { id: 'burj-khalifa', name: 'Burj Khalifa', image: 'https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.9, durationHours: 3, description: 'World\'s tallest building.', estimatedCost: 45 },
      { id: 'dubai-mall', name: 'The Dubai Mall', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=800&auto=format&fit=crop', category: 'Food', rating: 4.6, durationHours: 4, description: 'Enormous shopping and entertainment hub.', estimatedCost: 0 },
    ]
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    countryCode: '🇳🇱',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=2000&auto=format&fit=crop',
    description: 'Canal city with artistic heritage and narrow houses.',
    costPerDay: 200,
    weather: { temp: 17, condition: 'Cloudy', icon: 'Cloud' },
    spots: [
      { id: 'rijksmuseum', name: 'Rijksmuseum', image: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.8, durationHours: 4, description: 'National museum of the Netherlands.', estimatedCost: 20 },
      { id: 'canal-cruise', name: 'Canal Cruise', image: 'https://images.unsplash.com/photo-1534386769164-94573887d187?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.7, durationHours: 1.5, description: 'Scenic boat tour through historic canals.', estimatedCost: 15 },
    ]
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    countryCode: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2000&auto=format&fit=crop',
    description: 'City of Gaudi, tapas, and city beaches.',
    costPerDay: 180,
    weather: { temp: 24, condition: 'Sunny', icon: 'Sun' },
    spots: [
      { id: 'sagrada', name: 'Sagrada Família', image: 'https://images.unsplash.com/photo-1564993305132-66d8a4b6183b?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 5.0, durationHours: 3, description: 'Gaudi\'s unfinished masterpiece.', estimatedCost: 26 },
      { id: 'park-guell', name: 'Park Güell', image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 2, description: 'Colorful mosaic park by Gaudi.', estimatedCost: 10 },
    ]
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    country: 'Thailand',
    countryCode: '🇹🇭',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=2000&auto=format&fit=crop',
    description: 'Street food capital with ornate temples.',
    costPerDay: 100,
    weather: { temp: 33, condition: 'Hot', icon: 'Sun' },
    spots: [
      { id: 'grand-palace', name: 'Grand Palace', image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 3, description: 'Spectacular royal residence.', estimatedCost: 15 },
      { id: 'wat-arun', name: 'Wat Arun', image: 'https://images.unsplash.com/photo-1563217415-32130e544903?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 2, description: 'The Temple of Dawn on the riverside.', estimatedCost: 5 },
    ]
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    countryCode: '🇹🇷',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2000&auto=format&fit=crop',
    description: 'Where East meets West across the Bosphorus.',
    costPerDay: 120,
    weather: { temp: 24, condition: 'Clear', icon: 'Sun' },
    spots: [
      { id: 'hagia-sophia', name: 'Hagia Sophia', image: 'https://images.unsplash.com/photo-1543967625-f096238b77a7?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 2, description: 'Ancient architectural marvel.', estimatedCost: 0 },
      { id: 'grand-bazaar', name: 'Grand Bazaar', image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.6, durationHours: 3, description: 'One of the largest covered markets.', estimatedCost: 0 },
    ]
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    countryCode: '🇧🇷',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2000&auto=format&fit=crop',
    description: 'Marvelous City of carnival, beaches, and Corcovado.',
    costPerDay: 140,
    weather: { temp: 28, condition: 'Humid', icon: 'Sun' },
    spots: [
      { id: 'christ-redeemer', name: 'Christ the Redeemer', image: 'https://images.unsplash.com/photo-1593995863951-57c27e518295?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.9, durationHours: 2, description: 'Iconic statue atop Corcovado mountain.', estimatedCost: 15 },
      { id: 'sugar-loaf', name: 'Sugarloaf Mountain', image: 'https://images.unsplash.com/photo-1542128962-9d50ad7bf714?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 3, description: 'Panoramic views via cable car.', estimatedCost: 20 },
    ]
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    countryCode: '🇿🇦',
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7f79b63?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1580619305218-8423a7f79b63?q=80&w=2000&auto=format&fit=crop',
    description: 'Stunning port city beneath Table Mountain.',
    costPerDay: 130,
    weather: { temp: 22, condition: 'Windy', icon: 'Cloud' },
    spots: [
      { id: 'table-mountain', name: 'Table Mountain', image: 'https://images.unsplash.com/photo-1549443204-c5a4d9528d2d?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 5.0, durationHours: 4, description: 'Flat-topped landmark mountain.', estimatedCost: 25 },
      { id: 'boulders', name: 'Boulders Beach', image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 2, description: 'African penguin colony sanctuary.', estimatedCost: 10 },
    ]
  },
  {
    id: 'seoul',
    name: 'Seoul',
    country: 'South Korea',
    countryCode: '🇰🇷',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2000&auto=format&fit=crop',
    description: 'Dynamic capital where tradition meets K-pop.',
    costPerDay: 170,
    weather: { temp: 21, condition: 'Clear', icon: 'Sun' },
    spots: [
      { id: 'gyeongbokgung', name: 'Gyeongbokgung Palace', image: 'https://images.unsplash.com/photo-1548115184-bc65ee212a3f?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 3, description: 'Main royal palace of the Joseon dynasty.', estimatedCost: 3 },
      { id: 'n-seoul-tower', name: 'N Seoul Tower', image: 'https://images.unsplash.com/photo-1533604130619-335835697693?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.7, durationHours: 2, description: 'Iconic tower with city views.', estimatedCost: 10 },
    ]
  },
  {
    id: 'mexico-city',
    name: 'Mexico City',
    country: 'Mexico',
    countryCode: '🇲🇽',
    image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=2000&auto=format&fit=crop',
    description: 'Historic metropolis built on an ancient lake.',
    costPerDay: 110,
    weather: { temp: 22, condition: 'Sunny', icon: 'Sun' },
    spots: [
      { id: 'teotihuacan', name: 'Teotihuacan', image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.9, durationHours: 5, description: 'Ancient Mesoamerican pyramids.', estimatedCost: 10 },
      { id: 'chapultepec', name: 'Chapultepec Park', image: 'https://images.unsplash.com/photo-1570535352824-28b9d62d665a?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.8, durationHours: 3, description: 'One of the largest urban parks.', estimatedCost: 0 },
    ]
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    countryCode: '🇦🇷',
    image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=2000&auto=format&fit=crop',
    description: 'Cosmopolitan capital known for tango and steak.',
    costPerDay: 130,
    weather: { temp: 19, condition: 'Clear', icon: 'Sun' },
    spots: [
      { id: 'la-boca', name: 'La Boca', image: 'https://images.unsplash.com/photo-1516246479707-16010049216d?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.5, durationHours: 2, description: 'Colorful neighborhood with tango.', estimatedCost: 0 },
      { id: 'recoleta', name: 'Recoleta Cemetery', image: 'https://images.unsplash.com/photo-1583072223961-07f9c2d1d0f5?q=80&w=800&auto=format&fit=crop', category: 'Culture', rating: 4.8, durationHours: 2, description: 'Historic resting place of elites.', estimatedCost: 15 },
    ]
  },
  {
    id: 'vancouver',
    name: 'Vancouver',
    country: 'Canada',
    countryCode: '🇨🇦',
    image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?q=80&w=2000&auto=format&fit=crop',
    description: 'Coastal city surrounded by mountains and sea.',
    costPerDay: 230,
    weather: { temp: 18, condition: 'Cloudy', icon: 'Cloud' },
    spots: [
      { id: 'stanley-park', name: 'Stanley Park', image: 'https://images.unsplash.com/photo-1560938321-afe187e148e9?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.9, durationHours: 4, description: 'Huge scenic park in the city.', estimatedCost: 0 },
      { id: 'capilano', name: 'Capilano Suspension Bridge', image: 'https://images.unsplash.com/photo-1541433103247-49856f916024?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.7, durationHours: 3, description: 'Thrill-seeking treetop walk.', estimatedCost: 40 },
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'India',
    countryCode: '🇮🇳',
    image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop',
    heroImage: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2000&auto=format&fit=crop',
    description: 'The City of Dreams — Bollywood and coastal charms.',
    costPerDay: 100,
    weather: { temp: 30, condition: 'Humid', icon: 'Sun' },
    spots: [
      { id: 'gateway-of-india', name: 'Gateway of India', image: 'https://images.unsplash.com/photo-1570160897040-3a2b5efada64?q=80&w=800&auto=format&fit=crop', category: 'Landmark', rating: 4.8, durationHours: 1, description: 'Iconic arch monument on the waterfront.', estimatedCost: 0 },
      { id: 'marine-drive', name: 'Marine Drive', image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800&auto=format&fit=crop', category: 'Nature', rating: 4.7, durationHours: 2, description: 'Scenic promenade along the coast.', estimatedCost: 0 },
    ]
  }
];

export const searchDestinations = (query: string): CityDestination[] => {
  if (!query || query.length < 1) return DESTINATION_DATA;
  const q = query.toLowerCase();
  return DESTINATION_DATA.filter(d =>
    d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q)
  );
};
