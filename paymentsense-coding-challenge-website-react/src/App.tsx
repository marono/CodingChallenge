import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import HealthStatus from './modules/HealthStatus';
import CountriesList from './modules/CountriesList';
import CountryDetails from './modules/CountryDetails';

const App = () =>(
  <div className="App">
    <header className="App-header">
      <img width="50%" alt="Paymentsense Logo" src="/paymentsense-logo.svg" />
    </header>
    <h1>Paymentsense Coding Challenge!</h1>
    <HealthStatus />
    <br />
    <Switch>
      <Route path="/" exact={true}>
        <CountriesList />
      </Route>
      <Route path="/country-details/:code">
        <CountryDetails />
      </Route>
    </Switch>

  </div>
);

export default App;
