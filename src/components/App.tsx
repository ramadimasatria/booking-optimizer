import React from 'react';
// @ts-ignore
import JSONInput from 'react-json-editor-ajrm';
import BookingOrder from './BookingOrder';

import { Booking } from '../types';
import BookingManager from '../booking-manager';
import rawData from '../data.json';

import './App.scss';

interface AppState {
  isLoading: boolean,
  original?: Booking[],
  optimized?: Booking[],
  originalRelocations?: number,
  optimizedRelocations?: number
}

const bookingManager = new BookingManager()

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isLoading: false
    }

    this.optimize = this.optimize.bind(this)
  }

  optimize() {
    this.setState({
      isLoading: true
    })

    bookingManager.optimize(rawData)

    this.setState({
      isLoading: false,
      original: bookingManager.original,
      optimized: bookingManager.optimized,
      originalRelocations: bookingManager.originalRelocations,
      optimizedRelocations: bookingManager.optimizedRelocations
    })
  }

  render() {
    const { state } = this

    return (
      <div className="app">
        <h1 className="app__title">Booking Order Optimizer</h1>

        <div className="app_section">
          <h3 className="app__subtitle">Input Data</h3>

          <JSONInput
            id='editor'
            placeholder={ rawData }
            height='400px'
            theme='light_mitsuketa_tribute'
            width='100%'
          />

          <p style={{ textAlign: 'center' }}>
            <button className="button" style={{ marginTop: 18 }} onClick={this.optimize} disabled={state.isLoading}>
              Optimize!
            </button>
          </p>
        </div>

        <hr className="app_separator" />

        {
          state.original && (
            <React.Fragment>
              <div className="app__section">
                <h3 className="app__subtitle">Original Order</h3>
                <BookingOrder order={state.original} />
                <p>Relocations: { state.originalRelocations }</p>
              </div>

              <hr className="app__separator" />
            </React.Fragment>
          )
        }

        {
          state.optimized && (
            <div className="app__section">
              <h3 className="app__subtitle">Optimized Order</h3>
              <BookingOrder order={ state.optimized } />
              <p>Relocations: { state.optimizedRelocations }</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default App;
