import React from 'react';
import { screen } from '@testing-library/react';
import { render } from 'utils/ui-test';
import CountriesList from './CountriesList';
import { countriesRequestStatus, actionBuilder } from './module';

describe('CountriesList />', () => {
  test('renders countries', () => {
    const countries = [
      {
        name: "c-1",
        alpha3Code: '1',
        flag: 'f1'
      },
      {
        name: "c-2",
        alpha3Code: '2',
        flag: 'f2'
      }
    ];

    const initialState = {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE,
        start: 0,
        end: 0,
        size: 0
      }
    }

    const { rerender, container } = render(<CountriesList />, { initialState: initialState });
    rerender(<CountriesList />, {
      countries: {
        countries,
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_SUCCEEDED,
        start: 0,
        end: 2,
        size: 5
      }
    });

    const list = screen.getByTestId('countries-list');

    expect(list).toBeInTheDocument();
    expect(screen.getByText(countries[0].name)).toBeInTheDocument();
    expect(screen.getByText(countries[1].name)).toBeInTheDocument();

    expect(screen.queryByTestId('countries-loading')).toBeNull();

    const pager = screen.getByTestId('country-list-pager');
    expect(pager.querySelector('li > a[aria-current="page"]')).toBeInTheDocument();
    expect(pager.querySelector('li > a[aria-current="page"]')?.textContent).toBe("1");
  });

  test('triggers countries load', () => {
    const dispatchHandler = jest.fn();

    render(<CountriesList />, {
      initialState: {
        countries: {
          countries: [],
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE,
          start: 0,
          end: 0,
          size: 0
        },
      },
      dispatch: dispatchHandler
    });

    expect(dispatchHandler).toHaveBeenCalledTimes(1);
    expect(dispatchHandler).toHaveBeenCalledWith(actionBuilder.countriesListRequest({ start: 0, end: 4 }));
  });

  test('shows loading widget', () => {
    const { rerender } = render(<CountriesList />, {
      initialState: {
        countries: {
          countries: [],
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE,
          start: 0,
          end: 0,
          size: 0
        },
      }
    });

    rerender(<CountriesList />, {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_INPROGRESS,
        start: 0,
        end: 0,
        size: 0
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
          loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_NONE,
          start: 0,
          end: 0,
          size: 0
        },
      }
    });

    rerender(<CountriesList />, {
      countries: {
        countries: [],
        loadStatus: countriesRequestStatus.COUNTRIES_REQUEST_STATUS_FAILED,
        start: 0,
        end: 0,
        size: 0
      }
    });

    expect(screen.getByTestId('countries-error')).toBeInTheDocument();
    expect(screen.queryByTestId('countries-loading')).toBeNull();
    expect(screen.queryByTestId('countries-list')).toBeNull();
  });
});
