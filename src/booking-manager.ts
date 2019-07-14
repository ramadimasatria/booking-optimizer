import { BookingId, Booking } from './types';

interface BookingGroup {
  [key: string]: Booking | BookingId[]
}

interface BookingManagerInterface {
  originalOrder: Booking[],
  optimizedOrder: Booking[],
  relocations?: number,
  orderBookings: () => void
}

class BookingManager implements BookingManagerInterface {
  originalOrder: Booking[]
  optimizedOrder: Booking[]
  relocations = 0

  private bookingsById: {
    [key: string]: Booking
  } = {}
  private connected: {
    [key: string]: BookingId[]
  } = {}
  private starts: {
    [key: string]: BookingId[]
  } = {}
  private ends: {
    [key: string]: BookingId[]
  } = {}

  constructor(rawData: Booking[]) {
    this.originalOrder = rawData
    this.optimizedOrder = []

    // assign initial bookingsById & connected data
    this.originalOrder.forEach((booking) => {
      this.bookingsById[booking.id] = booking
      this.connected[booking.id] = [booking.id]
    })
  }

  private getBookingById(id: BookingId): Booking {
    return this.bookingsById[id]
  }

  private getConnectedData(id: BookingId): Booking {
    const arr = this.connected[id]
    const start = this.getBookingById(arr[0]).start
    const end = this.getBookingById(arr[arr.length - 1]).end

    return {
      id,
      start,
      end
    }
  }

  private groupStartsEnds(): void {
    const starts: {
      [key: string]: BookingId[]
    } = {}

    const ends:{
      [key: string]: BookingId[]
    } = {}

    Object.keys(this.connected).forEach(id => {
      const { start, end } = this.getConnectedData(id)
      if (!starts[start]) {
        starts[start] = []
      }

      if (!ends[end]) {
        ends[end] = []
      }

      starts[start].push(id)
      ends[end].push(id)
    })

    this.starts = starts
    this.ends = ends
  }

  private getMostPair(): number | null {
    let pair = 0
    let mostPair = 0

    Object.keys(this.starts).forEach(key => {
      if (!this.ends[key]) return

      const curPair = Math.min(this.starts[key].length, this.ends[key].length)
      if (curPair > mostPair) {
        mostPair = curPair
        pair = parseInt(key, 10)
      }
    })

    return mostPair > 0 ? pair : null
  }

  private addConnected(ids: BookingId[]): void {
    const targetId = ids[0]
    this.connected[targetId] = [
      ...this.connected[targetId],
      ...ids.slice(1).map(id => this.connected[id]).flat()
    ]

    // delete ids except target id
    ids.slice(1).forEach(id => {
      delete this.connected[id]
    })
  }

  private connectBookings(pairKey: number): void {
    let starts = this.starts[pairKey]
    let ends = this.ends[pairKey]

    // find common booking ids
    const commons = starts.filter(id => {
      const { start, end } = this.getConnectedData(id)
      return start === end
    })

    // if there is common ids, connect them and move to the end of least array
    // Ex:
    // starts: [1, 2, 3]
    // ends: [1, 2, 4, 5, 6]
    // Result array
    // starts: [3, [1, 2]]
    // ends: [4, 5, 6]
    if (commons.length) {
      this.addConnected(commons)

      starts = starts.filter(id => !commons.includes(id))
      ends = ends.filter(id => !commons.includes(id))

      const targetArr = starts.length < ends.length ? starts : ends
      targetArr.push(commons[0])
    }

    // Start connecting the bookings
    while (starts.length && ends.length) {
      const startId = starts.shift()
      const endId = ends.shift()
      if (!startId || !endId) break;
      this.addConnected([endId, startId])
    }

    console.log(this.connected)
  }

  public orderBookings(): void {
    this.groupStartsEnds()

    let pair = this.getMostPair()
    while (pair) {
      this.connectBookings(pair)
      this.groupStartsEnds()
      pair = this.getMostPair()
    }

    this.relocations = Object.keys(this.connected).length - 1
    this.optimizedOrder = Object.values(this.connected).flat().map(id =>
      this.getBookingById(id)
    )
  }
}

export default BookingManager;
