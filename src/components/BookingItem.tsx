import React from 'react';
import { Booking } from '../types';
import './BookingItem.scss';
import rightArrow from '../icons/right-arrow.svg';

interface Props {
  booking: Booking
}

export const BookingItem: React.FC<Props> = ({ booking }) => {
  return (
    <div className="booking-item">
      <span className="booking-item__id">{ booking.id }</span>
      <span className="booking-item__start">{ booking.start }</span>
      <span className="booking-item__arrow"><img src={rightArrow} alt='arrow' /></span>
      <span className="booking-item__end">{ booking.end }</span>
    </div>
  )
}

export default BookingItem;
