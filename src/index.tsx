import React from 'react';
import ReactDOM from 'react-dom';
import rawData from './data.json';
import BookingManager from './booking-manager';
import App, { AppProps } from './components/App';

const bookingManager = new BookingManager()
bookingManager.optimize(rawData)

const props: AppProps = {
  original: bookingManager.original,
  optimized: bookingManager.optimized,
  originalRelocations: bookingManager.originalRelocations,
  optimizedRelocations: bookingManager.optimizedRelocations
}

ReactDOM.render(
  <App {...props} />
  , document.getElementById('root'));
