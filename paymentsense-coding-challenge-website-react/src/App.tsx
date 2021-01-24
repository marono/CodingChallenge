import React from 'react';
import './App.css';
import HealthStatus from './modules/HealthStatus';

const App = () =>(
  <div className="App">
    <header className="App-header">
      <img width="50%" alt="Paymentsense Logo" src="/paymentsense-logo.svg" />
    </header>
    <h1>Paymentsense Coding Challenge!</h1>
    <HealthStatus />
  </div>
);

export default App;
