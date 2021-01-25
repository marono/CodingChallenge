import healthReducer from 'modules/HealthStatus/reducer';
import countriesReducer from 'modules/CountriesList/reducer';

const rootReducer = () => ({
  health: healthReducer,
  countries: countriesReducer
});

export default rootReducer;
