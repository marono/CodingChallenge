import React from 'react';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';
import { Country } from 'types/Country';
import * as selectors from './selectors';
import { actionBuilder } from './module';

export const CountriesList = ({ countries, loadCountries, hasSucceeded, hasErrored }: CountriesListProps) => {
  React.useEffect(() => {
    loadCountries();
  }, [loadCountries]);

  return (
    <>
      { !hasSucceeded && !hasErrored && <div data-testid="countries-loading">Loading ...</div> }
      { hasErrored && <div data-testid="countries-error">Error loading countries</div> }
      { hasSucceeded && (
        <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}} data-testid="countries-list">
          { countries.map(({ name }) => (<li key={name}>{name}</li>)) }
        </ul>
      )}
    </>
  );
}

type CountriesListProps = {
  countries: Country[];
  loadCountries: () => void;
  hasErrored: boolean;
  hasSucceeded: boolean;
}

const mapStateToProps = (state: RootState) => ({
  countries: selectors.selectCountries(state),
  hasSucceeded: selectors.haveCountriesLoadedSucceesfully(state),
  hasErrored: selectors.hasCountriesLoadFailed(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadCountries: () => dispatch(actionBuilder.countriesListRequest())
})

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);
