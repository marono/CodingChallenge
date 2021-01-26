import React from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { AppDispatch, RootState } from 'redux/store';
import { CountryDetails as CountryDetailsType } from 'types/CountryDetails';
import { actionBuilder } from './module';
import * as selectors from './selectors';

export const CountryDetails = ({ hasLoadSucceeded, hasLoadFailed, loadCountryDetails, country }: CountryDetailsProps) => {
  const { code } = useParams<{ code: string }>();

  React.useEffect(() => {
    loadCountryDetails(code);
  }, [
    code, loadCountryDetails
  ])

  return <section>
    { !hasLoadSucceeded && !hasLoadFailed && <div>Loading ...</div> }
    { hasLoadFailed && <div>Failed to load country details!</div> }
    { hasLoadSucceeded && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <label>Name:</label>
          <span>{country?.name}</span>
        </div>
        <div>
          <label>Capital:</label>
          <span>{country?.capital}</span>
        </div>
        <div>
          <label>Population:</label>
          <span>{country?.population}</span>
        </div>
        <div>
          <label>Time zones:</label>
          <span>{country?.timeZones}</span>
        </div>
        <div>
          <label>Currencies:</label>
          <span>{country?.currencies}</span>
        </div>
        <div>
          <label>Languages:</label>
          <span>{country?.languages}</span>
        </div>
        <div>
          <label>Borders:</label>
          <ul style={{ listStyleType: 'none', display: 'inline', margin: '0', padding: '0' }}>{country?.borders.map(({ name, alpha3Code }) => (
            <li key={alpha3Code} style={{ marginLeft: '0.5rem', display: 'inline' }}><Link to={`/country-details/${alpha3Code}`}>{name}</Link></li>)
          )}
          </ul>
        </div>
      </div>
    )}
  </section>;
}

type CountryDetailsProps = {
  hasLoadSucceeded: boolean;
  hasLoadFailed: boolean;
  country?: CountryDetailsType;
  loadCountryDetails: (alpha3Code: string) => void;
}

const mapStateToProps = (state: RootState) => ({
  hasLoadSucceeded: selectors.hasLoadedSuccessfully(state),
  hasLoadFailed: selectors.hasLoadFailed(state),
  country: selectors.selectCountry(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadCountryDetails: (alpha3Code: string) => dispatch(actionBuilder.countryDetailsRequest(alpha3Code))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetails);
