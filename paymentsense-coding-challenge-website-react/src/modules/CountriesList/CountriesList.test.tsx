import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'utils/ui-test';
import CountriesList from './CountriesList';
import { countriesRequestStatus, actionBuilder } from './module';
import store from 'redux/store';

describe('CountriesList />', () => {
  test('renders countries', () => {
    const countries = [
      {
        name: "c-1"
      },
      {
        name: "c-2"
      }
    ];

    const initialState = {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
      }
    }

    const { rerender } = render(<CountriesList />, { initialState: initialState });
    store.dispatch(actionBuilder.countiesListSuccess(countries));
    rerender(<CountriesList />, {
      countries: {
        countries,
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_SUCCEEDED
      }
    });

    const list = screen.getByTestId('countries-list');

    expect(list).toBeInTheDocument();
    expect(screen.getByText(countries[0].name)).toBeInTheDocument();
    expect(screen.getByText(countries[1].name)).toBeInTheDocument();

    expect(screen.queryByTestId('countries-loading')).toBeNull();
  });

  test('triggers countries load', () => {
    const dispatchHandler = jest.fn();

    render(<CountriesList />, {
      initialState: {
        countries: {
          countries: [],
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
        },
      },
      dispatch: dispatchHandler
    });

    expect(dispatchHandler).toHaveBeenCalledTimes(1);
    expect(dispatchHandler).toHaveBeenCalledWith(actionBuilder.countriesListRequest());
  });

  test('shows loading widget', () => {
    const { rerender } = render(<CountriesList />, {
      initialState: {
        countries: {
          countries: [],
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
        },
      }
    });

    rerender(<CountriesList />, {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_INPROGRESS
      }
    });

    expect(screen.getByTestId('countries-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('countries-list')).toBeNull();
  });

  test('shows error banner', () => {
    const { rerender } = render(<CountriesList />, {
      initialState: {
        countries: {
          countries: [],
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE
        },
      }
    });

    rerender(<CountriesList />, {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_FAILED
      }
    });

    expect(screen.getByTestId('countries-error')).toBeInTheDocument();
    expect(screen.queryByTestId('countries-loading')).toBeNull();
    expect(screen.queryByTestId('countries-list')).toBeNull();
  });
});
