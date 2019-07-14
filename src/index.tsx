import React from 'react';
import ReactDOM from 'react-dom';
import rawData from './data.json';
import BookingManager from './booking-manager';
import App, { AppProps } from './components/App';

const bookingManager = new BookingManager(rawData)
bookingManager.orderBookings()

const props: AppProps = {
  originalOrder: bookingManager.originalOrder,
  optimizedOrder: bookingManager.optimizedOrder,
  relocation: bookingManager.relocations
}

ReactDOM.render(
  <App {...props} />
  , document.getElementById('root'));
