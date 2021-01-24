import healthReducer from 'modules/HealthStatus/reducer';

const rootReducer = () => ({
  health: healthReducer
});

export default rootReducer;
