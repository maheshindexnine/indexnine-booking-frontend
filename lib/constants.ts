export const MOVIES = [
  {
    id: 1,
    title: "Inception 2: Dream State",
    image: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.8,
    duration: "2h 30m",
    genre: "Sci-Fi/Action",
    releaseDate: "2025",
    description: "Dive deeper into the world of dreams as Dom Cobb returns for another mind-bending heist that challenges the very fabric of reality.",
  },
  {
    id: 2,
    title: "Galactic Odyssey",
    image: "https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.5,
    duration: "2h 15m",
    genre: "Sci-Fi/Adventure",
    releaseDate: "2025",
    description: "Join a crew of space explorers as they embark on a journey to the edge of the universe, discovering alien civilizations and cosmic wonders.",
  },
  {
    id: 3,
    title: "The Last Guardian",
    image: "https://images.pexels.com/photos/3131971/pexels-photo-3131971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.7,
    duration: "2h 20m",
    genre: "Fantasy/Adventure",
    releaseDate: "2025",
    description: "A young hero and a mystical creature form an unbreakable bond as they navigate a breathtaking world filled with ancient ruins and magical mysteries.",
  },
  {
    id: 4,
    title: "Neon Shadows",
    image: "https://images.pexels.com/photos/924824/pexels-photo-924824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    rating: 4.6,
    duration: "2h 10m",
    genre: "Cyberpunk/Thriller",
    releaseDate: "2025",
    description: "In a dystopian future dominated by corporations, a hacker uncovers a conspiracy that could change the balance of power forever.",
  },
];

export const THEATERS = [
  {
    id: 1,
    name: "Luxe Cinemas",
    location: "Downtown Plaza",
  },
  {
    id: 2,
    name: "Starlight IMAX",
    location: "Westfield Mall",
  },
  {
    id: 3,
    name: "Royal Cinema",
    location: "East End",
  },
];

export const SHOWTIMES = [
  { id: 1, time: "10:00 AM" },
  { id: 2, time: "1:30 PM" },
  { id: 3, time: "4:45 PM" },
  { id: 4, time: "8:15 PM" },
  { id: 5, time: "11:00 PM" },
];

export const SEAT_TYPES = {
  GOLD: {
    name: "Gold",
    price: 500,
    capacity: 40,
    color: "gold",
  },
  SILVER: {
    name: "Silver",
    price: 200,
    capacity: 80,
    color: "silver",
  },
};

// Generate 8 rows of seats
export const generateSeats = () => {
  const seats = [];
  const totalRows = 15;
  
  // First 5 rows are Gold (5 rows x 8 seats = 40 capacity)
  for (let row = 0; row < 5; row++) {
    const rowSeats = [];
    for (let col = 0; col < 8; col++) {
      rowSeats.push({
        id: `${String.fromCharCode(65 + row)}${col + 1}`,
        row: String.fromCharCode(65 + row),
        number: col + 1,
        type: "GOLD",
        price: SEAT_TYPES.GOLD.price,
        isBooked: Math.random() > 0.8, // Randomly mark some seats as booked
        isSelected: false,
      });
    }
    seats.push(rowSeats);
  }
  
  // Next 10 rows are Silver (10 rows x 8 seats = 80 capacity)
  for (let row = 5; row < totalRows; row++) {
    const rowSeats = [];
    for (let col = 0; col < 8; col++) {
      rowSeats.push({
        id: `${String.fromCharCode(65 + row)}${col + 1}`,
        row: String.fromCharCode(65 + row),
        number: col + 1,
        type: "SILVER",
        price: SEAT_TYPES.SILVER.price,
        isBooked: Math.random() > 0.8, // Randomly mark some seats as booked
        isSelected: false,
      });
    }
    seats.push(rowSeats);
  }
  
  return seats;
};

export const DATES = [
  { id: 1, day: "Mon", date: "15", month: "May" },
  { id: 2, day: "Tue", date: "16", month: "May" },
  { id: 3, day: "Wed", date: "17", month: "May" },
  { id: 4, day: "Thu", date: "18", month: "May" },
  { id: 5, day: "Fri", date: "19", month: "May" },
  { id: 6, day: "Sat", date: "20", month: "May" },
  { id: 7, day: "Sun", date: "21", month: "May" },
];