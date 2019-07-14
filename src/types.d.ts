export type BookingId = number | string

export interface Booking {
  id: BookingId,
  start: number,
  end: number
}
