import React from 'react';
import { Booking } from '../types';
import BookingItem from './BookingItem';
import Separator from './Separator';
import './BookingOrder.scss';

interface Props {
  order: Booking[]
}

export const BookingOrder: React.FC<Props> = ({ order }) => {
  return (
    <div className="booking-order">
      {
        order.map((booking, idx, arr) => {
          const next = arr[idx + 1]
          const relocate = next && next.start !== booking.end;

          return (
            <React.Fragment key={ booking.id }>
              <BookingItem booking={ booking } />
              {
                next && <Separator relocate={relocate} />
              }
            </React.Fragment>
          )
        })
      }
    </div>
  )
}

export default BookingOrder;
