export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: number;
  duration: string;
  genre: string;
  releaseDate: string;
  description: string;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
}

export interface Showtime {
  id: number;
  time: string;
}

export interface Date {
  id: number;
  day: string;
  date: string;
  month: string;
}

export interface SeatType {
  name: string;
  price: number;
  capacity: number;
  color: string;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: string;
  price: number;
  isBooked: boolean;
  isSelected: boolean;
}

export type BookingState = {
  movieId: number | null;
  theaterId: number | null;
  showtimeId: number | null;
  dateId: number | null;
  selectedSeats: Seat[];
  totalPrice: number;
};