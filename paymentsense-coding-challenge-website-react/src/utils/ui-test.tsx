import React, { PropsWithChildren } from 'react'
import { render as rtlRender } from '@testing-library/react'
import { createStore, Dispatch, AnyAction, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from 'redux/rootReducer';
import { StoreType, RootState } from 'redux/store';

type RenderOptions = {
  initialState?: RootState,
  store?: StoreType,
  dispatch?: Dispatch<AnyAction>;
}

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = createStore(combineReducers(rootReducer()), initialState),
    dispatch,
    ...renderOptions
  }: RenderOptions = {}
) {
  store.dispatch = dispatch || store.dispatch;

  function Wrapper({ children }: PropsWithChildren<any>) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
