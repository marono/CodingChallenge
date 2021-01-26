import React, { PropsWithChildren } from 'react'
import { render as rtlRender, RenderResult, RenderOptions as rtlRenderOptions } from '@testing-library/react'
import { createStore, Dispatch, AnyAction, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import rootReducer from 'redux/rootReducer';
import { StoreType, RootState } from 'redux/store';

type StoreOptions = {
  initialState?: Partial<RootState>,
  dispatch?: Dispatch<AnyAction>;
};

type RenderOptions = StoreOptions & {
  store?: StoreType,
};

const createMockStore = ({
  initialState,
  dispatch
}: StoreOptions): StoreType => {
  const store = createStore(combineReducers(rootReducer()), initialState);
  store.dispatch = dispatch || store.dispatch;

  return store;
}

const render = (
  ui: React.ReactElement,
  {
    initialState,
    dispatch,
    store = createMockStore({ initialState, dispatch }),
    ...renderOptions
  }: RenderOptions = {},
  renderFn: (
    ui: React.ReactElement,
    options?: Omit<rtlRenderOptions, 'queries'>,
  ) => RenderResult = rtlRender
) => {
  function Wrapper({ children }: PropsWithChildren<any>) {
    return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
  }
  const result = renderFn(ui, { wrapper: Wrapper, ...renderOptions });
  return {
    ...result,
    rerender: (el: React.ReactElement, nextState: Partial<RootState>) => {
      if(nextState) {
        const oldState = store.getState();
        store.replaceReducer(() => ({
          ...oldState,
          ...nextState,
        }));
        store.dispatch({ type: '__TEST_ACTION_REPLACE_STATE__' });
        store.replaceReducer(combineReducers(rootReducer()));
      }

      return render( el, { store }, (rerenderEl: React.ReactElement) => {
        result.rerender(rerenderEl);
        return { ...result };
      });
    }
  };
}

export * from '@testing-library/react'
export { render };
