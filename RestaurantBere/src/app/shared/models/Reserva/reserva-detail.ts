
export interface CustomReservationResponseDTO {
  id: number;
  date: Date; // TypeScript does not have LocalDate, use Date instead
  startTime: string; // TypeScript does not have LocalTime, use string instead
  endTime: string; // TypeScript does not have LocalTime, use string instead
  guestNumber: number;
  priceTotal: number;
  status: number;
  name: string;

}