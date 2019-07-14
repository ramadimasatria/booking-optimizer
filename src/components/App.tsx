import React from 'react';
import { Booking } from '../types';
import BookingOrder from './BookingOrder';
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm';
import './App.scss';

export interface AppProps {
  original: Booking[],
  optimized: Booking[],
  originalRelocations: number,
  optimizedRelocations: number
}

const App: React.FC<AppProps> = (props) => {
  return (
    <div className="app">
      <h1 className="app__title">Booking Order Optimizer</h1>

      <div className="app_section">
        <h3 className="app__subtitle">Input Data</h3>

        <JSONInput
          id='editor'
          placeholder={props.original}
          height='400px'
          theme='light_mitsuketa_tribute'
          width='100%'
        />

        <p style={{ textAlign: 'center' }}>
          <button className="button" style={{ marginTop: 18 }}>Optimize!</button>
        </p>
      </div>

      <hr className="app_separator" />

      <div className="app__section">
        <h3 className="app__subtitle">Original Order</h3>
        <BookingOrder order={props.original} />
        <p>Relocations: { props.originalRelocations }</p>
      </div>

      <hr className="app__separator" />

      <div className="app__section">
        <h3 className="app__subtitle">Optimized Order</h3>
        <BookingOrder order={props.optimized} />
        <p>Relocations: { props.optimizedRelocations }</p>
      </div>
    </div>
  );
}

export default App;
