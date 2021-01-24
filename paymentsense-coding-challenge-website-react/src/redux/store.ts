import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer from './rootReducer'
import epics from './epics';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: rootReducer(),
  middleware: [ epicMiddleware ]
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

epicMiddleware.run(epics());

export type RootState = ReturnType<typeof store.getState>

export default store;
