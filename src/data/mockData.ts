
import { Station, Review, StationStatus } from "@/types";

// Generate a mock review
const generateReview = (id: string, stationId: string): Review => {
  const names = ["John D.", "Sarah M.", "Robert K.", "Emma L.", "Michael P.", "Olivia T.", "William B.", "Ava R."];
  const comments = [
    "Great service and clean facilities. Never have to wait long.",
    "Station was busy but staff managed the queue efficiently.",
    "Good location, but the pressure was a bit low today.",
    "Always reliable, my go-to station in this area.",
    "Staff was very helpful when I had issues with my tank.",
    "Prices are reasonable compared to others in the area.",
    "Recently renovated and has good amenities now.",
    "The waiting area is comfortable which is a plus."
  ];
  
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomComment = comments[Math.floor(Math.random() * comments.length)];
  const randomRating = Math.floor(Math.random() * 5) + 1 as 1 | 2 | 3 | 4 | 5;
  const randomDate = new Date();
  randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
  
  return {
    id,
    userId: `user-${Math.floor(Math.random() * 1000)}`,
    username: randomName,
    rating: randomRating,
    comment: randomComment,
    date: randomDate,
    helpful: Math.floor(Math.random() * 15)
  };
};

// Generate mock reviews for a station
const generateReviews = (stationId: string, count: number): Review[] => {
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    reviews.push(generateReview(`review-${stationId}-${i}`, stationId));
  }
  return reviews;
};

// Generate a random status with weighted probabilities
const generateStatus = (): StationStatus => {
  const random = Math.random();
  if (random < 0.6) return 'available';
  if (random < 0.8) return 'busy';
  if (random < 0.95) return 'closed';
  return 'maintenance';
};

// Calculate overall rating based on reviews
const calculateRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

// Major cities with coordinates for our mock stations
const cities = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777 },
  { name: "Delhi", state: "Delhi", lat: 28.7041, lng: 77.1025 },
  { name: "Bangalore", state: "Karnataka", lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867 },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714 },
  { name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 }
];

// Company names for CNG stations
const companies = ["EnergyGas", "GreenFuel", "EcoGas", "NaturalDrive", "CleanFuel", "GasXpress"];

// Generate mock stations
export const generateMockStations = (count: number): Station[] => {
  const stations: Station[] = [];
  
  for (let i = 0; i < count; i++) {
    const cityIndex = Math.floor(Math.random() * cities.length);
    const city = cities[cityIndex];
    
    // Small random offset to distribute stations around the city
    const latOffset = (Math.random() - 0.5) * 0.2;
    const lngOffset = (Math.random() - 0.5) * 0.2;
    
    const company = companies[Math.floor(Math.random() * companies.length)];
    const stationId = `station-${i}`;
    const reviewCount = Math.floor(Math.random() * 15) + 1;
    const reviews = generateReviews(stationId, reviewCount);
    const rating = calculateRating(reviews);
    
    stations.push({
      id: stationId,
      name: `${company} CNG ${city.name} ${Math.floor(Math.random() * 10) + 1}`,
      company,
      address: `${Math.floor(Math.random() * 500) + 1} Main Road, Sector ${Math.floor(Math.random() * 50) + 1}`,
      city: city.name,
      state: city.state,
      location: {
        lat: city.lat + latOffset,
        lng: city.lng + lngOffset
      },
      status: generateStatus(),
      waitingTime: Math.floor(Math.random() * 30),
      pricePerKg: Math.round((Math.random() * 10 + 55) * 100) / 100, // price between 55 and 65
      rating,
      reviewCount,
      reviews,
      operatingHours: {
        open: Math.random() > 0.3 ? "00:00" : `${Math.floor(Math.random() * 8) + 5}:00`,
        close: Math.random() > 0.3 ? "24:00" : `${Math.floor(Math.random() * 4) + 20}:00`
      },
      facilities: [
        ...(Math.random() > 0.5 ? ["restrooms" as const] : []),
        ...(Math.random() > 0.5 ? ["convenience_store" as const] : []),
        ...(Math.random() > 0.7 ? ["food" as const] : []),
        ...(Math.random() > 0.6 ? ["coffee" as const] : []),
        ...(Math.random() > 0.8 ? ["car_wash" as const] : []),
        ...(Math.random() > 0.7 ? ["atm" as const] : []),
        ...(Math.random() > 0.6 ? ["waiting_area" as const] : []),
        ...(Math.random() > 0.4 ? ["air_filling" as const] : []),
      ],
      paymentMethods: [
        "cash" as const,
        ...(Math.random() > 0.1 ? ["credit_card" as const] : []),
        ...(Math.random() > 0.1 ? ["debit_card" as const] : []),
        ...(Math.random() > 0.3 ? ["upi" as const] : []),
        ...(Math.random() > 0.5 ? ["wallet" as const] : []),
        ...(Math.random() > 0.7 ? ["prepaid_card" as const] : []),
      ],
      lastUpdated: new Date()
    });
  }
  
  return stations;
};

// Export mock data
export const mockStations: Station[] = generateMockStations(30);
