import { Mesa } from "../Mesa/mesa";

export interface CustomReservationResponseDTO {
  id: number;
  date: Date; // Equivalente a LocalDate
  startTime: string; // Equivalente a LocalTime
  endTime: string; // Equivalente a LocalTime
  tables: Mesa[]; // Relación con mesas
  guestNumber: number;
  priceTotal: number;
  status: number;
  name: string;
  showForm?: boolean; // Campo auxiliar solo en frontend
  comentario: string | null; // Campo auxiliar para el comentario
  calificacion: number | null; // Campo auxiliar para la calificación
}
