import React from 'react';
import { connect } from 'react-redux';
import { RootState, AppDispatch } from 'redux/store';
import ReactPaginate from 'react-paginate';
import { css } from 'aphrodite/no-important';
import { Country } from 'types/Country';
import * as selectors from './selectors';
import { actionBuilder } from './module';
import styles from './styles';

export const PAGE_SIZE = 5;

export const CountriesList = ({ countries, loadCountries, hasSucceeded, hasErrored, pager }: CountriesListProps) => {
  const [ page, setPage ] = React.useState(0);
  React.useEffect(() => {
    loadCountries(page*PAGE_SIZE, (page+1)*PAGE_SIZE-1);
  }, [page, loadCountries]);

  return (
    <>
      { !hasSucceeded && !hasErrored && <div data-testid="countries-loading">Loading ...</div> }
      { hasErrored && <div data-testid="countries-error">Error loading countries</div> }
      { hasSucceeded && (
        <>
          <ul style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', listStyleType: 'none'}} data-testid="countries-list">
            { countries.map(({ name, flag }) => (<li key={name}>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <div><img src={flag} alt={name} style={{ width: '1rem', height: '1rem' }} /></div>
                  <div style={{ marginLeft: '0.25rem' }}>{name}</div>
                </div>
              </li>)) }
          </ul>
          <section data-testid="country-list-pager">
            <ReactPaginate
              pageCount={pager.size/PAGE_SIZE}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              onPageChange={({ selected }) => setPage(selected)}
              containerClassName={css(styles.pagerContainer)}
              pageClassName={css(styles.pagerPage)}
              activeClassName={css(styles.pagerActivePage)}
              nextClassName={css(styles.pagerPage)}
              previousClassName={css(styles.pagerPage)}
              forcePage={page}
            />
          </section>
        </>
      )}
    </>
  );
}

type CountriesListProps = {
  countries: Country[];
  loadCountries: (start: number, end: number) => void;
  hasErrored: boolean;
  hasSucceeded: boolean;
  pager: {
    start: number;
    end: number;
    size: number;
  }
}

const mapStateToProps = (state: RootState) => ({
  countries: selectors.selectCountries(state),
  hasSucceeded: selectors.haveCountriesLoadedSucceesfully(state),
  hasErrored: selectors.hasCountriesLoadFailed(state),
  pager: selectors.selectPager(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadCountries: (start: number, end: number) => dispatch(actionBuilder.countriesListRequest({ start, end }))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);
