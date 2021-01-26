import healthReducer from 'modules/HealthStatus/reducer';
import countriesReducer from 'modules/CountriesList/reducer';
import countryDetailsReducer from 'modules/CountryDetails/reducer';

const rootReducer = () => ({
  health: healthReducer,
  countries: countriesReducer,
  countryDetails: countryDetailsReducer
});

export default rootReducer;
