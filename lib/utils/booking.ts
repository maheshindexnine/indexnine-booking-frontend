import { Seat } from "../types";

// Function to check if two seats are adjacent (horizontally, vertically, or diagonally)
export const areSeatsAdjacent = (seat1: Seat, seat2: Seat): boolean => {
  const rowIndex1 = seat1.row.charCodeAt(0) - 65; // Convert 'A' to 0, 'B' to 1, etc.
  const rowIndex2 = seat2.row.charCodeAt(0) - 65;
  
  const rowDiff = Math.abs(rowIndex1 - rowIndex2);
  const colDiff = Math.abs(seat1.number - seat2.number);
  
  // Adjacent if they're in the same row and next to each other,
  // or in adjacent rows with the same or adjacent column
  return (rowDiff <= 1 && colDiff <= 1);
};

// Function to check if a seat is adjacent to any of the currently selected seats
export const isAdjacentToSelected = (seat: Seat, selectedSeats: Seat[]): boolean => {
  if (selectedSeats.length === 0) {
    return true; // If no seats are selected yet, any seat can be selected
  }
  
  return selectedSeats.some(selectedSeat => areSeatsAdjacent(seat, selectedSeat));
};

// Calculate total price of selected seats
export const calculateTotalPrice = (selectedSeats: Seat[]): number => {
  return selectedSeats.reduce((total, seat) => total + seat.price, 0);
};

// Function to toggle a seat's selection status
export const toggleSeatSelection = (
  seat: Seat,
  allSeats: Seat[][],
  selectedSeats: Seat[]
): {
  updatedSeats: Seat[][],
  updatedSelectedSeats: Seat[]
} => {
  // Cannot select booked seats
  if (seat.isBooked) {
    return { updatedSeats: allSeats, updatedSelectedSeats: selectedSeats };
  }
  
  const isSeatSelected = selectedSeats.some(s => s.id === seat.id);
  
  if (isSeatSelected) {
    // If seat is already selected, unselect it
    const updatedSelectedSeats = selectedSeats.filter(s => s.id !== seat.id);
    
    // Update the isSelected property in the seats array
    const updatedSeats = allSeats.map(row => 
      row.map(s => 
        s.id === seat.id ? { ...s, isSelected: false } : s
      )
    );
    
    return { updatedSeats, updatedSelectedSeats };
  } else {
    // If seat is not selected, check if it's adjacent to any selected seat
    if (isAdjacentToSelected(seat, selectedSeats)) {
      // Add to selected seats
      const updatedSelectedSeats = [...selectedSeats, { ...seat, isSelected: true }];
      
      // Update the isSelected property in the seats array
      const updatedSeats = allSeats.map(row => 
        row.map(s => 
          s.id === seat.id ? { ...s, isSelected: true } : s
        )
      );
      
      return { updatedSeats, updatedSelectedSeats };
    }
  }
  
  // If seat is not adjacent and trying to select, don't change anything
  return { updatedSeats: allSeats, updatedSelectedSeats: selectedSeats };
};