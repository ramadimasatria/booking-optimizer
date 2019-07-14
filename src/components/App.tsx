import React from 'react';
import { Booking } from '../types';
import BookingOrder from './BookingOrder';
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm';
import './App.scss';

export interface AppProps {
  originalOrder: Booking[],
  optimizedOrder: Booking[],
  relocation: number
}

const App: React.FC<AppProps> = (props) => {
  return (
    <div className="app">
      <h1 className="app__title">Booking Order Optimizer</h1>

      <div className="app_section">
        <h3 className="app__subtitle">Input Data</h3>

        <JSONInput
          id='editor'
          placeholder={props.originalOrder}
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
        <BookingOrder order={props.originalOrder} />
      </div>

      <hr className="app__separator" />

      <div className="app__section">
        <h3 className="app__subtitle">Optimized Order</h3>
        <BookingOrder order={props.optimizedOrder} />

        <p>Relocations: { props.relocation }</p>
      </div>
    </div>
  );
}

export default App;
